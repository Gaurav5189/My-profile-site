import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'
import './Footer.css'

const NAV_LINKS = [
    { label: 'About', to: 'about' },
    { label: 'Work', to: 'projects' },
    { label: 'Skills', to: 'skills' },
    { label: 'Contact', to: 'contact' },
]

const SERVICES = ['UI / UX Design', 'Front-End Dev', 'Brand Identity', '3D & Motion']

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    {/* Brand */}
                    <div className="footer__brand">
                        <Link to="hero" smooth duration={600} className="footer__logo" id="footer-logo">
                            G<span>.</span>
                        </Link>
                        <p className="footer__tagline">
                            Designing and building digital experiences<br />that make a difference.
                        </p>
                        <div className="footer__socials">
                            {[
                                { icon: <FiGithub size={16} />, href: 'https://github.com', label: 'GitHub', id: 'footer-github' },
                                { icon: <FiLinkedin size={16} />, href: 'https://linkedin.com', label: 'LinkedIn', id: 'footer-linkedin' },
                                { icon: <FiTwitter size={16} />, href: 'https://twitter.com', label: 'Twitter', id: 'footer-twitter' },
                                { icon: <FiInstagram size={16} />, href: 'https://instagram.com', label: 'Instagram', id: 'footer-instagram' },
                            ].map(({ icon, href, label, id }) => (
                                <a key={label} href={href} className="footer__social-link" aria-label={label} id={id} target="_blank" rel="noopener noreferrer">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="footer__col">
                        <span className="footer__col-title">Navigation</span>
                        <nav className="footer__nav">
                            {NAV_LINKS.map(({ label, to }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    smooth
                                    duration={600}
                                    offset={-80}
                                    className="footer__nav-link"
                                    id={`footer-nav-${to}`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div className="footer__col">
                        <span className="footer__col-title">Services</span>
                        <ul className="footer__list">
                            {SERVICES.map(s => <li key={s}>{s}</li>)}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <span className="footer__col-title">Say Hello</span>
                        <span className="contact__info-title" style={{ color: 'var(--cream)', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Let's Talk</span>
                        <p className="footer__availability">
                            <span className="footer__dot" />
                            Available for new projects
                        </p>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copy">© {year} Gaurav. All rights reserved.</p>
                    <p className="footer__credit">Designed & built with ♥</p>
                </div>
            </div>
        </footer>
    )
}
