import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TextScramble from './ui/TextScramble'
import './Testimonials.css'

const anim = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: d } }),
}

export default function Testimonials() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="testimonials section-pad" id="testimonials" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="testimonials__inner">

                    <motion.p
                        className="section-label"
                        variants={anim}
                        custom={0}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        Engineering Philosophy
                    </motion.p>

                    <motion.h2
                        className="testimonials__heading"
                        variants={anim}
                        custom={0.1}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        <TextScramble trigger={isInView}>Engineering Philosophy</TextScramble>
                    </motion.h2>

                    {/* Single centered philosophy quote block */}
                    <motion.div
                        className="philosophy__card"
                        id="philosophy-card"
                        variants={anim}
                        custom={0.25}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        {/* Large decorative quotation mark */}
                        <span className="philosophy__mark" aria-hidden="true">&ldquo;</span>

                        <p className="philosophy__quote">
                            I believe security isn&apos;t a final checkpoint; it&apos;s a fundamental
                            pillar of the architecture. My goal is to build systems that are resilient
                            by design and automated by necessity.
                        </p>

                        <div className="philosophy__attribution">
                            <span className="philosophy__line" aria-hidden="true" />
                            <span className="philosophy__author">Gaurav — Security-Aware Builder</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
