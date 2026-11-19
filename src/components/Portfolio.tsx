import { useEffect, useState } from 'react'
import './Portfolio.css'

const CLIENT = {
  name: 'Bombillo Prieto',
  sector: 'Idiomas · Clases online',
  desc: 'Bombillo Prieto es una academia dominicana en línea que enseña español latinoamericano e inglés práctico con conversaciones y cultura cotidiana.',
  logo: `${import.meta.env.BASE_URL}bombillo_prieto.jpeg`,
  videoUrl: 'https://vimeo.com/1248182435',
  embedUrl: 'https://player.vimeo.com/video/1248182435',
}

export default function Portfolio() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-header">
        <h2 className="portfolio-title">Tu marca podría estar aquí</h2>
        <p className="portfolio-desc">Estoy abriendo cupos para las primeras academias que quieran dar el salto de calidad.</p>
        <p className="portfolio-tags">Formato HD · Locución IA · Animación 2D</p>
      </div>
      <div className="cards-grid">
        <button
          type="button"
          className="card card--client"
          onClick={() => setOpen(true)}
          aria-label={`Ver caso de ${CLIENT.name}`}
        >
          <div className="card-placeholder client-placeholder">
            <span className="card-badge">Cliente</span>
            <div className="client-placeholder-main">
              <div className="client-thumb client-thumb--img">
                <img src={CLIENT.logo} alt={CLIENT.name} />
              </div>
              <span className="placeholder-text">{CLIENT.name}</span>
              <span className="client-sector">{CLIENT.sector}</span>
            </div>
            <span className="client-cta-hint">Click aquí</span>
          </div>
        </button>
        {[0, 1, 2].map((i) => (
          <div className="card" key={i}>
            <div className="card-placeholder">
              <span className="card-badge">Espacio libre</span>
              <div className="placeholder-icon">+</div>
              <span className="placeholder-text">Tu academia aquí</span>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="client-modal-overlay" onClick={() => setOpen(false)}>
          <div className="client-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button type="button" className="client-modal-close" onClick={() => setOpen(false)} aria-label="Cerrar">
              ×
            </button>
            <div className="client-modal-body">
              <div className="client-modal-video client-modal-video--vertical">
                <iframe
                  src={CLIENT.embedUrl}
                  title={CLIENT.name}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="client-modal-content">
                <div className="client-modal-header">
                  <div className="client-modal-thumb client-modal-thumb--img">
                    <img src={CLIENT.logo} alt={CLIENT.name} />
                  </div>
                  <div>
                    <h3 className="client-modal-name">{CLIENT.name}</h3>
                    <p className="client-modal-sector">{CLIENT.sector}</p>
                  </div>
                </div>
                <p className="client-modal-desc">{CLIENT.desc}</p>
                <div className="client-modal-actions">
                  <a
                    className="client-modal-link"
                    href="https://www.bombilloprieto.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌐 Visitar sitio web
                  </a>
                  <a
                    className="client-modal-link"
                    href="https://www.facebook.com/share/1EMr6Xfoap/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="client-modal-link-icon" src={`${import.meta.env.BASE_URL}facebook.webp`} alt="" />
                    Facebook
                  </a>
                  <a
                    className="client-modal-link"
                    href="https://www.instagram.com/bombillo.prieto?gwpx=MWhheWpvb2M3b3Zxaw=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="client-modal-link-icon" src={`${import.meta.env.BASE_URL}instagram.png`} alt="" />
                    Instagram
                  </a>
                </div>
                <a
                  className="client-modal-cta client-modal-cta--full"
                  href={`https://wa.me/573123867687?text=Hola%2C%20quiero%20un%20video%20como%20el%20de%20${encodeURIComponent(CLIENT.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero algo así
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}