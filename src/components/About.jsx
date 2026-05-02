import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GradualSpacing from './ui/GradualSpacing'
import SplitTextReveal from './ui/SplitTextReveal'
import Tilt from './ui/Tilt'
import Spotlight from './ui/Spotlight'
import './About.css'

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const anim = {
        hidden: { opacity: 0, y: 40 },
        visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
    }

    return (
        <section className="about section-pad" id="about" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="about__inner">
                    {/* Mobile-only label so it can appear above the image */}
                    <motion.p className="section-label text-neon about__mobile-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        // About Me
                    </motion.p>

                    {/* Left column: The moving frame with a fixed background image */}
                    <motion.aside
                        className="about__col-left"
                        variants={anim}
                        custom={0.2}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        <Tilt
                            rotationFactor={6}
                            isReverse
                            className="about__tilt-wrap"
                            springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
                            style={{ transformOrigin: 'center center' }}
                        >
                            <Spotlight
                                size={280}
                                springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
                            />
                            <img
                                src="/gaurav.webp"
                                alt="Gaurav — DevOps Engineer"
                                className="about__photo-tilt"
                            />
                        </Tilt>
                    </motion.aside>

                    {/* Right column: Bio and stats (scrolls normally) */}
                    <div className="about__col-right">
                        <motion.p className="section-label text-neon about__desktop-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            // About Me
                        </motion.p>
                        <motion.h3 className="about__heading" variants={anim} custom={.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            <GradualSpacing text="Building from ground up," /><br />
                            <GradualSpacing delay={0.4} text="securing at every layer" />
                        </motion.h3>
                        <p className="about__body">
                            <SplitTextReveal delay={.5} text="Hi, I'm ^Gaurav^. I'm a ^full-stack developer who specializes in backend architecture^. Because of my practical experience in ^penetration testing^, I approach development with a strong focus on system integrity. I know how to implement modern security protocols to protect applications against the latest vulnerabilities." />
                        </p>
                        <p className="about__body">
                            <SplitTextReveal delay={.6} text="Whether I'm building REST APIs with Django and Flask, managing live server deployments, or setting up workflow automations with n8n, my goal is simple: to write clean code and build systems that are both highly functional and inherently secure." />
                        </p>

                        <motion.div className="about__stats" variants={anim} custom={.7} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            {[
                                { value: '2+', label: 'Years in DevOps' },
                                { value: '3+', label: 'Live Apps & Services' },
                                { value: '15+', label: 'Automations' },
                            ].map(({ value, label }) => (
                                <div className="about__stat" key={label}>
                                    <span className="about__stat-value">{value}</span>
                                    <span className="about__stat-label">{label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
