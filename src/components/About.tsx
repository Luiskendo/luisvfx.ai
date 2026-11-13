import './About.css'

/**
 * Sección "¿Quién soy?" con la estrella IA (SVG y animaciones del prototipo).
 */
export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        <div className="about-content">
          <h2 className="about-title">No necesitas salir en cámara ni saber de <span>edición</span>.</h2>
          <p className="about-text">
            Soy <span className="highlight">Luis</span>, creador de luisvfx.ai. Uso Inteligencia Artificial para que el contenido de tu academia se vea como una producción de cine, sin que tengas que grabar un solo video ni gastar en equipos costosos.
          </p>
          <div className="tech-badge">Motor de render: Remotion + IA</div>
        </div>

        <div className="visual-star">
          <div className="star-aura"></div>
          <svg className="star-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E8B14C" />
                <stop offset="100%" stopColor="#E8B14C" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="tipGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(232, 177, 76, 0.8)" />
                <stop offset="100%" stopColor="rgba(232, 177, 76, 0)" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="60" fill="url(#tipGlow)" />
            <path d="M 100 20 Q 100 90 180 100 Q 100 110 100 180 Q 100 110 20 100 Q 100 90 100 20 Z" fill="url(#starGrad)" filter="drop-shadow(0px 0px 10px rgba(232,177,76,0.6))"/>
            <circle cx="140" cy="60" r="3" fill="#FFF" className="sparkle" />
            <circle cx="160" cy="80" r="2" fill="#E8B14C" className="sparkle" />
            <circle cx="150" cy="130" r="2.5" fill="#FFF" className="sparkle" />
            <circle cx="60" cy="140" r="1.5" fill="#E8B14C" className="sparkle" />
            <circle cx="70" cy="50" r="2" fill="#FFF" className="sparkle" />
          </svg>
        </div>
      </div>
    </section>
  )
}
