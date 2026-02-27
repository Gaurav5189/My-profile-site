import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const anim = {
        hidden: { opacity: 0, y: 40 },
        visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
    }

    return (
        <section className="about section-pad" id="about" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="about__inner">
                    {/* Left column: The moving frame with a fixed background image */}
                    <motion.aside
                        className="about__col-left"
                        variants={anim}
                        custom={0.2}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        <div className="about__image-window">
                            <div
                                className="about__photo-fixed"
                                aria-label="Gaurav — DevSecOps Engineer"
                                role="img"
                            ></div>
                        </div>
                    </motion.aside>

                    {/* Right column: Bio and stats (scrolls normally) */}
                    <div className="about__col-right">
                        <motion.p className="section-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            About Me
                        </motion.p>
                        <motion.h3 className="about__heading" variants={anim} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Securing by Building,<br />Hardening by Default.
                        </motion.h3>
                        <motion.p className="about__body" variants={anim} custom={0.2} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Hi, I'm <strong>Gaurav</strong>. I'm a Backend Engineer who thinks like a Hacker. I specialize in building robust web architectures using Django and Flask, while ensuring every line of code is written with an adversarial perspective.
                        </motion.p>
                        <motion.p className="about__body" variants={anim} custom={0.3} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            I don't just build apps; I manage their entire lifecycle—from secure code commits to live production maintenance. By leveraging n8n for security automation, I bridge the gap between development and operations, creating systems that are not only scalable but resilient against modern threats.
                        </motion.p>

                        <motion.div className="about__stats" variants={anim} custom={0.4} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            {[
                                { value: '2+', label: 'Years in DevSecOps' },
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
