import SEO from "../components/SEO";

function Contact() {
  return (
    <>
      <SEO
        title="Contact AUQAB Tools - Feedback & Support"
        description="Get in touch with AUQAB Tools for suggestions, feedback or support. We'd love to hear from you."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>📬 Contact Us</h1>
          <p className="tool-description">
            Have a suggestion, found a bug, or need a custom tool?
            We'd love to hear from you. Reach out and we'll respond as soon as possible.
          </p>

          <div className="contact-info">
            <div className="contact-method">
              <span className="contact-icon">📧</span>
              <div>
                <h3>Email</h3>
                <a href="mailto:zeusata34@gmail.com">zeusata34@gmail.com</a>
              </div>
            </div>

            <div className="contact-method">
              <span className="contact-icon">💬</span>
              <div>
                <h3>Response Time</h3>
                <p>We typically reply within 24–48 hours.</p>
              </div>
            </div>
          </div>

          <p className="contact-note">
            For custom tool requests, please use the{' '}
            <a href="/request-service">Request Service</a> page for a faster response.
          </p>
        </div>
      </section>
    </>
  );
}

export default Contact;
