import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './BackgroundPipeFlow.css'

// ── Easy-to-edit configuration for pipelines ─────────────────────
// You can control the direction, color, and turns of pipes for each section here.
export const PIPES_CONFIG = {
    skills: [
        {
            id: 'sk-1',
            color: '#00ff88',
            side: 'left', // Starts from the left side
            turns: [0.2, 0.88], // Percentage down the section to turn
            xTargets: [0.4, 'right'], // Where to turn to (percentage of screen width, or 'left'/'right'/'center')
        },
        {
            id: 'sk-2',
            color: '#ff3eb5',
            side: 'right',
            turns: [0.3, 0.7],
            xTargets: [0.6, 0.2],
        },
    ],
    projects: [
        {
            id: 'pr-1',
            color: '#00ccff',
            side: 'left',
            turns: [0.5, 0.7],
            xTargets: ['left', 'right'],
        },
    ],
    threatModel: [
        {
            id: 'tm-1',
            color: '#ff3b3b',
            side: 'right',
            turns: [0.25, 0.6],
            xTargets: ['center', 'left'],
        },
    ],
}

// ── Build a CurvePath with straight lines and sharp rounded corners ─
// Accepts a `sizing` object for responsive radius/tube sizes
function buildCurve(pipe, sectionBounds, vpW, sizing) {
    const r = sizing.cornerRadius
    const startTy = sectionBounds.start
    const endTy = sectionBounds.end
    const totalH = endTy - startTy

    // Constrain the visual area (wider on mobile so pipes don't overlap content)
    const activeWidth = Math.min(1240, vpW * sizing.activeWidthRatio)
    const margin = (vpW - activeWidth) / 2

    let cx = pipe.side === 'left' ? margin : (vpW - margin)

    // Starting off-screen so the neon line doesn't abruptly spawn on-screen
    const sideX = pipe.side === 'left' ? -100 : vpW + 100
    const entryDir = pipe.side === 'left' ? 1 : -1

    const path = new THREE.CurvePath()
    const v = (x, y) => new THREE.Vector3(x, -y, 0)

    let cursor = v(sideX, startTy)

    let next = v(cx - entryDir * r, startTy)
    path.add(new THREE.LineCurve3(cursor, next))
    cursor = next

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
        else if (typeof target === 'number') {
            // A number like 0.8 now targets 80% of the constrained active width, not the whole screen
            rawTx = margin + (activeWidth * target)
        }

        rawTx = Math.min(Math.max(rawTx, r + 10), vpW - r - 10)

        if (Math.abs(rawTx - cx) < 2 * r + 20) return

        const tx = rawTx
        const ad = tx > cx ? 1 : -1

        let p1 = v(cx, ty - r)
        path.add(new THREE.LineCurve3(cursor, p1))
        cursor = p1

        let ctrl1 = v(cx, ty)
        let end1 = v(cx + ad * r, ty)
        path.add(new THREE.QuadraticBezierCurve3(cursor, ctrl1, end1))
        cursor = end1

        let p2 = v(tx - ad * r, ty)
        path.add(new THREE.LineCurve3(cursor, p2))
        cursor = p2

        let ctrl2 = v(tx, ty)
        let end2 = v(tx, ty + r)
        path.add(new THREE.QuadraticBezierCurve3(cursor, ctrl2, end2))
        cursor = end2

        cx = tx
    })

    const exitIsLeft = cx < vpW / 2
    const exitSideX = exitIsLeft ? -100 : vpW + 100
    const exitDir = exitIsLeft ? 1 : -1

    let pExit1 = v(cx, endTy - r)
    path.add(new THREE.LineCurve3(cursor, pExit1))
    cursor = pExit1

    let ctrlExit = v(cx, endTy)
    let endExit = v(cx - exitDir * r, endTy)
    path.add(new THREE.QuadraticBezierCurve3(cursor, ctrlExit, endExit))
    cursor = endExit

    let pExitFinal = v(exitSideX, endTy)
    path.add(new THREE.LineCurve3(cursor, pExitFinal))

    return path
}

// ── Measure all section positions on the page ─────────────────────────
function measureSectionBounds() {
    const pipePadding = 100 // Create a ~200px total gap between sections (~8 lines)
    const getBounds = (selector, fallbackStart, fallbackHeight) => {
        const el = document.querySelector(selector) || document.getElementById(selector.replace('.', ''))
        if (el) {
            return {
                start: el.offsetTop + pipePadding,
                end: el.offsetTop + el.offsetHeight - pipePadding,
            }
        }
        return { start: fallbackStart + pipePadding, end: fallbackStart + fallbackHeight - pipePadding }
    }

    return {
        skills: getBounds('.skills', 1000, 1500),
        projects: getBounds('.projects', 2500, 2000),
        threatModel: getBounds('.threat-model', 4500, 1000),
    }
}

