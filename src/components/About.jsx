import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextScramble from './ui/TextScramble'
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
                                alt="Gaurav — DevSecOps Engineer"
                                className="about__photo-tilt"
                            />
                        </Tilt>
                    </motion.aside>

                    {/* Right column: Bio and stats (scrolls normally) */}
                    <div className="about__col-right">
                        <motion.p className="section-label text-neon" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            // About Me
                        </motion.p>
                        <motion.h3 className="about__heading" variants={anim} custom={.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Securing by <TextScramble trigger={isInView}>Building,</TextScramble><br />
                            Hardening by <TextScramble trigger={isInView}>Default.</TextScramble>
                        </motion.h3>
                        <p className="about__body">
                            <SplitTextReveal delay={.4} text="Hi, I'm **Gaurav**. I'm a Backend Engineer who thinks like a Hacker. I specialize in building robust web architectures using Django and Flask, while ensuring every line of code is written with an adversarial perspective." />
                        </p>
                        <p className="about__body">
                            <SplitTextReveal delay={.55} text="I don't just build apps; I manage their entire lifecycle—from secure code commits to live production maintenance. By leveraging n8n for security automation, I bridge the gap between development and operations, creating systems that are not only scalable but resilient against modern threats." />
                        </p>

                        <motion.div className="about__stats" variants={anim} custom={.7} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
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
