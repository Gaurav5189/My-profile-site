import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './BackgroundPipeFlow.css'

export default function BackgroundPipeFlow() {
    const [bounds, setBounds] = useState({ start: 1800, end: 5700, height: 6000 })
    const [vpWidth, setVpWidth] = useState(1440)
    const [vpHeight, setVpHeight] = useState(800)
    const [quoteCard, setQuoteCard] = useState(null) // { left, top, right, bottom }

    // ── Measure section bounds dynamically ────────────────────────────
    useEffect(() => {
        const measure = () => {
            const skills = document.querySelector('.skills') || document.getElementById('skills')
            const contact = document.querySelector('.contact') || document.getElementById('contact')
            const testimonials = document.querySelector('.testimonials') || document.getElementById('testimonials')
            const card = document.querySelector('.philosophy__card')

            // Start at the Skills section
            const startY = skills ? skills.offsetTop : 1800
            // End at the bottom of Testimonials (before Contact)
            const endY = testimonials ? testimonials.offsetTop + testimonials.offsetHeight : (contact ? contact.offsetTop : 5700)

            const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)

            // Measure the philosophy quote card position (absolute page coords)
            if (card) {
                const rect = card.getBoundingClientRect()
                setQuoteCard({
                    left: rect.left + window.scrollX,
                    top: rect.top + window.scrollY,
                    right: rect.right + window.scrollX,
                    bottom: rect.bottom + window.scrollY,
                })
            }

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
        stiffness: 80,
        damping: 30,
        restDelta: 0.001
    })

    // ── Pipe definitions ──────────────────────────────────────────────
    // Each pipe gets its OWN unique turn pattern so they look different
    const pipes = [
        {
            id: 1,
            color: '#00ff88',
            side: 'left',
            // Unique staggered turns for green — more organic, asymmetric
            turns: [0.06, 0.19, 0.35, 0.52, 0.68, 0.82, 0.95],
            jogSizes: [160, 200, 150, 190, 170, 220, 160],
        },
        {
            id: 2,
            color: '#ff3eb5',
            side: 'right',
            // Different rhythm for pink — offset from green for visual variety
            turns: [0.10, 0.28, 0.42, 0.60, 0.75, 0.90],
            jogSizes: [180, 160, 220, 170, 200, 150],
        },
    ]

    const buildPath = (pipe) => {
        const r = 64

        const startTy = bounds.start
        const endTy = bounds.end
        const totalH = endTy - startTy

        // Start position based on viewport width (responsive)
        const margin = Math.max(20, vpWidth * 0.04)
        let cx = pipe.side === 'left' ? margin : vpWidth - margin

        // Entry from off-screen side
        const sideX = pipe.side === 'left' ? -100 : vpWidth + 100
        const entryDir = pipe.side === 'left' ? 1 : -1

        let d = `M ${sideX} ${startTy.toFixed(1)}`
        d += ` L ${(cx - entryDir * r).toFixed(1)} ${startTy.toFixed(1)}`
        d += ` Q ${cx.toFixed(1)} ${startTy.toFixed(1)} ${cx.toFixed(1)} ${(startTy + r).toFixed(1)}`

        // Each pipe has its own turn fractions and jog sizes
        // Direction alternates, but starts differently per pipe
        let dir = pipe.side === 'left' ? 1 : -1
        let insertedQuotePass = false

        pipe.turns.forEach((frac, i) => {
            const ty = startTy + frac * totalH
            const jog = pipe.jogSizes[i] || 140

            // ── Special: Green pipe passes through the philosophy quote card ──
            // Insert a jog to the card's left edge right before the card's top
            if (pipe.side === 'left' && quoteCard && !insertedQuotePass && ty > quoteCard.top - 50) {
                insertedQuotePass = true
                const cardTop = quoteCard.top
                const cardLeftX = quoteCard.left // left edge of the card

                // Jog rightward to reach the card's left edge
                const ad = cardLeftX > cx ? 1 : -1
                d += ` L ${cx.toFixed(1)} ${(cardTop - r).toFixed(1)}`
                d += ` Q ${cx.toFixed(1)} ${cardTop.toFixed(1)} ${(cx + ad * r).toFixed(1)} ${cardTop.toFixed(1)}`
                d += ` L ${(cardLeftX - ad * r).toFixed(1)} ${cardTop.toFixed(1)}`
                d += ` Q ${cardLeftX.toFixed(1)} ${cardTop.toFixed(1)} ${cardLeftX.toFixed(1)} ${(cardTop + r).toFixed(1)}`

                cx = cardLeftX
                // Continue downward from the card's left edge
            }

            // Calculate target X, clamped to screen bounds
            const rawTx = Math.min(Math.max(cx + dir * jog, r + 10), vpWidth - r - 10)

            // Ensure the horizontal jog is wide enough for smooth curves (at least 2*r + 20)
            const minJog = 2 * r + 20
            const dist = Math.abs(rawTx - cx)
            if (dist < minJog) {
                // Skip this turn — not enough room for two smooth corners
                dir *= -1
                return
            }

            const tx = rawTx
            const ad = tx > cx ? 1 : -1

            d += ` L ${cx.toFixed(1)} ${(ty - r).toFixed(1)}`
            d += ` Q ${cx.toFixed(1)} ${ty.toFixed(1)} ${(cx + ad * r).toFixed(1)} ${ty.toFixed(1)}`
            d += ` L ${(tx - ad * r).toFixed(1)} ${ty.toFixed(1)}`
            d += ` Q ${tx.toFixed(1)} ${ty.toFixed(1)} ${tx.toFixed(1)} ${(ty + r).toFixed(1)}`

            cx = tx
            dir *= -1
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
                                style={{ pathLength: drawProgress, opacity: 0.12 }}
                            />
                            {/* Medium glow ring */}
                            <motion.path
                                d={path}
                                fill="none"
                                stroke={pipe.color}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pathLength: drawProgress, opacity: 0.3 }}
                            />
                            {/* Core colored line */}
                            <motion.path
                                d={path}
                                fill="none"
                                stroke={pipe.color}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pathLength: drawProgress }}
                            />
                            {/* Bright white center */}
                            <motion.path
                                d={path}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pathLength: drawProgress, opacity: 0.7 }}
                            />
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
