import './Portfolio.css'

/**
 * Sección "Portafolio" con las 4 tarjetas de espacio libre del prototipo.
 */
export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-header">
        <h2 className="portfolio-title">Tu marca podría estar aquí</h2>
        <p className="portfolio-desc">Estoy abriendo cupos para las primeras academias que quieran dar el salto de calidad.</p>
        <p className="portfolio-tags">Formato HD · Locución IA · Animación 2D</p>
      </div>
      <div className="cards-grid">
        {[0, 1, 2, 3].map((i) => (
          <div className="card" key={i}>
            <div className="card-placeholder">
              <span className="card-badge">Espacio libre</span>
              <div className="placeholder-icon">+</div>
              <span className="placeholder-text">Tu video aquí</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
