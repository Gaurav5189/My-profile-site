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
                    {/* Left: text */}
                    <div className="about__text">
                        <motion.p className="section-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            About Me
                        </motion.p>
                        <motion.h2 className="about__heading" variants={anim} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Securing pipelines,<br />shielding systems.
                        </motion.h2>
                        <motion.p className="about__body" variants={anim} custom={0.2} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Hi, I'm <strong>Gaurav</strong> — a DevSecOps engineer and security enthusiast based in India.
                            I specialize in weaving security into every layer of the software development lifecycle —
                            from code commit to production deployment — so teams can ship fast without compromising safety.
                        </motion.p>
                        <motion.p className="about__body" variants={anim} custom={0.3} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            My work spans CI/CD pipeline hardening, container security, vulnerability management,
                            infrastructure-as-code (IaC) security, and cloud-native security architecture.
                            I believe secure software isn't a checkpoint — it's a culture, embedded from day one.
                        </motion.p>

                        {/* Stats */}
                        <motion.div className="about__stats" variants={anim} custom={0.4} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            {[
                                { value: '3+', label: 'Years in DevSecOps' },
                                { value: '15+', label: 'Pipelines Secured' },
                                { value: '0', label: 'Critical Breaches' },
                            ].map(({ value, label }) => (
                                <div className="about__stat" key={label}>
                                    <span className="about__stat-value">{value}</span>
                                    <span className="about__stat-label">{label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: photo */}
                    <motion.div
                        className="about__image-wrap"
                        variants={anim}
                        custom={0.2}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        <div className="about__image-frame" id="about-photo">
                            <img
                                src="/gaurav.jpg"
                                alt="Gaurav — DevSecOps Engineer"
                                className="about__photo"
                            />
                        </div>
                        <div className="about__image-border" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
