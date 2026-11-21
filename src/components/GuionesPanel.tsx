import './GuionesPanel.css'

const BASE = import.meta.env.BASE_URL

export interface GuionItem {
  id: string
  title: string
}

interface Props {
  clientName?: string
  logoSrc?: string
  guiones?: GuionItem[]
  onSelectGuion?: (id: string) => void
}

/**
 * Panel privado de guiones para un cliente. No se enlaza desde el sitio público
 * y sus páginas llevan meta noindex. Solo se accede por URL directa.
 *
 * Los guiones se listan en una grilla responsiva (auto-fit) para escalar a
 * muchos elementos sin romper el layout: cada guion es una tarjeta/botón.
 */
export default function GuionesPanel({ clientName, logoSrc, guiones, onSelectGuion }: Props) {
  const title = clientName
    ? `Bienvenido a tu panel de guiones, ${clientName}.`
    : 'Bienvenido a tu panel de guiones.'

  const logo = logoSrc ?? `${BASE}logo.jpg`

  return (
    <div className="guion-page">
      <main className="guion-main">
        <section className="guion-panel" aria-labelledby="guion-title">
          <img src={logo} alt={clientName ?? 'luisvfx.ai'} className="guion-logo" />
          <p className="guion-kicker">Panel de guiones</p>
          <h1 id="guion-title" className="guion-title">{title}</h1>

          {guiones && guiones.length > 0 && (
            <div className="guion-list" role="list">
              {guiones.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className="guion-btn"
                  role="listitem"
                  onClick={() => onSelectGuion?.(g.id)}
                >
                  {g.title}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="guion-footer">
        <p>&copy; 2026 luisvfx.ai. Todos los derechos reservados.</p>
        <a href={BASE} className="guion-back">Volver al inicio</a>
      </footer>
    </div>
  )
}
