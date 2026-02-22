import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiArrowDown } from 'react-icons/hi'
import './Hero.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay } }),
}

export default function Hero() {
    return (
        <section className="hero section-pad" id="hero">

            {/* === Spline 3D background — fills left portion === */}
            <div className="hero__spline-wrap" aria-hidden="true">
                <spline-viewer
                    url="https://prod.spline.design/1k31OrecM06Uz8Qd/scene.splinecode"
                    loading-anim-type="none"
                />
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
                        Securing systems,<br />
                        <span className="hero__heading--outlined">shifting left,</span><br />
                        building trust.
                    </motion.h1>

                    <motion.p
                        className="hero__sub"
                        variants={fadeUp}
                        custom={0.4}
                        initial="hidden"
                        animate="visible"
                    >
                        I embed security into every stage of the SDLC — from code to cloud —
                        so teams can ship faster without leaving doors open.
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
