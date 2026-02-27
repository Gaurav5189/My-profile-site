import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import './Footer.css'

const NAV_LINKS = [
    { label: 'About', to: 'about' },
    { label: 'Work', to: 'projects' },
    { label: 'Skills', to: 'skills' },
    { label: 'Contact', to: 'contact' },
]

const SERVICES = ['Back-End Dev', 'Security', 'Automation', 'Deployment']

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
                            I build systems that are resilient by design<br />and automated by necessity.
                        </p>
                        <div className="footer__socials">
                            {[
                                { icon: <FiGithub size={16} />, href: 'https://github.com/Gaurav5189', label: 'GitHub', id: 'footer-github' },
                                { icon: <FiLinkedin size={16} />, href: 'https://www.linkedin.com/in/gaurav-s-4b36b624b', label: 'LinkedIn', id: 'footer-linkedin' },
                                { icon: <FiInstagram size={16} />, href: 'https://www.instagram.com/gaurav_s.716?igsh=Z3llN2s2bTNjNmdt', label: 'Instagram', id: 'footer-instagram' },
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
                    <p className="footer__credit">My work. My craft.</p>
                </div>
            </div>
        </footer>
    )
}
