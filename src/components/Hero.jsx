import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiArrowDown } from 'react-icons/hi'
import SplitTextReveal from './ui/SplitTextReveal'
import './Hero.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay } }),
}

const headingSlideUp = {
    hidden: { y: 40 },
    visible: (delay = 0) => ({ y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay } }),
}

const isMobile =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 900px)').matches)

export default function Hero() {
    const heroRef = useRef(null)
    const splineWrapRef = useRef(null)
    const [splineReady, setSplineReady] = useState(false)
    const [introComplete, setIntroComplete] = useState(false)
    const canShowHero = splineReady && introComplete
    // Performance: unmount 3D scene when scrolled out of view
    const isHeroInView = useInView(heroRef, { margin: '200px' })

    // Check periodically for shadow DOM to remove logo and wait for render
    useEffect(() => {
        if (!isHeroInView) return

        let logoRemoved = false
        let sceneDetected = false

        let interval = setInterval(() => {
            const splineViewer = document.querySelector('spline-viewer')
            if (!splineViewer || !splineViewer.shadowRoot) return

            if (!logoRemoved) {
                const logo = splineViewer.shadowRoot.querySelector('#logo')
                if (logo) {
                    logo.remove()
                    logoRemoved = true
                }
            }

            if (!sceneDetected) {
                const canvas = splineViewer.shadowRoot.querySelector('canvas')
                if (canvas) {
                    sceneDetected = true
                    setSplineReady(true)
                }
            }

            if (logoRemoved && sceneDetected) clearInterval(interval)
        }, 100)

        setTimeout(() => {
            clearInterval(interval)
            setSplineReady(true)
        }, 8000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [isHeroInView])

    // Ensure scrolling works properly over the 3D canvas
    useEffect(() => {
        const wrap = splineWrapRef.current
        if (!wrap) return

        const stopScroll = (e) => {
            e.stopPropagation()
        }

        wrap.addEventListener('wheel', stopScroll, { capture: true, passive: true })
        wrap.addEventListener('touchmove', stopScroll, { capture: true, passive: true })
        wrap.addEventListener('touchstart', stopScroll, { capture: true, passive: true })

        return () => {
            wrap.removeEventListener('wheel', stopScroll, { capture: true })
            wrap.removeEventListener('touchmove', stopScroll, { capture: true })
            wrap.removeEventListener('touchstart', stopScroll, { capture: true })
        }
    }, [])

    return (
        <section ref={heroRef} className="hero section-pad" id="hero">

            {/* Intro Overlay */}
            <motion.div
                className="hero__intro-overlay"
                initial={{ opacity: 1, y: 0 }}
                animate={{
                    opacity: canShowHero ? 0 : 1,
                    pointerEvents: canShowHero ? 'none' : 'auto',
                    y: canShowHero ? -30 : 0
                }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: canShowHero ? 0.3 : 0 }}
                aria-hidden={canShowHero ? 'true' : 'false'}
            >
                <div style={{ textAlign: 'center', padding: '0 20px' }}>
                    <TypewriterIntro text="Hey there, welcome to my portfolio." onComplete={() => setIntroComplete(true)} />
                </div>
            </motion.div>

            {/* Spline 3D background */}
            <div
                ref={splineWrapRef}
                className={`hero__spline-wrap ${canShowHero ? 'hero__spline-wrap--ready' : ''}`}
                aria-hidden="true"
            >
                <spline-viewer
                    url="https://prod.spline.design/MVfQ6oP6J8ivuI7e/scene.splinecode"
                    loading-anim-type="none"
                    {...(isMobile ? { 'pixel-ratio': '1', 'render-on-demand': '' } : {})}
                />
            </div>

            {/* Background Overlay */}
            <div className="hero__overlay" aria-hidden="true" />

            {/* Main content layout container */}
            <div className="container hero__inner">

                {/* Textual content area */}
                <div className="hero__content">
                    <motion.p
                        className="section-label text-neon"
                        variants={fadeUp}
                        custom={.1}
                        initial="hidden"
                        animate="visible"
                    >
                        // DevSecOps Engineer &amp; Security Architect
                    </motion.p>

                    <motion.h1
                        className="hero__heading"
                        variants={headingSlideUp}
                        custom={.25}
                        initial="hidden"
                        animate="visible"
                    >
                        <TypewriterHeading isHeroInView={isHeroInView} />
                    </motion.h1>

                    <p className="hero__sub">
                        <SplitTextReveal delay={0.8} text="I am a full-stack developer specializing in Python (Django/Flask). With a background in ethical hacking, I build web applications that are scalable, efficient, and secure by design from day one." />
                    </p>

                    <motion.div
                        className="hero__actions"
                        variants={fadeUp}
                        custom={.55}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link to="projects" smooth duration={700} offset={-80} id="hero-view-work-btn" className="btn btn-primary" role="button">
                            View My Work
                        </Link>
                        <Link to="contact" smooth duration={700} offset={-80} id="hero-contact-btn" className="btn btn-outline" role="button">
                            Initialize Contact
                        </Link>
                    </motion.div>

                    <motion.div
                        className="hero__scroll"
                        variants={fadeUp}
                        custom={.7}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link to="about" smooth duration={700} offset={-80} id="hero-scroll-btn">
                            <span>Scroll</span>
                            <HiArrowDown className="hero__scroll-icon" />
                        </Link>
                    </motion.div>
                </div>

                {/* Spacer for 3D model */}
                <div className="hero__spacer" aria-hidden="true" />
            </div>

            {/* Background decorative text */}
            <div className="hero__bg-text" aria-hidden="true">PORTFOLIO</div>
        </section>
    )
}

/* Typewriter heading logic */
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
function TypewriterHeading({ isHeroInView }) {
    const [phase, setPhase] = useState('typing')   // current phase
    const [lineIdx, setLineIdx] = useState(0)          // active line (typing or erasing)
    const [charIdx, setCharIdx] = useState(0)          // chars shown on active line

    useEffect(() => {
        if (!isHeroInView) return;

        let t

        if (phase === 'typing') {
            const { text } = LINES[lineIdx]
            if (charIdx < text.length) {
                // Type next character
                t = setTimeout(() => {
                    setCharIdx(c => c + 1)
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
            // Hold text visible briefly before clearing
            t = setTimeout(() => {
                setPhase('erasing')
                setLineIdx(LINES.length - 1)
                setCharIdx(LINES[LINES.length - 1].text.length)
            }, PAUSE_COMPLETE)
        }

        else if (phase === 'erasing') {
            if (charIdx > 0) {
                t = setTimeout(() => {
                    setCharIdx(c => c - 1)
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
            setLineIdx(0)
            setCharIdx(0)
            setPhase('typing')
        }

        return () => clearTimeout(t)
    }, [phase, lineIdx, charIdx, isHeroInView])

    return (
        <span className="hero__typewriter">
            {LINES.map((ln, i) => {
                let shown = 0;
                if (phase === 'done' || (phase === 'typing' && i > lineIdx) || (phase === 'erasing' && i > lineIdx)) {
                    shown = 0;
                } else if (phase === 'paused' || i < lineIdx) {
                    shown = ln.text.length;
                } else if (i === lineIdx) {
                    shown = charIdx;
                }
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

/* Initial greeting animation */
function TypewriterIntro({ text, onComplete }) {
    const chars = text.split("");
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', fontWeight: '500', fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: 'var(--cream)', letterSpacing: '0.05em' }}>
                {chars.map((char, index) => {
                    const isLast = index === chars.length - 1;
                    return (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.04,
                                ease: "easeOut"
                            }}
                            onAnimationComplete={() => {
                                if (isLast && onComplete) onComplete();
                            }}
                            style={{ whiteSpace: char === " " ? "pre" : "normal", display: 'inline-block' }}
                        >
                            {char}
                        </motion.span>
                    )
                })}
            </span>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.8, duration: 1 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon-cyan)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: 'inline-block' }}
                >
                    Loading environment...
                </motion.span>
            </motion.div>
        </div>
    )
}
