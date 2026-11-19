import './Pricing.css'

const PACKAGES = [
  {
    name: 'Lite',
    price: '$50',
    perVideo: '$12.50',
    videos: 4,
    adjustments: 3,
    url: 'https://wa.me/573123867687?text=Hola%2C%20quiero%20el%20paquete%20Lite%20(4%20videos%20-%20%2450)',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$85',
    perVideo: '$10.63',
    videos: 8,
    adjustments: 5,
    url: 'https://wa.me/573123867687?text=Hola%2C%20quiero%20el%20paquete%20Pro%20(8%20videos%20-%20%2485)',
    popular: true,
  },
  {
    name: 'Max',
    price: '$150',
    perVideo: '$9.38',
    videos: 16,
    adjustments: 8,
    url: 'https://wa.me/573123867687?text=Hola%2C%20quiero%20el%20paquete%20Max%20(16%20videos%20-%20%24150)',
    popular: false,
  },
]

function CheckIcon() {
  return (
    <svg className="pricing-check" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 10.5L8 14.5L16 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Sección "Paquetes" con las 3 tarjetas de precios.
 */
export default function Pricing() {
  return (
    <section id="paquetes" className="pricing-section">
      <div className="pricing-header">
        <h2 className="pricing-title">Paquetes</h2>
        <p className="pricing-desc">Elige el plan que mejor se adapta a tu academia.</p>
      </div>
      <div className="pricing-grid">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className={`pricing-card${pkg.popular ? ' pricing-card--popular' : ''}`}
          >
            {pkg.popular && <span className="pricing-badge">MÁS POPULAR</span>}
            <div className="pricing-card-header">
              <h3 className="pricing-name">{pkg.name}</h3>
              <div className="pricing-secondary">
                <span className="pricing-secondary-amount">{pkg.perVideo}</span>
                <span className="pricing-secondary-unit"> / video</span>
              </div>
            </div>
            <div className="pricing-price-row">
              <span className="pricing-price">{pkg.price}</span>
              <span className="pricing-period"> /mes</span>
            </div>
            <p className="pricing-quantity">{pkg.videos} videos al mes</p>
            <ul className="pricing-features">
              <li>
                <CheckIcon />
                {pkg.videos} videos HD
              </li>
              <li>
                <CheckIcon />
                Hasta {pkg.adjustments} ajustes por video
              </li>
              <li>
                <CheckIcon />
                Guion
              </li>
              <li>
                <CheckIcon />
                Locución IA
              </li>
              <li>
                <CheckIcon />
                Animación 2D
              </li>
            </ul>
            <a
              className={`pricing-btn ${pkg.popular ? 'pricing-btn--filled' : 'pricing-btn--outline'}`}
              href={pkg.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Empezar
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}