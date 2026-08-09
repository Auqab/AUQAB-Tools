import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

function Services() {
  return (
    <>
      <SEO
        title="Our Services - AUQAB Tools"
        description="Custom digital solutions, automation scripts, web tools and API development by AUQAB Tools."
      />

      <section className="tool-page">
        <div className="password-card services-card">
          <h1>🛠️ Our Services</h1>
          <p className="tool-description">
            Custom digital solutions, automation and development services
            tailored to your needs.
          </p>

          <div className="services-grid">
            <div className="service-card">
              <h2>🪟 Windows Scripts</h2>
              <p>Custom PowerShell and Batch scripts to automate computer tasks.</p>
              <strong>Starting from $10</strong>
            </div>

            <div className="service-card">
              <h2>🐧 Linux Automation</h2>
              <p>Server scripts and automation solutions for Linux systems.</p>
              <strong>Starting from $15</strong>
            </div>

            <div className="service-card">
              <h2>🌐 Custom Web Tools</h2>
              <p>Create lightweight online tools for your project or business.</p>
              <strong>Starting from $30</strong>
            </div>

            <div className="service-card">
              <h2>🔌 API Development</h2>
              <p>Connect your applications with AUQAB tool services.</p>
              <strong>Custom Pricing</strong>
            </div>
          </div>

          <div className="process">
            <h2>⚙️ How it works</h2>
            <p>1. Tell us your requirements.</p>
            <p>2. We design and develop the solution.</p>
            <p>3. You receive the final product.</p>
          </div>

          <div className="why-auqab">
            <h2>Why choose AUQAB?</h2>
            <ul>
              <li>Custom solutions instead of unnecessary complex software.</li>
              <li>Modern web technologies and automation tools.</li>
              <li>Direct communication and personalized support.</li>
            </ul>
          </div>

          <Link
            to="/request-service"
            className="generate"
            onClick={() => trackEvent("request_service_click", { page: "services" })}
          >
            ✨ Request a Custom Service
          </Link>
        </div>
      </section>
    </>
  );
}

export default Services;
