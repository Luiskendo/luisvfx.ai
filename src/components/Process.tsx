import './Process.css'

const STEPS = [
  {
    number: '01',
    title: 'Me cuentas tu idea',
    text: 'No necesitas guion ni experiencia previa frente a la cámara. Solo dime de qué trata tu curso y a quién va dirigido.',
  },
  {
    number: '02',
    title: 'La IA hace la magia',
    text: 'Yo diseño las animaciones, los guiones y las locuciones con Inteligencia Artificial. Tú solo revisas y apruebas.',
  },
  {
    number: '03',
    title: 'Publicas y vendes',
    text: 'Recibes el video en alta calidad, listo para subir a tus redes o usar en tus anuncios. Sin estrés y en tiempo récord.',
  },
]

/**
 * Sección "El proceso" con los 3 pasos del prototipo.
 */
export default function Process() {
  return (
    <section id="process" className="process-section">
      <div className="process-header">
        <h2 className="process-title">Así de fácil es trabajar conmigo</h2>
        <p className="process-desc">Tú te enfocas en enseñar. Yo me encargo de la producción.</p>
      </div>
      <div className="process-steps">
        {STEPS.map((step) => (
          <div className="step" key={step.number}>
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
