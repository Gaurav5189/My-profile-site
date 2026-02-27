import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './BackgroundPipeFlow.css'

export default function BackgroundPipeFlow() {
    const [bounds, setBounds] = useState({ start: 1800, end: 5700, height: 6000 })
    const [vpWidth, setVpWidth] = useState(1440)
    const [vpHeight, setVpHeight] = useState(800)


    // ── Measure section bounds dynamically ────────────────────────────
    useEffect(() => {
        const measure = () => {
            const skills = document.querySelector('.skills') || document.getElementById('skills')
            const contact = document.querySelector('.contact') || document.getElementById('contact')
            const testimonials = document.querySelector('.testimonials') || document.getElementById('testimonials')

            // Start at the Skills section
            const startY = skills ? skills.offsetTop : 1800

            // End at the bottom of Testimonials (before Contact)
            const endY = testimonials ? testimonials.offsetTop + testimonials.offsetHeight : (contact ? contact.offsetTop : 5700)

            const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)



            setBounds({ start: startY, end: endY, height: docH })
            setVpWidth(window.innerWidth)
            setVpHeight(window.innerHeight)
        }

        const t1 = setTimeout(measure, 300)
        const t2 = setTimeout(measure, 1000)
        window.addEventListener('resize', measure)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            window.removeEventListener('resize', measure)
        }
    }, [])

    const { scrollY } = useScroll()

    // Draw starts when the viewport bottom reaches Skills section
    const drawProgressRaw = useTransform(
        scrollY,
        [Math.max(0, bounds.start - vpHeight), bounds.end - vpHeight * 0.3],
        [0, 1],
        { clamp: true }
    )

    const drawProgress = useSpring(drawProgressRaw, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.002
    })

    // ── Pipe definitions ──────────────────────────────────────────────
    // Each pipe gets its OWN unique turn pattern based on vertical page percentages
    // and horizontal xTargets ('left', 'right', 'center', or a decimal fraction like 0.3)
    const pipes = [
        {
            id: 1,
            color: '#00ff88',
            side: 'left',
            // Green pipe path exact to the drawing
            turns: [0.08, 0.20, 0.43, 0.52, 0.65, 0.83, 0.94],
            xTargets: [0.39, 0.85, 'left', 0.55, 'left', 0.80, 'left'],
        },
        {
            id: 2,
            color: '#ff3eb5',
            side: 'right',
            // Pink pipe path exact to the drawing
            turns: [0.17, 0.24, 0.41, 0.55, 0.65, 0.76, 0.90],
            xTargets: [0.65, 'left', 'right', 0.45, 'right', 0.20, 'right'],
        },
    ]

    const buildPath = (pipe) => {
        const r = 64

        const startTy = bounds.start
        const endTy = bounds.end
        const totalH = endTy - startTy

        // Base responsive margin
        const margin = Math.max(20, vpWidth * 0.04)
        let cx = pipe.side === 'left' ? margin : vpWidth - margin

        // Entry from off-screen side
        const sideX = pipe.side === 'left' ? -100 : vpWidth + 100
        const entryDir = pipe.side === 'left' ? 1 : -1

        let d = `M ${sideX} ${startTy.toFixed(1)}`
        d += ` L ${(cx - entryDir * r).toFixed(1)} ${startTy.toFixed(1)}`
        d += ` Q ${cx.toFixed(1)} ${startTy.toFixed(1)} ${cx.toFixed(1)} ${(startTy + r).toFixed(1)}`

        pipe.turns.forEach((frac, i) => {
            const ty = startTy + frac * totalH

            // Resolve explicit target X
            const targetFormat = pipe.xTargets[i]
            let rawTx = cx
            if (targetFormat === 'left') {
                rawTx = margin
            } else if (targetFormat === 'right') {
                rawTx = vpWidth - margin
            } else if (targetFormat === 'center') {
                rawTx = vpWidth / 2
            } else if (typeof targetFormat === 'number') {
                rawTx = vpWidth * targetFormat
            }

            // Ensure bounds clamping
            rawTx = Math.min(Math.max(rawTx, r + 10), vpWidth - r - 10)

            const dist = Math.abs(rawTx - cx)
            const minJog = 2 * r + 20

            // Skip the curve entirely if it's too short to draw the radiuses
            if (dist < minJog) return

            const tx = rawTx
            const ad = tx > cx ? 1 : -1

            d += ` L ${cx.toFixed(1)} ${(ty - r).toFixed(1)}`
            d += ` Q ${cx.toFixed(1)} ${ty.toFixed(1)} ${(cx + ad * r).toFixed(1)} ${ty.toFixed(1)}`
            d += ` L ${(tx - ad * r).toFixed(1)} ${ty.toFixed(1)}`
            d += ` Q ${tx.toFixed(1)} ${ty.toFixed(1)} ${tx.toFixed(1)} ${(ty + r).toFixed(1)}`

            cx = tx
        })

        // Exit logic — pipe exits off the nearest side
        const exitIsLeft = cx < vpWidth / 2
        const exitSideX = exitIsLeft ? -100 : vpWidth + 100
        const exitDir = exitIsLeft ? 1 : -1

        d += ` L ${cx.toFixed(1)} ${(endTy - r).toFixed(1)}`
        d += ` Q ${cx.toFixed(1)} ${endTy.toFixed(1)} ${(cx - exitDir * r).toFixed(1)} ${endTy.toFixed(1)}`
        d += ` L ${exitSideX} ${endTy.toFixed(1)}`

        return d
    }

    return (
        <div className="pipe-wrapper">
            <svg
                className="pipe-svg"
                width={vpWidth}
                height={bounds.height}
                xmlns="http://www.w3.org/2000/svg"
            >
                {pipes.map((pipe) => {
                    const path = buildPath(pipe)
                    return (
                        <g key={pipe.id}>
                            {/* Wide soft outer glow — very cheap for GPU */}
                            <motion.path
                                d={path}
                                fill="none"
                                stroke={pipe.color}
                                strokeWidth="16"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pathLength: drawProgress, opacity: 0.12, willChange: 'stroke-dashoffset' }}
                            />
                            {/* Medium glow ring */}
                            <motion.path
                                d={path}
                                fill="none"
                                stroke={pipe.color}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pathLength: drawProgress, opacity: 0.3, willChange: 'stroke-dashoffset' }}
                            />
                            {/* Core colored line */}
                            <motion.path
                                d={path}
                                fill="none"
                                stroke={pipe.color}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pathLength: drawProgress, willChange: 'stroke-dashoffset' }}
                            />
                            {/* Bright white center */}
                            <motion.path
                                d={path}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pathLength: drawProgress, opacity: 0.7, willChange: 'stroke-dashoffset' }}
                            />
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
