# Gaurav — DevSecOps Engineer & Security Architect Portfolio

A premium, high-performance personal portfolio website built with React and Vite. Showcases projects, engineering philosophy, and technical skills as a security-aware backend engineer.

## 🚀 Key Features
- **Spline 3D Hero:** Interactive 3D power icon loaded via the official `<spline-viewer>` web component, with mobile-optimized `pixel-ratio` and `render-on-demand` for low-power devices.
- **Typewriter Heading:** Auto-typing hero headline that types each line forward, pauses with all three visible, then backtypes before looping — built with a lightweight React state machine.
- **Animated Background Pipes:** Full-viewport canvas-based pipe flow animation that runs behind all content.
- **Responsive "Glassmorphic" Design:** Modern dark theme with CSS custom properties for sleek, frosted glass UI components.
- **Dynamic Scroll Animations:** Section reveals and smooth layouts using `framer-motion`.
- **Fully Functional Contact Form:** Integrated with Web3Forms API to deliver messages directly to email — no backend needed.
- **Mobile Performance Optimised:** Spline pixel-ratio reduction and render-on-demand on touch / small-screen devices.
- **SEO Ready:** Custom meta description, keywords, and semantic HTML tuned for DevSecOps / backend engineering search terms.

## 🛠 Tech Stack
- **Framework:** React 18 + Vite 5
- **Styling:** Vanilla CSS (custom properties, Grid & Flexbox)
- **Animations:** Framer Motion
- **3D Rendering:** Spline (`<spline-viewer>` web component)
- **Background FX:** HTML Canvas (BackgroundPipeFlow)
- **Forms API:** Web3Forms
- **Icons:** React Icons (Feather & Hero icons)

---

## 📂 Site Structure Tree

```text
My-profile-site/
├── index.html                       ← Entry point, fonts, Spline viewer & meta tags
├── vite.config.js                   ← Vite bundler configuration
├── package.json                     ← Dependencies & scripts
├── requirements.txt                 ← Plain text mirror of all project dependencies
├── public/                          ← Static assets (served at root /)
│   ├── favicon.svg
│   ├── gaurav.webp                  ← Profile photo (WebP optimised)
│   ├── pycloud-img.webp             ← PyCloud project screenshot
│   ├── ravenshaw-site.webp          ← Ravenshaw Alumni project screenshot
│   └── scene-clean.splinecode       ← Local 3D Spline scene file
└── src/
    ├── main.jsx                     ← React bootstrap
    ├── App.jsx                      ← Root layout composer
    ├── styles/
    │   └── global.css               ← Design tokens, CSS variables, utilities
    └── components/
        ├── Hero.jsx / .css          ← Two-column 3D hero + typewriter heading
        ├── BackgroundPipeFlow.jsx / .css ← Canvas-based animated pipe background
        ├── Navbar.jsx / .css        ← Sticky glassmorphism nav + mobile menu
        ├── About.jsx / .css         ← Bio, philosophy, and profile photo
        ├── Skills.jsx / .css        ← Service card grid + scrolling marquee
        ├── Projects.jsx / .css      ← Selected work showcase with images
        ├── ThreeDViewer.jsx         ← React Three Fiber component
        ├── Testimonials.jsx / .css  ← Engineering Philosophy quote block
        ├── Contact.jsx / .css       ← Web3Forms functional contact form
        └── Footer.jsx / .css        ← Navigation links & social footprint
```

## 💻 Running Locally

1. Install dependencies (listed in `package.json`, mirrored in `requirements.txt`):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
