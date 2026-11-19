import './PrivacyPage.css'

const WHATSAPP_URL = 'https://wa.me/573123867687'

/**
 * Aviso de privacidad (página independiente del landing).
 * El sitio no recopila ningún dato; el texto lo declara de forma
 * honesta y cubre lo esperado: responsable, datos, terceros
 * (WhatsApp / redes / hosting), derechos y cambios.
 */
export default function PrivacyPage() {
  return (
    <div className="privacy">
      <header className="privacy-header">
        <a href={`${import.meta.env.BASE_URL}`} className="privacy-logo-link" aria-label="Volver al inicio">
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="luisvfx.ai Logo" />
        </a>
        <a href={`${import.meta.env.BASE_URL}`} className="privacy-back">&larr; Volver al inicio</a>
      </header>

      <main className="privacy-content">
        <p className="privacy-kicker">Aviso de Privacidad</p>
        <h1>Tu privacidad, en claro</h1>
        <p className="privacy-updated">Última actualización: noviembre de 2026</p>

        <section>
          <h2>1. Quién es el responsable</h2>
          <p>
            Este sitio (<strong>luisvfx.ai</strong>) es la página personal de Luis, editor de
            video con inteligencia artificial. Es operado por una persona natural y puedes
            contactarme por <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a> o
            por Instagram (<a href="https://www.instagram.com/luisvfx.ai/" target="_blank" rel="noopener noreferrer">@luisvfx.ai</a>).
          </p>
        </section>

        <section>
          <h2>2. Los datos que recopilamos: ninguno</h2>
          <p>
            Este sitio <strong>no recopila, almacena ni comparte ningún dato personal tuyo</strong>.
            En concreto:
          </p>
          <ul>
            <li>No usa cookies propias ni de terceros.</li>
            <li>No usa herramientas de analítica ni rastreo (sin Google Analytics ni similares).</li>
            <li>No hay formularios que guarden información: lo que escribes en WhatsApp se queda en WhatsApp.</li>
            <li>No creamos perfiles ni listas de contacto.</li>
          </ul>
        </section>

        <section>
          <h2>3. Botones de WhatsApp</h2>
          <p>
            Los botones "Hablemos" y "Reservar mi espacio" te llevan fuera de este sitio, a una
            conversación en <strong>WhatsApp</strong> (servicio de Meta Platforms). Ahí se aplican
            las <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">políticas de privacidad de WhatsApp</a>.
            Si me escribes, tu número y mensajes existen en esa plataforma, no en este sitio.
          </p>
        </section>

        <section>
          <h2>4. Enlaces externos, videos embebidos y alojamiento</h2>
          <p>
            Los enlaces a Instagram, Facebook y TikTok te llevan a plataformas de terceros con sus
            propias políticas de privacidad. El video que aparece en el portafolio se reproduce
            desde los servidores de <strong>Vimeo</strong> (incrustado mediante un iframe); Vimeo
            puede registrar datos técnicos de la reproducción conforme a{' '}
            <a href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer">su política de privacidad</a>.
            Eso ocurre en su infraestructura y está fuera del control de este sitio. Este sitio está
            alojado en <strong>GitHub Pages</strong>; GitHub puede registrar datos técnicos estándar
            de las visitas conforme a{' '}
            <a href="https://docs.github.com/es/site-policy/github-privacy-statement" target="_blank" rel="noopener noreferrer">su declaración de privacidad</a>.
          </p>
        </section>

        <section>
          <h2>5. Tus derechos</h2>
          <p>
            Conforme a la Ley 1581 de 2012 de Colombia tienes derechos de acceso, rectificación,
            cancelación y oposición (ARCO) sobre tus datos personales. Como aquí no existe ninguna
            base de datos propia, no hay datos que solicitar ni eliminar. Si en algún momento
            crees que tenemos información tuya, escríbeme por{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a> y la
            revisamos o eliminamos de inmediato.
          </p>
        </section>

        <section>
          <h2>6. Cambios en este aviso</h2>
          <p>
            Si algún día este sitio empieza a recopilar algún dato, este aviso se actualizará
            antes de que eso ocurra, y la fecha de arriba cambiará. Siempre podrás ver aquí,
            en lenguaje claro, qué se recopila y para qué.
          </p>
        </section>

        <p className="privacy-final">¿Dudas sobre este aviso? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Escríbeme por WhatsApp</a>.</p>
      </main>

      <footer className="privacy-footer">
        <p>&copy; 2026 luisvfx.ai. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
