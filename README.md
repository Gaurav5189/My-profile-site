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
- **Tetromino Preloader:** A custom, fully synchronized geometric preloader that guarantees a minimum display time while waiting for 3D assets to initialize.
- **Animated Text Scramble Effect:** Interactive scrolling headers that decrypt into view natively using Framer Motion's intersection observers with strict bi-directional logic.
- **Staggered Blur Text Effects:** Quote reveals utilizing `useAnimate` to create a smooth, cascading word-blur effect on scroll.
- **Interactive 3D Profiling:** Replaced static images with a dynamic, cursor-following 3D Tilt container enhanced by a realistic Spotlight sheen.
- **Extensive Micro-Animations:** Tastefully implemented CSS-driven interactions, including smooth section divider reveals, tactile button depressions, and glowing link lifts.

## 🛡 DevSecOps Pipeline (Shift Left)
- **Snyk (Software Composition Analysis - SCA):** This looks at your `package.json` to find out if the other people's code you are using (like React or Vite plugins) has known vulnerabilities (CVEs).
- **Gitleaks (Secret Scanning):** This looks at your code to ensure you didn't accidentally commit a private API key, database password, or webhook URL.

*A standard frontend developer might only use one (or neither). A DevSecOps engineer uses both to implement a true "Shift Left" pipeline.*
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
├── .github/
│   └── workflows/
│       └── ci-pipeline.yml          ← Gitleaks & Snyk DevSecOps Action
├── index.html                       ← Entry point, fonts, Spline viewer & meta tags
├── vite.config.js                   ← Vite bundler configuration
├── package.json                     ← Dependencies & scripts
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
        ├── ui/                      ← Custom interactive UI micro-components
        │   ├── Preloader.jsx / .css
        │   ├── Spotlight.jsx
        │   ├── TextGenerateEffect.jsx
        │   ├── TextScramble.jsx
        │   └── Tilt.jsx
        ├── Hero.jsx / .css          ← Two-column 3D hero + typewriter heading
        ├── BackgroundPipeFlow.jsx / .css ← Canvas-based animated pipe background
        ├── Navbar.jsx / .css        ← Sticky glassmorphism nav + mobile menu
        ├── About.jsx / .css         ← Bio, philosophy, and interactive 3D photo
        ├── Skills.jsx / .css        ← Service card grid + scrolling marquee
        ├── Projects.jsx / .css      ← Selected work showcase with images
        ├── Testimonials.jsx / .css  ← Engineering Philosophy quote block
        ├── Contact.jsx / .css       ← Web3Forms functional contact form
        └── Footer.jsx / .css        ← Navigation links & social footprint
```

## 💻 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
