import { useEffect } from 'react'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Scroll suave global con Lenis (raf automático, se destruye al desmontar)
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    return () => lenis.destroy()
  }, [])

  // El orden de las secciones replica el prototipo aprobado
  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Process />
        <Portfolio />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
