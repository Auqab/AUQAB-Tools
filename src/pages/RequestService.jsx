import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function RequestService() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xeajqnkq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("✅ Request sent successfully! We'll get back to you soon.");
        form.reset();
        trackEvent("request_service_submit", { page: "request_service" });
      } else {
        setStatus("❌ Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setStatus("❌ Network error. Please check your connection.");
    }
  }

  return (
    <>
      <SEO
        title="Request a Custom Service - AUQAB Tools"
        description="Need a custom script, web tool or automation solution? Tell us your project and we'll build it for you."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>📩 Request a Custom Service</h1>
          <p className="tool-description">
            Tell us what you need — a script, a web tool, or an automation solution —
            and we'll get back to you with a plan.
          </p>

          <form className="request-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your Name" required />
            <input name="email" type="email" placeholder="Your Email" required />
            <select name="service" required>
              <option value="">Select Service</option>
              <option>Windows Scripts</option>
              <option>Linux Automation</option>
              <option>Custom Web Tools</option>
              <option>API Development</option>
              <option>Other</option>
            </select>
            <textarea name="message" placeholder="Describe your project..." required></textarea>
            <button type="submit" className="generate">
              ✉️ Send Request
            </button>
          </form>

          {status && <div className="success-message">{status}</div>}
        </div>
      </section>
    </>
  );
}

export default RequestService;
