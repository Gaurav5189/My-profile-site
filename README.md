<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shield.png" alt="Shield" width="80" />
  
  # <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=00FF88&center=true&vCenter=true&width=600&lines=Gaurav+—+DevSecOps+Engineer;Security+Architect;Backend+Specialist;Building+secure+pipelines." alt="Typing SVG" /></a>

  <p>A personal portfolio website built with <strong>React</strong> and <strong>Vite</strong>. Showcases projects, threat modeling, and technical skills as a security-aware backend engineer.</p>
</div>

<br/>

## 🚀 Key Features <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" align="center" />

- **Imperative 3D Pipelines:** A highly performant, custom-built `Three.js` WebGL pipeline background that dynamically recalculates and tracks scroll progress with exact screen constraint mapping.
- **Custom Native Web Animations Slider:** A fully custom project gallery built using the native Promise-based Web Animations API (`wa()`) for highly synchronized text scrambling and image clip-path reveals without heavy slider libraries.
- **Interactive Threat Modeling:** A visually engaging layout to explore application attack surfaces, mitigation strategies, and security pipelines via pulsing interactive markers.
- **Terminal-Style Typewriter Hero:** A specialized typewriter component that types forward, pauses to let you read, and erases backwards before looping through technical phrases.
- **Custom UI Glitches & Reveals:** Incorporates Framer Motion and custom CSS (like `GradualSpacing` and `SplitTextReveal`) to cascade, blur, and decrypt text elements smoothly on scroll.
- **Fully Functional Contact Form:** Integrated with Web3Forms API to deliver messages directly to email — no backend required.
- **Heavy Mobile Optimisation:** Strict mobile layout breakpoints. The 3D geometry actually decreases its thickness and bounding box dynamically to never overlap text on phones.

## 🛡️ DevSecOps Pipeline (Shift Left) <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked.png" alt="Locked" width="25" align="center" />

- **Snyk (SCA):** Scans the `package.json` to ensure zero third-party dependencies carry known vulnerabilities (CVEs).
- **Gitleaks (Secret Scanning):** An automated workflow to ensure no private API keys or database strings ever get committed.

## 🛠️ Tech Stack <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Wrench.png" alt="Wrench" width="25" align="center" />

- **Framework:** React 18 + Vite
- **Styling:** Vanilla CSS (Custom properties, Grid, Flexbox, UI tokens)
- **Complex UI Animations:** Framer Motion & Native Web Animations API
- **3D Rendering:** Imperative WebGL via `Three.js`
- **Forms API:** Web3Forms

---

## 📂 Site Structure Tree <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/File%20Folder.png" alt="Folder" width="25" align="center" />

```text
My-profile-site/
├── .github/workflows/               ← Security pipelines (Gitleaks/Snyk)
├── index.html                       ← Document entry, fonts, semantic SEO meta tags
├── vite.config.js                   ← Rollup settings, obfuscation & Terser minification
├── package.json                     ← Highly stripped dependencies (No bloat)
├── public/                          ← Static WebP and SVG assets
└── src/
    ├── main.jsx                     ← React DOM mounting
    ├── App.jsx                      ← Component composition
    ├── styles/                      ← Global typography and color variables
    └── components/
        ├── Hero.jsx                 ← Terminal-typing intro logic
        ├── BackgroundPipeFlow.jsx   ← The core imperative Three.js background class
        ├── Navbar.jsx               ← Sticky glassmorphism header
        ├── About.jsx                ← Floating UI / Tilt philosophy cards
        ├── Skills.jsx               ← Card layout
        ├── Projects.jsx             ← Custom Promise-based Web Animations slider
        ├── ThreatModel.jsx          ← Attack surface visualizer
        ├── Contact.jsx              ← Web3Forms payload handler
        ├── Footer.jsx               ← Final stamp & socials
        └── ui/                      ← Reusable micro-animation wrappers
            ├── GradualSpacing.jsx 
            ├── SplitTextReveal.jsx
            ├── Spotlight.jsx
            ├── TextGenerateEffect.jsx
            └── Tilt.jsx
```

## 💻 Running Locally <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" alt="Laptop" width="25" align="center" />

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
