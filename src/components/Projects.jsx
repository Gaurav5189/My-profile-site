import { useEffect, useRef, useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import './Projects.css'

const PROJECTS = [
    {
        id: 'p1',
        title: 'Ravenshaw Alumni System',
        category: 'Secure Backend Development',
        quote: '"Architected and deployed a dedicated alumni networking platform. Hardened the application by implementing core Django security protocols and routing traffic through Cloudflare for enhanced DDoS protection."',
        image: '/ravenshaw-site.webp',
        color: 'var(--neon-red)',
        link: 'https://ravenshawalumnisystem.dpdns.org',
        tags: ['Django', 'Python', 'Cloudflare', 'Web Security']
    },
    {
        id: 'p2',
        title: 'PyCloud Media Server',
        category: 'System Architecture',
        quote: '"Built a lightweight, self-hosted personal cloud and media center in pure Python. Engineered asynchronous background task queues, real-time system monitoring, and secure local file streaming."',
        image: '/pycloud-img.webp',
        color: 'var(--neon-green)',
        link: 'https://github.com/Gaurav5189/PyCloud-Server',
        tags: ['Python 3', 'Linux', 'Asynchronous I/O', 'Self-Hosted']
    },
    {
        id: 'p3',
        title: 'n8n Security Pipelines',
        category: 'Workflow Automation',
        quote: '"Designed automated CI/CD and security workflows bridging development and operations. Triggered automatic tasks and deployment alerts to ensure continuous, secure delivery and maintenance."',
        image: '/n8n-img.webp',
        color: 'var(--neon-cyan)',
        tags: ['n8n', 'CI/CD', 'Automation', 'Webhooks']
    }
]

// Promise-based Web Animations API helper
function wa(el, frames, opts) {
    if (!el) return Promise.resolve()
    return new Promise(res => {
        const a = el.animate(frames, opts)
        a.onfinish = () => res()
        a.oncancel = () => res()
    })
}

export default function Projects() {
    const defaultColor = PROJECTS[0].color
    const [cur, setCur] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [animKey, setAnimKey] = useState(0)
    const isPausedRef = useRef(false)
    const busyRef = useRef(false)
    const timerRef = useRef(null)
    const isVisibleRef = useRef(false)
    const DELAY = 5000

    const sectionRef = useRef(null)
    const bgCardRef = useRef(null)
    const imgCurRef = useRef(null)
    const quoteRef = useRef(null)
    const nameRef = useRef(null)

    useEffect(() => {
        // Preload images
        PROJECTS.forEach((p) => {
            const img = new Image()
            img.src = p.image
        })
    }, [])

    // Whenever current index changes without animation (initial mount)
    useEffect(() => {
        if (sectionRef.current) {
            sectionRef.current.style.setProperty('--accent', PROJECTS[cur].color)
        }
    }, [cur])

    const curRef = useRef(cur)
    curRef.current = cur

    const nextSlide = () => goTo((curRef.current + 1) % PROJECTS.length, true)
    const prevSlide = () => goTo((curRef.current - 1 + PROJECTS.length) % PROJECTS.length, false)

    const resetTimer = () => {
        clearInterval(timerRef.current)
        if (isVisibleRef.current && !isPausedRef.current && !busyRef.current) {
            timerRef.current = setInterval(() => {
                goTo((curRef.current + 1) % PROJECTS.length, true)
            }, DELAY)
            setAnimKey(prev => prev + 1)
        }
    }

    const togglePause = () => {
        setIsPaused(!isPaused)
        isPausedRef.current = !isPaused
        resetTimer()
    }

    // IntersectionObserver to auto-slide only when in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting
                if (entry.isIntersecting) {
                    resetTimer()
                } else {
                    clearInterval(timerRef.current)
                    setIsPaused(false)
                    isPausedRef.current = false
                }
            },
            { threshold: 0.2 }
        )

        const currSection = sectionRef.current
        if (currSection) {
            observer.observe(currSection)
        }

        return () => {
            clearInterval(timerRef.current)
            if (currSection) {
                observer.unobserve(currSection)
            }
        }
    }, [])

    const goTo = async (nextIdx, isNext = true) => {
        if (busyRef.current || nextIdx === curRef.current || !imgCurRef.current) return
        busyRef.current = true
        setIsAnimating(true)
        clearInterval(timerRef.current)

        const next = PROJECTS[nextIdx]
        const nextImgSrc = next.image

        // Strict coordinates for each direction
        const imgExit = isNext ? 'translate(-55%,-55%)' : 'translate(100%,100%)'
        const cardExit = isNext ? 'translateX(-60%)' : 'translateX(70%)'
        const imgEnter = isNext ? 'translate(100%,100%)' : 'translate(-55%,-55%)'
        const cardEnter = isNext ? 'translateX(70%)' : 'translateX(-60%)'
        const textExit = isNext ? 'translateX(30px)' : 'translateX(-30px)'
        const textEnter = isNext ? 'translateX(-28px)' : 'translateX(28px)'

        const DUR_OUT = 480
        const DUR_IN = 580
        const EASE_OUT = 'cubic-bezier(0.4,0,0.6,1)'
        const EASE_IN = 'cubic-bezier(0.16,1,0.3,1)'

        /* ── PHASE 1: everything exits ── */
        await Promise.all([
            wa(imgCurRef.current, [
                { transform: 'translate(0,0)', opacity: 1 },
                { transform: imgExit, opacity: 0 }
            ], { duration: DUR_OUT, easing: EASE_OUT, fill: 'forwards' }),

            wa(bgCardRef.current, [
                { transform: 'translateX(0)', opacity: 1 },
                { transform: cardExit, opacity: 0 }
            ], { duration: DUR_OUT + 60, easing: EASE_OUT, fill: 'forwards' }),

            wa(quoteRef.current, [
                { transform: 'translateY(0)', opacity: 1, filter: 'blur(0px)' },
                { transform: 'translateY(-18px)', opacity: 0, filter: 'blur(10px)' }
            ], { duration: 360, easing: EASE_OUT, fill: 'forwards' }),

            wa(nameRef.current, [
                { transform: 'translateX(0)', opacity: 1 },
                { transform: textExit, opacity: 0 }
            ], { duration: 300, easing: EASE_OUT, fill: 'forwards' })
        ])

        /* ── MID: swap content ── */
        if (sectionRef.current) sectionRef.current.style.setProperty('--accent', next.color)

        // Update React state mid-air to show new dots/avatars/text immediately
        setCur(nextIdx)

        // Give React a tick to update DOM (quote and title text will snap!)
        // However, we are animating the container. 
        imgCurRef.current.src = nextImgSrc
        imgCurRef.current.style.cssText = `transform:${imgEnter}; opacity:0;`
        if (bgCardRef.current) bgCardRef.current.style.cssText = `transform:${cardEnter}; opacity:0;`
        await new Promise(r => setTimeout(r, 16))

        /* ── PHASE 2: everything enters ── */
        await Promise.all([
            wa(imgCurRef.current, [
                { transform: imgEnter, opacity: 0 },
                { transform: 'translate(0,0)', opacity: 1 }
            ], { duration: DUR_IN, easing: EASE_IN, fill: 'forwards' }),

            wa(bgCardRef.current, [
                { transform: cardEnter, opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ], { duration: DUR_IN + 80, easing: EASE_IN, fill: 'forwards' }),

            wa(quoteRef.current, [
                { transform: 'translateY(18px)', opacity: 0, filter: 'blur(10px)' },
                { transform: 'translateY(0)', opacity: 1, filter: 'blur(0px)' }
            ], { duration: 460, delay: 80, easing: EASE_IN, fill: 'forwards' }),

            wa(nameRef.current, [
                { transform: textEnter, opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ], { duration: 420, delay: 140, easing: EASE_IN, fill: 'forwards' })
        ])

        // Clean up inline styles
        const els = [imgCurRef.current, bgCardRef.current, quoteRef.current, nameRef.current]
        els.forEach(el => {
            if (el) el.style.cssText = ''
        })

        busyRef.current = false
        setIsAnimating(false)
        resetTimer()
    }

    const currentProject = PROJECTS[cur]

    return (
        <section className="projects-section section-pad" id="projects" ref={sectionRef} style={{ '--accent': defaultColor }}>
            <div className="orb orb-tl"></div>
            <div className="orb orb-br"></div>
            <div className="orb orb-center" id="orb-center"></div>

            <div className="page-grid">
                {/* Row 1 */}
                <div className="hd-left">
                    <p className="section-label">Featured Work</p>
                    <h2 className="page-title">Selected Projects</h2>
                </div>
                <div className="hd-right">
                    {currentProject.link && (
                        <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="apply-btn">
                            View Project <HiArrowUpRight />
                        </a>
                    )}
                </div>

                {/* Row 2 Left */}
                <div className="main-left">
                    <p className="tech-label">Quick Jump</p>
                    <div className="avatars">
                        {PROJECTS.map((p, i) => (
                            <div className={`av-wrap ${i === cur ? 'lit' : ''}`} key={p.id}>
                                {i === cur && !isAnimating && (
                                    <svg key={`progress-${animKey}`} className="av-progress" viewBox="0 0 54 54">
                                        <circle
                                            className="av-progress-bar"
                                            cx="27" cy="27" r="25.5"
                                            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                                        />
                                    </svg>
                                )}
                                <button
                                    type="button"
                                    className="av"
                                    onClick={() => goTo(i, i > curRef.current)}
                                    aria-label={`Go to ${p.title}`}
                                >
                                    <img src={p.image} alt={p.title} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="quote-clip">
                        <div className="quote-text glass-panel" ref={quoteRef}>
                            <p className="quote-desc">{currentProject.quote}</p>
                            <div className="project-tags">
                                {currentProject.tags.map(t => <span key={t} className="ptag">{t}</span>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2 Right */}
                <div className="main-right">
                    <div className="img-stage">
                        {/* Accent background card */}
                        <div className="bg-card" ref={bgCardRef}></div>
                        {/* Image clip */}
                        <div className="img-clip">
                            <img ref={imgCurRef} className="proj-img" src={currentProject.image} alt={currentProject.title} />
                        </div>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="bt-left">
                    <div className="controls">
                        <button className="ctrl" onClick={() => prevSlide()} aria-label="Previous">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button
                            className="ctrl"
                            title={isPaused ? "Play slideshow" : "Pause slideshow"}
                            onClick={togglePause}
                        >
                            {isPaused ? (
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            )}
                        </button>
                        <button className="ctrl" onClick={() => nextSlide()} aria-label="Next">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>
                    <div className="dots">
                        {PROJECTS.map((_, i) => (
                            <div key={i} className={`dot ${i === cur ? 'on' : ''}`}></div>
                        ))}
                    </div>
                </div>
                <div className="bt-right">
                    <div className="proj-name-wrap" ref={nameRef}>
                        <span className="proj-category">{currentProject.category}</span>
                        <h3 className="proj-name">{currentProject.title}</h3>
                    </div>
                </div>

            </div>
        </section>
    )
}
