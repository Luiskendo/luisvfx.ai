import { useEffect, useState } from 'react'
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import './Hero.css'

/**
 * Hero con animación ligada al scroll (replica el prototipo):
 * - El título se achica (15vw → 8vw) y sube (25vh) mientras se scrollea.
 * - El subtítulo amarillo se desvanece al scrollear.
 * - Sin texto secundario: el título es lo único que se muestra aquí.
 *
 * El CSS es exactamente el del prototipo: las reglas calculan sobre la
 * variable --progress. Framer Motion calcula esa variable con `useScroll`
 * + un resorte (`useSpring`) que le da más fluidez que el rAF manual,
 * y la escribe en :root para que el CSS siga mandando.
 */
export default function Hero() {
  const { scrollY } = useScroll()
  const [viewportH, setViewportH] = useState(() => window.innerHeight)

  // El progreso mide 0→1 en el primer alto de pantalla (igual que el prototipo)
  useEffect(() => {
    const onResize = () => setViewportH(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const progress = useTransform(scrollY, [0, viewportH], [0, 1])
  const smoothProgress = useSpring(progress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.0005,
  })

  useMotionValueEvent(smoothProgress, 'change', (value) => {
    document.documentElement.style.setProperty('--progress', value.toFixed(4))
  })

  // Sincroniza el valor inicial (p. ej. si se recarga a mitad de página)
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--progress',
      smoothProgress.get().toFixed(4),
    )
  }, [smoothProgress, viewportH])

  return (
    <div className="hero-section">
      <div className="sticky-container">
        <div className="title-group">
          <h1 className="title">luisvfx.ai</h1>
          <p className="hero-subtitle">Videos con IA para potenciar tu academia.</p>
        </div>
        <div className="scroll-indicator">
          <span>Desliza hacia abajo</span>
          <div className="arrow"></div>
        </div>
      </div>
    </div>
  )
}
