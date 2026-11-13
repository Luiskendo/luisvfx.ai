import './TechStrip.css'

// Los logos viven en /public; BASE_URL respeta el base de GitHub Pages
const BASE = import.meta.env.BASE_URL

const LOGOS = [
  { src: `${BASE}remotion.png`, alt: 'Remotion', label: 'Remotion', className: '' },
  { src: `${BASE}deepseek.png`, alt: 'DeepSeek', label: 'DeepSeek', className: '' },
  {
    src: `${BASE}opencode-logo-dark.png`,
    alt: 'OpenCode',
    label: 'OpenCode',
    className: 'opencode-img',
  },
]

/**
 * Tira de tecnología con los logos reales (Remotion, DeepSeek, OpenCode).
 */
export default function TechStrip() {
  return (
    <div className="tech-strip">
      <span className="tech-strip-title">Tecnología impulsada por:</span>
      <div className="tech-logos">
        {LOGOS.map((logo) => (
          <div className="tech-logo-item" key={logo.label}>
            <img src={logo.src} alt={logo.alt} className={logo.className || undefined} />
            <span>{logo.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
