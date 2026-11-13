import { useEffect, useRef } from 'react'
import './Cursor.css'

/**
 * Cursor personalizado del prototipo (solo PC): un punto amarillo que sigue
 * el mouse al instante y un círculo que lo persigue con suavidad. Sobre
 * enlaces/botones/tarjetas se expande y resalta.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = 0, mouseY = 0
    let outlineX = 0, outlineY = 0
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15
      outline.style.left = `${outlineX}px`
      outline.style.top = `${outlineY}px`
      rafId = requestAnimationFrame(animate)
    }

    // Delegación de eventos: equivale a escuchar en a, button y .card
    const isHoverable = (e: MouseEvent) =>
      (e.target as Element | null)?.closest?.('a, button, .card') != null

    const onOver = (e: MouseEvent) => {
      if (isHoverable(e)) document.body.classList.add('hovering')
    }
    const onOut = (e: MouseEvent) => {
      if (isHoverable(e)) document.body.classList.remove('hovering')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
      document.body.classList.remove('hovering')
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-outline" ref={outlineRef}></div>
    </>
  )
}
