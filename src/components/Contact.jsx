import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiArrowUpRight } from 'react-icons/hi2'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'
import './Contact.css'

const anim = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut', delay: d } }),
}

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = e => setFormState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = e => {
        e.preventDefault()
        // Wire to your preferred backend / Formspree / EmailJS here
        setSubmitted(true)
    }

    return (
        <section className="contact section-pad" id="contact" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="contact__inner">
                    {/* Left: CTA */}
                    <div className="contact__left">
                        <motion.p className="section-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Get In Touch
                        </motion.p>
                        <motion.h2 className="contact__heading" variants={anim} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Ready to build something<br />
                            <span className="contact__heading--outlined">great together?</span>
                        </motion.h2>
                        <motion.p className="contact__sub" variants={anim} custom={0.2} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            Whether you have a project in mind, a question, or just want to say hi — my inbox is always open.
                        </motion.p>

                        <motion.div className="contact__info" variants={anim} custom={0.3} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            <a className="contact__info-item" href="mailto:hello@yourname.com" id="contact-email-link">
                                <FiMail /> <span>hello@yourname.com</span>
                            </a>
                            <div className="contact__info-item">
                                <FiMapPin /> <span>India 🇮🇳</span>
                            </div>
                            <div className="contact__info-item">
                                <FiPhone /> <span>Available for freelance & full-time</span>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div className="contact__socials" variants={anim} custom={0.4} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                            {[
                                { icon: <FiGithub size={18} />, href: 'https://github.com', label: 'GitHub', id: 'social-github' },
                                { icon: <FiLinkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn', id: 'social-linkedin' },
                                { icon: <FiTwitter size={18} />, href: 'https://twitter.com', label: 'Twitter', id: 'social-twitter' },
                                { icon: <FiInstagram size={18} />, href: 'https://instagram.com', label: 'Instagram', id: 'social-instagram' },
                            ].map(({ icon, href, label, id }) => (
                                <a key={label} href={href} className="contact__social-link" aria-label={label} id={id} target="_blank" rel="noopener noreferrer">
                                    {icon}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Form */}
                    <motion.div className="contact__form-wrap" variants={anim} custom={0.2} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        {submitted ? (
                            <div className="contact__success" id="contact-success">
                                <div className="contact__success-icon">✓</div>
                                <h3>Message sent!</h3>
                                <p>Thanks for reaching out — I'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
                                <div className="contact__field">
                                    <label htmlFor="contact-name">Name</label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        name="name"
                                        placeholder="Your full name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="contact-email">Email</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={6}
                                        placeholder="Tell me about your project..."
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary contact__submit" id="contact-submit-btn">
                                    Send Message <HiArrowUpRight />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
