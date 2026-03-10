import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './BackgroundPipeFlow.css'

// ── Pipe definitions ──────────────────────────────────────────────
const PIPES = [
    {
        color: '#00ff88',
        side: 'left',
        turns: [0.08, 0.20, 0.43, 0.52, 0.65, 0.83, 0.94],
        xTargets: [0.39, 0.85, 'left', 0.55, 'left', 0.80, 'left'],
    },
    {
        color: '#ff3eb5',
        side: 'right',
        turns: [0.17, 0.24, 0.41, 0.55, 0.65, 0.76, 0.90],
        xTargets: [0.65, 'left', 'right', 0.45, 'right', 0.20, 'right'],
    },
]

// ── Build a CatmullRom curve matching the original SVG path logic ─
function buildCurve(pipe, bounds, vpW) {
    const r = 64
    const startTy = bounds.start
    const endTy = bounds.end
    const totalH = endTy - startTy
    const margin = Math.max(20, vpW * 0.04)

    let cx = pipe.side === 'left' ? margin : vpW - margin
    const sideX = pipe.side === 'left' ? -100 : vpW + 100
    const entryDir = pipe.side === 'left' ? 1 : -1

    // Build a CurvePath of straight lines + quadratic bezier corners
    // This exactly matches the original SVG M/L/Q path commands
    const path = new THREE.CurvePath()
    const v = (x, y) => new THREE.Vector3(x, -y, 0)

    // ── Entry: M sideX,startTy  L cx-entryDir*r,startTy  Q cx,startTy cx,startTy+r
    let cursor = v(sideX, startTy)

    // L to edge
    let next = v(cx - entryDir * r, startTy)
    path.add(new THREE.LineCurve3(cursor, next))
    cursor = next

    // Q rounded corner: down
    const qCtrl = v(cx, startTy)
    const qEnd = v(cx, startTy + r)
    path.add(new THREE.QuadraticBezierCurve3(cursor, qCtrl, qEnd))
    cursor = qEnd

    pipe.turns.forEach((frac, i) => {
        const ty = startTy + frac * totalH
        const target = pipe.xTargets[i]

        let rawTx = cx
        if (target === 'left') rawTx = margin
        else if (target === 'right') rawTx = vpW - margin
        else if (target === 'center') rawTx = vpW / 2
        else if (typeof target === 'number') rawTx = vpW * target

        rawTx = Math.min(Math.max(rawTx, r + 10), vpW - r - 10)

        if (Math.abs(rawTx - cx) < 2 * r + 20) return

        const tx = rawTx
        const ad = tx > cx ? 1 : -1

        // L straight down to ty - r
        let p1 = v(cx, ty - r)
        path.add(new THREE.LineCurve3(cursor, p1))
        cursor = p1

        // Q corner: turn horizontal
        let ctrl1 = v(cx, ty)
        let end1 = v(cx + ad * r, ty)
        path.add(new THREE.QuadraticBezierCurve3(cursor, ctrl1, end1))
        cursor = end1

        // L straight horizontal to tx - ad*r
        let p2 = v(tx - ad * r, ty)
        path.add(new THREE.LineCurve3(cursor, p2))
        cursor = p2

        // Q corner: turn back down
        let ctrl2 = v(tx, ty)
        let end2 = v(tx, ty + r)
        path.add(new THREE.QuadraticBezierCurve3(cursor, ctrl2, end2))
        cursor = end2

        cx = tx
    })

    // ── Exit
    const exitIsLeft = cx < vpW / 2
    const exitSideX = exitIsLeft ? -100 : vpW + 100
    const exitDir = exitIsLeft ? 1 : -1

    // L straight down to endTy - r
    let pExit1 = v(cx, endTy - r)
    path.add(new THREE.LineCurve3(cursor, pExit1))
    cursor = pExit1

    // Q corner: turn horizontal to exit
    let ctrlExit = v(cx, endTy)
    let endExit = v(cx - exitDir * r, endTy)
    path.add(new THREE.QuadraticBezierCurve3(cursor, ctrlExit, endExit))
    cursor = endExit

    // L straight off-screen
    let pExitFinal = v(exitSideX, endTy)
    path.add(new THREE.LineCurve3(cursor, pExitFinal))

    return path
}

// ── Measure section positions on the page ─────────────────────────
function measureBounds() {
    const skills = document.querySelector('.skills') || document.getElementById('skills')
    const contact = document.querySelector('.contact') || document.getElementById('contact')
    const testimonials = document.querySelector('.testimonials') || document.getElementById('testimonials')

    const start = skills ? skills.offsetTop : 1800
    const end = testimonials
        ? testimonials.offsetTop + testimonials.offsetHeight
        : contact
            ? contact.offsetTop
            : 5700

    return { start, end }
}

