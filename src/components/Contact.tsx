import './Contact.css'

/**
 * Sección de contacto con el botón verde de WhatsApp.
 */
export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">
        <h2 className="contact-title">¿Alguna pregunta?</h2>
        <p className="contact-text">Agenda tu espacio. Revisamos tus ideas y armamos el plan ideal para tu academia.</p>
        <a
          className="wa-btn-bottom"
          href="https://wa.me/573123867687?text=Hola%2C%20quiero%20reservar%20mi%20espacio%20en%20luisvfx.ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reservar mi espacio
          <img className="wa-btn-icon" src={`${import.meta.env.BASE_URL}whatsapp.png`} alt="" />
        </a>
      </div>
    </section>
  )
}
