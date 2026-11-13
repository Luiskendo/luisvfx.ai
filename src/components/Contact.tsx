import './Contact.css'

/**
 * Sección de contacto con el botón verde de WhatsApp.
 */
export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">
        <h2 className="contact-title">¿Te interesa?</h2>
        <p className="contact-text">Reserva tu espacio. Estoy listo para escuchar tus ideas y armar el plan perfecto para tu academia.</p>
        <a
          className="wa-btn-bottom"
          href="https://wa.me/573123867687?text=Hola%2C%20quiero%20reservar%20mi%20espacio%20en%20luisvfx.ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reservar mi espacio
        </a>
      </div>
    </section>
  )
}