export default function BackgroundPipeFlow() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // ── State ─────────────────────────────────────────────────
        let bounds = measureBounds()
        let vpW = window.innerWidth
        let vpH = window.innerHeight
        let drawProgress = 0
        let targetProgress = 0
        let disposed = false
        let prevT = null

        // ── Renderer ──────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(vpW, vpH)
        container.appendChild(renderer.domElement)

        // ── Scene ─────────────────────────────────────────────────
        const scene = new THREE.Scene()

        // ── Camera ────────────────────────────────────────────────
        // Orthographic: x = 0…vpW (left→right), y = 0…−vpH (top→bottom)
        // Updating top/bottom each frame to follow window.scrollY
        const camera = new THREE.OrthographicCamera(0, vpW, 0, -vpH, 0.1, 2000)
        camera.position.set(0, 0, 1000)

        // ── Build pipe meshes ─────────────────────────────────────
        let pipeMeshes = [] // { core, glow }[]

        function rebuildPipes() {
            // Dispose old — ALL three mesh types per pipe
            for (const p of pipeMeshes) {
                for (const key of ['core', 'glow', 'mid']) {
                    if (p[key]) {
                        p[key].geometry.dispose()
                        p[key].material.dispose()
                        scene.remove(p[key])
                    }
                }
            }
            pipeMeshes = []

            for (const pipe of PIPES) {
                const curve = buildCurve(pipe, bounds, vpW)
                const segments = Math.max(64, Math.floor(curve.getLength() / 8))
                const color = new THREE.Color(pipe.color)

                // Core tube — thin, bright, emissive
                const coreGeo = new THREE.TubeGeometry(curve, segments, 1.5, 8, false)
                const coreMat = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 1,
                })
                const coreMesh = new THREE.Mesh(coreGeo, coreMat)
                scene.add(coreMesh)

                // Glow tube — wider, soft, additive blended
                const glowGeo = new THREE.TubeGeometry(curve, segments, 8, 8, false)
                const glowMat = new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.18,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                })
                const glowMesh = new THREE.Mesh(glowGeo, glowMat)
                scene.add(glowMesh)

                // Extra mid glow ring
                const midGeo = new THREE.TubeGeometry(curve, segments, 4, 8, false)
                const midMat = new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.35,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                })
                const midMesh = new THREE.Mesh(midGeo, midMat)
                scene.add(midMesh)

                pipeMeshes.push({ core: coreMesh, glow: glowMesh, mid: midMesh })
            }
        }

        rebuildPipes()

        // ── Scroll handler ────────────────────────────────────────
        function onScroll() {
            const scroll = window.scrollY
            const raw = (scroll - (bounds.start - vpH)) / (bounds.end - bounds.start)
            targetProgress = Math.min(1, Math.max(0, raw))
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        // ── Resize handler ────────────────────────────────────────
        function onResize() {
            vpW = window.innerWidth
            vpH = window.innerHeight
            renderer.setSize(vpW, vpH)
            camera.right = vpW
            camera.updateProjectionMatrix()
            bounds = measureBounds()
            rebuildPipes()
            onScroll()
        }
        window.addEventListener('resize', onResize)

        // ── ResizeObserver for content reflows ─────────────────────
        const observer = new ResizeObserver(() => {
            bounds = measureBounds()
            rebuildPipes()
            onScroll()
        })
        observer.observe(document.body)

        // Initial measurement after fonts/images load
        const t1 = setTimeout(() => {
            bounds = measureBounds()
            rebuildPipes()
            onScroll()
        }, 500)

        // ── Animation loop ────────────────────────────────────────
        function animate(t) {
            if (disposed) return
            requestAnimationFrame(animate)

            // Initialize or compute delta time for frame-rate independent interpolation
            if (prevT === null) {
                prevT = t
            }
            const dt = Math.min((t - prevT) / 1000, 0.016) // Cap at 16ms to avoid large jumps
            prevT = t

            // Time-based exponential smoothing: 1 - exp(-k * dt)
            // k ≈ 3.7 provides smooth relaxation behavior
            const timeFactor = 1 - Math.exp(-3.7 * dt)
            drawProgress += (targetProgress - drawProgress) * timeFactor

            // Move camera frustum to follow page scroll
            const scroll = window.scrollY
            camera.top = -scroll
            camera.bottom = -(scroll + vpH)
            camera.updateProjectionMatrix()

            // Update draw ranges based on progress
            for (const p of pipeMeshes) {
                for (const key of ['core', 'glow', 'mid']) {
                    const mesh = p[key]
                    if (!mesh) continue
                    const geo = mesh.geometry
                    if (geo.index) {
                        const total = geo.index.count
                        const limit = Math.floor(total * drawProgress)
                        geo.setDrawRange(0, limit - (limit % 3))
                    }
                }
            }

            renderer.render(scene, camera)
        }
        animate()

        // ── Cleanup ───────────────────────────────────────────────
        return () => {
            disposed = true
            observer.disconnect()
            clearTimeout(t1)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)

            for (const p of pipeMeshes) {
                for (const key of ['core', 'glow', 'mid']) {
                    const mesh = p[key]
                    if (!mesh) continue
                    mesh.geometry.dispose()
                    mesh.material.dispose()
                    scene.remove(mesh)
                }
            }
            renderer.dispose()
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }
        }
    }, [])

    return <div className="pipe-canvas-element" ref={containerRef} />
}
