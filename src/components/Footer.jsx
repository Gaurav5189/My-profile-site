import './Footer.css'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__bottom">
                    <p className="footer__copy">© {year} Gaurav. All rights reserved.</p>
                    <p className="footer__credit">Built with react.js</p>
                </div>
            </div>
        </footer>
    )
}
