# Gaurav - DevSecOps Engineer & Security Architect Portfolio

This is a premium, high-performance personal portfolio website built with React and Vite. It serves as a showcase for my projects, engineering philosophy, and technical skills as a security-aware backend engineer.

## 🚀 Key Features
- **Spline 3D Integration:** Seamless, lightweight loading of a 3D power icon scene using the official web component.
- **Responsive "Glassmorphic" Design:** Modern dark theme utilizing precise CSS custom properties for sleek, frosted glass UI components throughout.
- **Dynamic Animations:** Scroll-triggered element reveals and buttery-smooth layouts using `framer-motion`.
- **Fully Functional Contact Form:** Integrated with Web3Forms to capture messages directly to email without a backend database.
- **Performance Optimized:** Clean component architecture, local asset serving, and strict separation of concerns for CSS logic.

## 🛠 Tech Stack
- **Framework:** React + Vite
- **Styling:** Vanilla CSS (CSS Modules / Variables), modern Grid & Flexbox
- **Animations:** Framer Motion
- **3D Rendering:** Spline (for background)
- **Forms API:** Web3Forms
- **Icons:** React Icons

---

## 📂 Site Structure Tree

```text
My-profile-site/
├── index.html                  ← Entry point, loads fonts & Spline library
├── vite.config.js              ← Vite bundler configuration
├── package.json                ← Dependencies & scripts
├── requirements.txt            ← Plain text list of all project dependencies
├── public/                     ← Static assets (served directly at root /)
│   ├── favicon.svg
│   ├── gaurav.webp             
│   ├── pycloud-img.webp
│   ├── ravenshaw-site.webp
│   └── scene-clean.splinecode  ← Local 3D Spline scene file
└── src/
    ├── main.jsx                ← React bootstrap file
    ├── App.jsx                 ← Main layout composer
    ├── styles/
    │   └── global.css          ← Core design tokens, CSS variables, utility classes
    └── components/
        ├── Hero.jsx / .css              ← Responsive two-column 3D & text hero
        ├── Navbar.jsx / .css            ← Sticky nav with glassmorphism & mobile menu
        ├── About.jsx / .css             ← Bio, philosophy, and profile photo
        ├── Skills.jsx / .css            ← Service grid and technology layout
        ├── Projects.jsx / .css          ← Showcase of selected work with images
        ├── ThreeDViewer.jsx             ← React Three Fiber component
        ├── Testimonials.jsx / .css      ← "Engineering Philosophy" quote block
        ├── Contact.jsx / .css           ← Web3Forms integrated functional contact form
        └── Footer.jsx / .css            ← Site navigation links & social footprint
```

## 💻 Running Locally

1. Install dependencies (Node packages are listed in `package.json` and mirrored in `requirements.txt`):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
