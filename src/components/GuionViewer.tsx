import { useState } from 'react'
import type { Guion } from '../types/guiones'
import './GuionesPanel.css'
import './GuionViewer.css'

interface Props {
  guion: Guion
  onBack: () => void
}

export default function GuionViewer({ guion, onBack }: Props) {
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  // Pasos: 0 intro (título/duración/formato), 1..n escenas, n+1 cierre/CTA + acciones
  const total = guion.escenas.length + 2
  const isLast = step === total - 1
  const isFirst = step === 0

  const WA = 'https://wa.me/573123867687'
  const handleApprove = () => {
    const text = `Apruebo el Guion: ${guion.title}`
    setMessage('✅ Abriendo WhatsApp para aprobar el guion...')
    window.open(`${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }
  const handleAdjust = () => {
    const text = `Pedir ajuste: ${guion.title}`
    setMessage('✏️ Abriendo WhatsApp para solicitar el ajuste...')
    window.open(`${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="guion-page">
      <div className="guion-progress" aria-hidden="true">
        <div
          className="guion-progress-bar"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>
      <p className="guion-step-counter guion-step-counter--corner">
        Paso {step + 1} de {total}
      </p>
      <p className="guion-kicker guion-kicker--title">Guion de ejemplo</p>
      <hr className="guion-divider" />
      <main className="guion-main">
        <section className="guion-panel" aria-labelledby="guion-viewer-title">
          <div className="guion-step">
            {step === 0 && (
              <>
                <h1 id="guion-viewer-title" className="guion-title guion-title--static">
                  <span className="guion-idea-inline">Título:</span> {guion.title}
                </h1>
                <div className="guion-meta">
                  <p><span className="guion-label">Duración:</span> {guion.duracion}</p>
                  <p><span className="guion-label">Formato:</span> {guion.formato}</p>
                </div>
              </>
            )}

            {step >= 1 && step <= guion.escenas.length && (
              <>
                <h2 className="guion-step-heading">
                  {guion.escenas[step - 1].label || `Escena ${step}`}
                </h2>
                <div className="guion-scene">
                  <p className="guion-scene-line">
                    <strong>Locución:</strong> {guion.escenas[step - 1].locucion}
                  </p>
                  <p className="guion-scene-line">
                    <strong>Visual:</strong> {guion.escenas[step - 1].visual}
                  </p>
                </div>
              </>
            )}

            {step === guion.escenas.length + 1 && (
              <>
                <h2 className="guion-step-heading">Cierre / CTA</h2>
                <p className="guion-text">{guion.cierre}</p>
                <div className="guion-actions">
                  <button type="button" className="guion-action guion-action--approve" onClick={handleApprove}>
                    Aprobar guion
                  </button>
                  <button type="button" className="guion-action guion-action--adjust" onClick={handleAdjust}>
                    Pedir ajuste
                  </button>
                </div>
                {message && <p className="guion-confirm">{message}</p>}
              </>
            )}
          </div>

          <div className="guion-nav">
            <button
              type="button"
              className="guion-nav-btn"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={isFirst}
            >
              Anterior
            </button>
            <button
              type="button"
              className="guion-nav-btn"
              onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
              disabled={isLast}
            >
              Siguiente
            </button>
          </div>
          <div className="guion-back-wrap">
            <button type="button" className="guion-back-btn" onClick={onBack}>
              ← Volver al panel
            </button>
          </div>
        </section>
      </main>

      <footer className="guion-footer">
        <p>&copy; 2026 luisvfx.ai. Todos los derechos reservados.</p>
        <a href={import.meta.env.BASE_URL} className="guion-back">Volver al inicio</a>
      </footer>
    </div>
  )
}
