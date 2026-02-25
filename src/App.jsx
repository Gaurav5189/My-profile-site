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
