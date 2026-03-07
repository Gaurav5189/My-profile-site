import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundPipeFlow from './components/BackgroundPipeFlow'
import Preloader from './components/ui/Preloader'

function App() {
    const [splineReady, setSplineReady] = useState(false)
    const [minTimePassed, setMinTimePassed] = useState(false)

    useEffect(() => {
        // Stop browser from automatically restoring the previous scroll position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }
        // Immediately force to the absolute top of the page on refresh
        window.scrollTo(0, 0)

        // Enforce the mandatory 1-second minimum preload time
        const minTimer = setTimeout(() => {
            setMinTimePassed(true)
        }, 1000)

        // Fallback: force preloader to hide after 10s even if Spline never loads
        const maxTimer = setTimeout(() => {
            setSplineReady(true)
        }, 10000)

        return () => {
            clearTimeout(minTimer)
            clearTimeout(maxTimer)
        }
    }, [])

    const isAppLoading = !(splineReady && minTimePassed)

    return (
        <div className="app">
            <Preloader isLoading={isAppLoading} />
            <BackgroundPipeFlow />

            <div className="foreground-layer">
                <Navbar />
                <main>
                    <Hero onSplineReady={() => setSplineReady(true)} />
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
