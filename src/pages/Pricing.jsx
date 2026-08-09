import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

function Pricing() {
  return (
    <>
      <SEO
        title="Pricing Plans - AUQAB Tools"
        description="Free online tools forever. Custom services starting from $10. Choose the plan that fits your needs."
      />

      <section className="tool-page">
        <div className="password-card pricing-card-page">
          <h1>💎 Pricing Plans</h1>
          <p className="tool-description">
            Choose the solution that fits your needs. All online tools remain free forever.
          </p>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h2>🆓 Free</h2>
              <h3>$0</h3>
              <ul>
                <li>✓ All online tools</li>
                <li>✓ No registration</li>
                <li>✓ Browser‑based processing</li>
                <li>✓ Mobile & desktop</li>
              </ul>
            </div>

            <div className="pricing-card featured">
              <h2>⭐ Pro</h2>
              <h3>Soon</h3>
              <ul>
                <li>✓ Advanced features</li>
                <li>✓ Higher limits</li>
                <li>✓ Priority tools</li>
                <li>✓ Early access</li>
              </ul>
            </div>

            <div className="pricing-card">
              <h2>🛠️ Custom</h2>
              <h3>From $10</h3>
              <ul>
                <li>✓ Custom scripts</li>
                <li>✓ Private tools</li>
                <li>✓ Business solutions</li>
                <li>✓ Direct support</li>
              </ul>
              <Link
                to="/request-service"
                className="generate"
                onClick={() => trackEvent("pricing_request_click", { plan: "custom" })}
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;
