import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import './Header.css'

const NAV_LINKS = [
  { href: '#about', label: 'Quién soy', num: 1 },
  { href: '#process', label: 'Proceso', num: 2 },
  { href: '#portfolio', label: 'Portafolio', num: 3 },
  { href: '#contact', label: 'Contacto', num: 4 },
]

/**
 * Header fijo del prototipo: aparece al pasar el 50% del primer alto de
 * pantalla y resalta la sección activa del menú.
 */
export default function Header() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * 0.5)

    // Misma lógica del prototipo: la última sección cuyo tope quedó arriba
    let current = ''
    document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => {
      if (y >= section.offsetTop - 200) current = section.id
    })
    setActiveSection(current)
  })

  return (
    <header className={visible ? 'visible' : ''}>
      <a href="#" className="header-logo">
        <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="luisvfx.ai Logo" />
      </a>
      <nav className="nav-links">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href.slice(1) ? 'active' : ''}
          >
            <span className="nav-num">{link.num}</span>
            <span className="nav-label">{link.label}</span>
          </a>
        ))}
      </nav>
      <a
        className="header-wa-btn"
        href="https://wa.me/573123867687?text=Hola%2C%20quiero%20info"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hablemos
      </a>
    </header>
  )
}
