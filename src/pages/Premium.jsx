import SEO from "../components/SEO";
import { Link } from "react-router-dom";

function Premium() {
  return (
    <>
      <SEO
        title="AUQAB Premium - Unlock Advanced Tools"
        description="Get unlimited usage, advanced tools, API access and priority updates with AUQAB Premium."
      />

      <section className="tool-page">
        <div className="password-card pricing-card-page">
          <h1>⭐ AUQAB Premium</h1>
          <p className="tool-description">
            Unlock advanced tools and features. Power up your workflow with priority access and more.
          </p>

          <div className="pricing-grid premium-grid">
            <div className="pricing-card">
              <h2>🆓 Free</h2>
              <p className="plan-subtitle">For everyone</p>
              <ul>
                <li>✓ Basic tools access</li>
                <li>✓ Browser‑based tools</li>
                <li>✓ No registration</li>
              </ul>
            </div>

            <div className="pricing-card featured premium-featured">
              <h2>⭐ Premium</h2>
              <p className="plan-subtitle">For power users</p>
              <ul>
                <li>✓ Unlimited usage</li>
                <li>✓ Advanced tools</li>
                <li>✓ API access</li>
                <li>✓ Priority updates</li>
              </ul>
              <button className="generate" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                Coming Soon
              </button>
            </div>
          </div>

          <p className="premium-note">
            Interested in premium features? <Link to="/contact">Contact us</Link> for early access.
          </p>
        </div>
      </section>
    </>
  );
}

export default Premium;
