import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import GradualSpacing from './ui/GradualSpacing'
import SplitTextReveal from './ui/SplitTextReveal'
import { HiArrowUpRight, HiXMark } from 'react-icons/hi2'
import './Skills.css'

const CATEGORIZED_SKILLS = [
    {
        category: "Backend & Core",
        skills: ["Python", "Django", "Flask", "System Architecture", "RESTful APIs", "Redis", "PostgreSQL", "Data Security"]
    },
    {
        category: "Offensive Security",
        skills: ["Ethical Hacking", "Penetration Testing", "Burp Suite", "Nmap", "Vulnerability Assessment", "OWASP Top 10"]
    },
    {
        category: "Automation & Ops",
        skills: ["n8n", "Workflow Automation", "CI/CD Pipelines", "Bash Scripting", "Linux Server Admin", "Docker", "DevSecOps"]
    },
    {
        category: "Security Tools",
        skills: ["Git / GitHub", "Cloudflare WAF", "Network Hardening", "Burp Suite", "Nmap", "Metasploit", "Wireshark"]
    }
];

const anim = {
    hidden: { opacity: 0, y: 40 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
}

export default function Skills() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const ref = useRef(null)
    const modalRef = useRef(null)
    const openButtonRef = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const SERVICES = [
        {
            number: '01',
            title: 'Secure Backend Development',
            desc: 'Architecting and building robust, scalable server-side applications. I focus on writing clean code with security baked in from day one, mitigating vulnerabilities at the framework level.',
            tags: ['Django', 'Flask', 'Python', 'REST APIs'],
        },
        {
            number: '02',
            title: 'Offensive Security & Pen Testing',
            desc: 'Leveraging a hacker\'s mindset to proactively hunt for vulnerabilities in web applications and networks. I identify and patch OWASP Top 10 flaws before they reach production.',
            tags: ['Penetration Testing', 'OWASP', 'Burp Suite', 'Nmap'],
        },
        {
            number: '03',
            title: 'Workflow & Dev Automation',
            desc: 'Designing intelligent, automated workflows to streamline operations. From triggering automatic security scans on code commits to managing alert systems, I bridge the gap between development and ops.',
            tags: ['n8n', 'CI/CD', 'API Integration', 'Python Scripting'],
        },
        {
            number: '04',
            title: 'Infrastructure & Deployment',
            desc: 'Managing live production environments and networking configurations. I handle end-to-end deployment, ensuring high availability, secure defaults, and continuous maintenance for active websites.',
            tags: ['Linux', 'Networking', 'Server Admin', 'Deployment'],
        },
    ]

    const skillsList = [
        'Python', 'Django', 'Flask', 'Ethical Hacking', 'Penetration Testing', 'Burp Suite',
        'n8n', 'Workflow Automation', 'OWASP', 'Networking', 'API Security',
        'Linux Admin', 'CI/CD', 'Live Deployment'
    ]
    // Duplicate the list so the animation can loop seamlessly without skipping
    const doubledList = [...skillsList, ...skillsList]

    // Handle Escape key and focus management for modal accessibility
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && isPopupOpen) {
                setIsPopupOpen(false)
            }
        }

        if (isPopupOpen) {
            // Store reference to button that opened modal
            openButtonRef.current = document.activeElement
            // Focus modal and add keyboard listener
            window.addEventListener('keydown', handleEscapeKey)
            // Short delay to allow modal to render before focusing
            setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.focus()
                }
            }, 0)
        }

        return () => {
            window.removeEventListener('keydown', handleEscapeKey)
            // Return focus to the button that opened the modal
            if (!isPopupOpen && openButtonRef.current) {
                openButtonRef.current.focus()
            }
        }
    }, [isPopupOpen])

    return (
        <section className="skills section-pad" id="skills" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="skills__header">
                    <motion.p className="section-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        What I Do
                    </motion.p>
                    <motion.h2 className="skills__heading" variants={anim} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        <GradualSpacing text="Services & Skills" />
                    </motion.h2>
                </div>

                <div className="skills__grid">
                    {SERVICES.map(({ number, title, desc, tags }, i) => (
                        <motion.div
                            key={number}
                            className="skill-card"
                            variants={anim}
                            custom={0.1 + i * 0.1}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            id={`skill-card-${i + 1}`}
                        >
                            <div className="skill-card__top">
                                <span className="skill-card__number">{number}</span>
                                <HiArrowUpRight className="skill-card__arrow" />
                            </div>
                            <motion.h3 className="skill-card__title" variants={anim} custom={(i * .1) + .25} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>{title}</motion.h3>
                            <p className="skill-card__desc">
                                <SplitTextReveal delay={(i * .1) + .4} text={desc} />
                            </p>
                            <motion.div className="skill-card__tags" variants={anim} custom={(i * .1) + .55} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                                {tags.map(tag => (
                                    <span key={tag} className="skill-card__tag">{tag}</span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scrolling marquee - Placed outside the container to span full width */}
            <div className="skills__marquee" aria-hidden="true">
                <div className="skills__marquee-track">
                    {doubledList.map((t, i) => (
                        <span key={`${t}-${i}`}>{t} <em>▲</em></span>
                    ))}
                </div>
            </div>

            <div className="skills__view-all-wrap">
                <button
                    ref={openButtonRef}
                    className="view-all-btn"
                    onClick={() => setIsPopupOpen(true)}
                >
                    View All My Skills
                </button>
            </div>

            <AnimatePresence>
                {isPopupOpen && (
                    <div className="skills-modal-overlay" onClick={() => setIsPopupOpen(false)}>
                        <motion.div
                            ref={modalRef}
                            className="skills-modal glass"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                            tabIndex={-1}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-modal" onClick={() => setIsPopupOpen(false)} aria-label="Close dialog">
                                <HiXMark />
                            </button>

                            <div className="modal-header">
                                <h2 className="modal-title" id="modal-title">Complete Skills Matrix</h2>
                                <p className="modal-subtitle">Comprehensive overview of my core competencies and tool stack.</p>
                            </div>

                            <div className="modal-grid">
                                {CATEGORIZED_SKILLS.map((cat, idx) => (
                                    <div key={cat.category} className="modal-category">
                                        <h3 className="category-title">{cat.category}</h3>
                                        <div className="category-skills-list">
                                            {cat.skills.map(skill => (
                                                <span key={skill} className="skill-pill">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
