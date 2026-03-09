import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundPipeFlow from './components/BackgroundPipeFlow'

function App() {
    useEffect(() => {
        // Stop browser from automatically restoring the previous scroll position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }
        // Immediately force to the absolute top of the page on refresh
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="app">
            <BackgroundPipeFlow />

            <div className="foreground-layer">
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Testimonials />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default App
