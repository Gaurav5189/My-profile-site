import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './BackgroundPipeFlow.css'

/**
 * BackgroundPipeFlow
 * ------------------
 * Dynamically draws neon pipes as the user scrolls.
 * 
 * Rules applied from requirements:
 * 1. Starts at "About" section, ends exactly before "Contact"
 * 2. Dynamically draws (grows) as you scroll down
 * 3. Does not overlap text (pipes stay strictly in gutters/edges)
 * 4. Fixed positioning overlay behind/alongside content, no opaque backgrounds blocking it.
 */
export default function BackgroundPipeFlow() {
    const [bounds, setBounds] = useState({ start: 700, end: 5700, height: 6000 })
    const [vpWidth, setVpWidth] = useState(1440)
    const [vpHeight, setVpHeight] = useState(800)

    // ── Measure section bounds dynamically ────────────────────────────
    useEffect(() => {
        const measure = () => {
            const about = document.querySelector('.about') || document.getElementById('about') || document.querySelector('section:nth-of-type(2)')
            const contact = document.querySelector('.contact') || document.getElementById('contact')
            const testimonials = document.querySelector('.testimonials') || document.getElementById('testimonials')

            const startY = about ? about.offsetTop : 730
            // End exact at the start of Contact, or bottom of Testimonials
            const endY = contact ? contact.offsetTop : (testimonials ? testimonials.offsetTop + testimonials.offsetHeight : 5700)

            const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)

            setBounds({ start: startY, end: endY, height: docH })
            setVpWidth(window.innerWidth)
            setVpHeight(window.innerHeight)
        }

        // Measure after render 
        const t1 = setTimeout(measure, 300)
        const t2 = setTimeout(measure, 1000)
        window.addEventListener('resize', measure)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            window.removeEventListener('resize', measure)
        }
    }, [])

    // ── Scroll Progress & Spring Physics ──────────────────────────────
    const { scrollY } = useScroll()

    // We want the pipe to draw roughly down to where the bottom of the screen is.
    // So current "scanline" is scrollY + vpHeight
    // We start drawing when scanline hits bounds.start, and finish when scanline hits bounds.end + padding
    const drawProgressRaw = useTransform(
        scrollY,
        [Math.max(0, bounds.start - vpHeight), bounds.end - vpHeight * 0.5],
        [0, 1],
        { clamp: true }
    )

    // Smooth "Antigravity" feeling spring
    const drawProgress = useSpring(drawProgressRaw, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001
    })

    // ── Pipe definitions ──────────────────────────────────────────────
    // Since pipes go behind the content (z-index: -1), they can weave freely
    // across the page width. We distribute them across vpWidth.
    const pipes = [
        { x: vpWidth * 0.12, color: '#00ff88', turns: [0.12, 0.40, 0.68] },
        { x: vpWidth * 0.35, color: '#ff3eb5', turns: [0.20, 0.48, 0.77] },
        { x: vpWidth * 0.65, color: '#a855f7', turns: [0.15, 0.45, 0.72] },
        { x: vpWidth * 0.88, color: '#38bdf8', turns: [0.25, 0.55, 0.80] },
    ]

    // ── Build SVG path data, anchored between bounds.start and bounds.end
    // Now with horizontal entry/exit from the edges of the screen!
    const buildPath = (pipe) => {
        const r = 32         // Larger, smoother elbow curve
        const jog = 140      // Much larger zig-zags in background
        let cx = pipe.x

        const startTy = bounds.start
        const endTy = bounds.end
        const totalH = endTy - startTy

        // Entry logic (comes from off-screen side towards x)
        const isLeft = cx < vpWidth / 2
        const sideX = isLeft ? -100 : vpWidth + 100
        const entryDir = isLeft ? 1 : -1

        let d = `M ${sideX} ${startTy.toFixed(1)}`
        // Line moving horizontal from side coords towards x
        d += ` L ${(cx - entryDir * r).toFixed(1)} ${startTy.toFixed(1)}`
        // Turn 90deg downwards
        d += ` Q ${cx.toFixed(1)} ${startTy.toFixed(1)} ${cx.toFixed(1)} ${(startTy + r).toFixed(1)}`

        let dir = isLeft ? 1 : -1 // alternating jog direction

        pipe.turns.forEach((frac) => {
            const ty = startTy + frac * totalH
            // Ensure we don't jog off screen completely
            const tx = Math.min(Math.max(cx + dir * jog, r), vpWidth - r)
            const ad = tx > cx ? 1 : -1

            d += ` L ${cx.toFixed(1)} ${(ty - r).toFixed(1)}`
            d += ` Q ${cx.toFixed(1)} ${ty.toFixed(1)} ${(cx + ad * r).toFixed(1)} ${ty.toFixed(1)}`
            d += ` L ${(tx - ad * r).toFixed(1)} ${ty.toFixed(1)}`
            d += ` Q ${tx.toFixed(1)} ${ty.toFixed(1)} ${tx.toFixed(1)} ${(ty + r).toFixed(1)}`

            cx = tx
            dir *= -1
        })

        // Exit logic (turns horizontal and goes off-screen)
        const exitIsLeft = cx < vpWidth / 2
        const exitSideX = exitIsLeft ? -100 : vpWidth + 100
        const exitDir = exitIsLeft ? 1 : -1

        d += ` L ${cx.toFixed(1)} ${(endTy - r).toFixed(1)}`
        // Turn 90deg towards edge
        d += ` Q ${cx.toFixed(1)} ${endTy.toFixed(1)} ${(cx - exitDir * r).toFixed(1)} ${endTy.toFixed(1)}`
        d += ` L ${exitSideX} ${endTy.toFixed(1)}`

        return d
    }

    // Translate the SVG so it scrolls with the Document, mapping coordinates perfectly
    const yTransform = useTransform(scrollY, (y) => -y)

    return (
        <motion.div
            className="pipe-wrapper"
            aria-hidden="true"
            style={{ y: yTransform, height: bounds.height }}
        >
            <svg
                className="pipe-svg"
                viewBox={`0 0 ${vpWidth} ${bounds.height}`}
                width={vpWidth}
                height={bounds.height}
                xmlns="http://www.w3.org/2000/svg"
            >
                {pipes.map((pipe, i) => (
                    <motion.path
                        key={i}
                        d={buildPath(pipe)}
                        stroke={pipe.color}
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        style={{
                            pathLength: drawProgress,
                            filter: `drop-shadow(0 0 6px ${pipe.color}dd) drop-shadow(0 0 16px ${pipe.color}66)`,
                        }}
                    />
                ))}
            </svg>
        </motion.div>
    )
}
