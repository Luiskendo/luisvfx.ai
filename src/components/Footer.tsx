import './Footer.css'

/**
 * Footer del prototipo: redes sociales + copyright.
 */
export default function Footer() {
  return (
    <footer>
      <div className="footer-socials">
        <a href="https://www.instagram.com/luisvfx.ai/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.tiktok.com/@luisvfx.ai" target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">&copy; 2026 luisvfx.ai. Todos los derechos reservados.</p>
        <a href={`${import.meta.env.BASE_URL}privacidad.html`} className="footer-legal">Aviso de privacidad</a>
      </div>
    </footer>
  )
}
