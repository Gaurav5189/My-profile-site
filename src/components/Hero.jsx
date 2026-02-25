import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiArrowDown } from 'react-icons/hi'
import './Hero.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay } }),
}

// Evaluated once at module load — no hook needed
const isMobile =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 900px)').matches)

export default function Hero() {
    const heroRef = useRef(null)
    // Unmount Spline when the hero scrolls out of view (with 200px buffer)
    const isHeroInView = useInView(heroRef, { margin: '200px' })

    return (
        <section ref={heroRef} className="hero section-pad" id="hero">

            {/* === Spline 3D background — only rendered when in view === */}
            <div className="hero__spline-wrap" aria-hidden="true">
                {isHeroInView && (
                    <spline-viewer
                        url="/scene-clean.splinecode"
                        loading-anim-type="none"
                        {...(isMobile ? { 'pixel-ratio': '1', 'render-on-demand': '' } : {})}
                    />
                )}
            </div>

            {/* Overlay: transparent left (3D), dark right (text) */}
            <div className="hero__overlay" aria-hidden="true" />

            {/* === Two-column layout: [3D spacer | text content] === */}
            <div className="container hero__inner">

                {/* Left col — intentionally empty so 3D icon shows through */}
                <div className="hero__left" aria-hidden="true" />

                {/* Right col — all textual content */}
                <div className="hero__right">
                    <motion.p
                        className="section-label"
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        animate="visible"
                    >
                        DevSecOps Engineer &amp; Security Architect
                    </motion.p>

                    <motion.h1
                        className="hero__heading"
                        variants={fadeUp}
                        custom={0.25}
                        initial="hidden"
                        animate="visible"
                    >
                        <TypewriterHeading />
                    </motion.h1>

                    <motion.p
                        className="hero__sub"
                        variants={fadeUp}
                        custom={0.4}
                        initial="hidden"
                        animate="visible"
                    >
                        I bridge the gap between offensive security and robust architecture. By combining Python backend development (Django/Flask) with automated threat modeling (n8n) and a hacker's mindset, I harden infrastructure so teams can ship faster without leaving doors open.
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        variants={fadeUp}
                        custom={0.55}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link to="projects" smooth duration={700} offset={-80} id="hero-view-work-btn">
                            <button className="btn btn-primary">View My Work</button>
                        </Link>
                        <Link to="contact" smooth duration={700} offset={-80} id="hero-contact-btn">
                            <button className="btn btn-outline">Get in Touch</button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="hero__scroll"
                        variants={fadeUp}
                        custom={0.7}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link to="about" smooth duration={700} offset={-80} id="hero-scroll-btn">
                            <span>Scroll</span>
                            <HiArrowDown className="hero__scroll-icon" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Background decorative text */}
            <div className="hero__bg-text" aria-hidden="true">PORTFOLIO</div>
        </section>
    )
}

/* ── Typewriter Heading — type forward, backtype at end ──── */
const LINES = [
    { text: 'Securing systems,', outlined: false },
    { text: 'shifting left,', outlined: true },
    { text: 'building trust.', outlined: false },
]

const TYPE_SPEED = 65    // ms per character typing
const ERASE_SPEED = 35    // ms per character erasing
const PAUSE_LINE = 300   // ms pause between lines
const PAUSE_COMPLETE = 3000  // ms all 3 lines stay visible before erase
const PAUSE_RESTART = 500   // ms pause after fully erased before restart

// phases: 'typing' → 'paused' → 'erasing' → 'done'
function TypewriterHeading() {
    const [phase, setPhase] = useState('typing')   // current phase
    const [lineIdx, setLineIdx] = useState(0)          // active line (typing or erasing)
    const [charIdx, setCharIdx] = useState(0)          // chars shown on active line
    const [lineChars, setLineChars] = useState([0, 0, 0])  // char count per line

    useEffect(() => {
        let t

        if (phase === 'typing') {
            const { text } = LINES[lineIdx]
            if (charIdx < text.length) {
                // Type next character
                t = setTimeout(() => {
                    setCharIdx(c => c + 1)
                    setLineChars(lc => { const n = [...lc]; n[lineIdx] = charIdx + 1; return n })
                }, TYPE_SPEED)
            } else if (lineIdx < LINES.length - 1) {
                // Line done, move to next
                t = setTimeout(() => {
                    setLineIdx(i => i + 1)
                    setCharIdx(0)
                }, PAUSE_LINE)
            } else {
                // All lines typed → pause
                t = setTimeout(() => setPhase('paused'), PAUSE_LINE)
            }
        }

        else if (phase === 'paused') {
            // Hold all 3 lines visible, then start erasing from line 3
            t = setTimeout(() => {
                setPhase('erasing')
                setLineIdx(LINES.length - 1)
                setCharIdx(LINES[LINES.length - 1].text.length)
            }, PAUSE_COMPLETE)
        }

        else if (phase === 'erasing') {
            if (charIdx > 0) {
                // Erase one character
                t = setTimeout(() => {
                    setCharIdx(c => c - 1)
                    setLineChars(lc => { const n = [...lc]; n[lineIdx] = charIdx - 1; return n })
                }, ERASE_SPEED)
            } else if (lineIdx > 0) {
                // Line fully erased, move to previous line
                t = setTimeout(() => {
                    const prevLine = lineIdx - 1
                    setLineIdx(prevLine)
                    setCharIdx(LINES[prevLine].text.length)
                }, PAUSE_LINE / 2)
            } else {
                // All lines erased → done
                t = setTimeout(() => setPhase('done'), PAUSE_RESTART)
            }
        }

        else if (phase === 'done') {
            // Reset and restart the loop
            setLineChars([0, 0, 0])
            setLineIdx(0)
            setCharIdx(0)
            setPhase('typing')
        }

        return () => clearTimeout(t)
    }, [phase, lineIdx, charIdx])

    return (
        <span className="hero__typewriter">
            {LINES.map((ln, i) => {
                const shown = lineChars[i]
                const content = ln.text.slice(0, shown)

                // Cursor shows on the active line during typing & erasing
                const isActiveLine =
                    (phase === 'typing' && i === lineIdx) ||
                    (phase === 'erasing' && i === lineIdx) ||
                    (phase === 'paused' && i === LINES.length - 1)

                return (
                    <span key={i} className="hero__type-line">
                        {/* Hidden full text — always reserves the exact space */}
                        <span className={ln.outlined ? 'hero__heading--outlined' : ''} aria-hidden="true" style={{ visibility: 'hidden' }}>
                            {ln.text}
                        </span>
                        {/* Visible typed portion overlaid on top */}
                        <span className="hero__type-line-text">
                            <span className={ln.outlined ? 'hero__heading--outlined' : ''}>
                                {content}
                            </span>
                            {isActiveLine && (
                                <span className="hero__cursor" aria-hidden="true">|</span>
                            )}
                        </span>
                    </span>
                )
            })}
        </span>
    )
}
