import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import './Testimonials.css'

const TESTIMONIALS = [
    {
        id: 't1',
        quote: "Working with Gaurav was a game-changer for our startup. He completely transformed our brand identity and built a product that our customers love. Highly recommend.",
        name: 'Alex Johnson',
        role: 'CEO, TechStartup Inc.',
        initials: 'AJ',
    },
    {
        id: 't2',
        quote: "Gaurav has an exceptional eye for design. Every pixel is intentional, every interaction feels polished. He delivered exactly what we envisioned — and then some.",
        name: 'Priya Sharma',
        role: 'Product Manager, DesignCo',
        initials: 'PS',
    },
    {
        id: 't3',
        quote: "Not only is the work stunning, but communication was seamless throughout. He understood our needs immediately and turned around revisions lightning-fast.",
        name: 'Marcus Lee',
        role: 'Founder, Creative Agency',
        initials: 'ML',
    },
]

const anim = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut', delay: d } }),
}

export default function Testimonials() {
    const [active, setActive] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const prev = () => setActive(a => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))
    const next = () => setActive(a => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))

    const current = TESTIMONIALS[active]

    return (
        <section className="testimonials section-pad" id="testimonials" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="testimonials__inner">
                    <motion.p className="section-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        Kind Words
                    </motion.p>
                    <motion.h2 className="testimonials__heading" variants={anim} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        What clients say
                    </motion.h2>

                    <motion.div
                        className="testimonials__card"
                        key={current.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        id="testimonials-card"
                    >
                        <p className="testimonials__quote">"{current.quote}"</p>
                        <div className="testimonials__author">
                            <div className="testimonials__avatar" aria-label={current.name}>{current.initials}</div>
                            <div>
                                <span className="testimonials__name">{current.name}</span>
                                <span className="testimonials__role">{current.role}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <div className="testimonials__controls">
                        <div className="testimonials__dots">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                                    onClick={() => setActive(i)}
                                    aria-label={`Testimonial ${i + 1}`}
                                    id={`testimonial-dot-${i + 1}`}
                                />
                            ))}
                        </div>
                        <div className="testimonials__arrows">
                            <button className="testimonials__arrow" onClick={prev} aria-label="Previous" id="testimonial-prev">
                                <HiChevronLeft size={20} />
                            </button>
                            <button className="testimonials__arrow" onClick={next} aria-label="Next" id="testimonial-next">
                                <HiChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
