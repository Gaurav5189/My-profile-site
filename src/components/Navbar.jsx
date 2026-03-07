import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import './Navbar.css'

const NAV_LINKS = [
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Work', to: 'projects' },
    { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                {/* Logo */}
                <Link to="hero" smooth duration={600} className="navbar__logo" id="nav-logo">
                    G<span>.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="navbar__links" aria-label="Main navigation">
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link
                            key={to}
                            to={to}
                            smooth
                            duration={600}
                            offset={-80}
                            className="navbar__link"
                            id={`nav-${to}`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <Link
                    to="contact"
                    smooth
                    duration={600}
                    className="navbar__cta btn btn-outline"
                    id="nav-cta"
                >
                    Hire Me
                </Link>

                {/* Hamburger */}
                <button
                    className="navbar__hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    id="nav-hamburger"
                >
                    {menuOpen ? <HiX size={22} /> : <HiMenuAlt4 size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="navbar__mobile" aria-label="Mobile navigation">
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link
                            key={to}
                            to={to}
                            smooth
                            duration={600}
                            offset={-80}
                            className="navbar__mobile-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        to="contact"
                        smooth
                        duration={600}
                        className="navbar__mobile-link navbar__mobile-cta"
                        onClick={() => setMenuOpen(false)}
                    >
                        Hire Me
                    </Link>
                </nav>
            )}
        </header>
    )
}