export default function BackgroundPipeFlow() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let sectionBounds = measureSectionBounds()
        let vpW = window.innerWidth
        let vpH = window.innerHeight
        let disposed = false

        // ── Responsive sizing ────────────────────────────────────
        function getSizing(w) {
            if (w < 768) {
                // On mobile: original pipeline thickness, pushed to absolute screen edges
                return { cornerRadius: 32, coreRadius: 1.5, midRadius: 4, glowRadius: 8, activeWidthRatio: 1.0, glowOpacity: 0.18, midOpacity: 0.35 }
            }
            return { cornerRadius: 64, coreRadius: 1.5, midRadius: 4, glowRadius: 8, activeWidthRatio: 0.8, glowOpacity: 0.18, midOpacity: 0.35 }
        }
        let sizing = getSizing(vpW)

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(vpW, vpH)
        container.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(0, vpW, 0, -vpH, 0.1, 2000)
        camera.position.set(0, 0, 1000)

        // { sectionName: { pipeData, core, glow, mid } }
        let pipesData = []

        function rebuildPipes() {
            for (const p of pipesData) {
                for (const key of ['core', 'glow', 'mid']) {
                    if (p[key]) {
                        p[key].geometry.dispose()
                        p[key].material.dispose()
                        scene.remove(p[key])
                    }
                }
            }
            pipesData = []

            for (const [sectionKey, pipesArr] of Object.entries(PIPES_CONFIG)) {
                const bounds = sectionBounds[sectionKey]
                if (!bounds) continue

                for (const pipe of pipesArr) {
                    const curve = buildCurve(pipe, bounds, vpW, sizing)
                    const segments = Math.max(64, Math.floor(curve.getLength() / 8))
                    const color = new THREE.Color(pipe.color)

                    const coreGeo = new THREE.TubeGeometry(curve, segments, sizing.coreRadius, 8, false)
                    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 })
                    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
                    scene.add(coreMesh)

                    const glowGeo = new THREE.TubeGeometry(curve, segments, sizing.glowRadius, 8, false)
                    const glowMat = new THREE.MeshBasicMaterial({
                        color: color, transparent: true, opacity: sizing.glowOpacity, blending: THREE.AdditiveBlending, depthWrite: false
                    })
                    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
                    scene.add(glowMesh)

                    const midGeo = new THREE.TubeGeometry(curve, segments, sizing.midRadius, 8, false)
                    const midMat = new THREE.MeshBasicMaterial({
                        color: color, transparent: true, opacity: sizing.midOpacity, blending: THREE.AdditiveBlending, depthWrite: false
                    })
                    const midMesh = new THREE.Mesh(midGeo, midMat)
                    scene.add(midMesh)

                    pipesData.push({
                        section: sectionKey,
                        bounds,
                        core: coreMesh,
                        glow: glowMesh,
                        mid: midMesh
                    })
                }
            }
        }

        rebuildPipes()

        function onResize() {
            vpW = window.innerWidth
            vpH = window.innerHeight
            sizing = getSizing(vpW)
            renderer.setSize(vpW, vpH)
            camera.right = vpW
            camera.updateProjectionMatrix()
            sectionBounds = measureSectionBounds()
            rebuildPipes()
        }
        window.addEventListener('resize', onResize)

        const observer = new ResizeObserver(() => {
            sectionBounds = measureSectionBounds()
            rebuildPipes()
        })
        observer.observe(document.body)

        const t1 = setTimeout(() => {
            sectionBounds = measureSectionBounds()
            rebuildPipes()
        }, 500)

        // ── Animation loop ────────────────────────────────────────
        function animate() {
            if (disposed) return
            requestAnimationFrame(animate)

            const scroll = window.scrollY
            camera.top = -scroll
            camera.bottom = -(scroll + vpH)
            camera.updateProjectionMatrix()

            for (const p of pipesData) {
                // Anchor the pipeline tip so it stays consistently at 75% of the viewport height as you scroll
                const viewportLevel = vpH * 0.75
                const currentY = scroll + viewportLevel

                let rawProgress = 0
                if (p.bounds.end > p.bounds.start) {
                    rawProgress = (currentY - p.bounds.start) / (p.bounds.end - p.bounds.start)
                }
                const progress = Math.min(1, Math.max(0, rawProgress))

                for (const key of ['core', 'glow', 'mid']) {
                    const mesh = p[key]
                    if (!mesh) continue
                    const geo = mesh.geometry
                    if (geo.index) {
                        const total = geo.index.count
                        const limit = Math.floor(total * progress)
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
            window.removeEventListener('resize', onResize)

            for (const p of pipesData) {
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
