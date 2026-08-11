import { Link } from "react-router-dom";
import toolsData from "../tools/toolsData";
import SEO from "../components/SEO";

function Home() {
  return (
    <>
      <SEO
        title="AUQAB - Free Tools, Games & Backgrounds"
        description="85+ free online tools, fun games, and beautiful backgrounds."
      />

      {/* ========== Hero (الترحيب) ========== */}
      <section className="hero">
        <div className="hero-content">
          <h1>AUQAB Tools</h1>
          <p>أدوات رقمية، ألعاب، وخلفيات – مجاناً وسريعة.</p>
          <p className="hero-subtitle">
            Free online tools, games, and backgrounds. No sign‑up needed.
          </p>
        </div>
      </section>

      {/* ========== البطاقات الثلاثة ========== */}
      <section className="big-cards-section">
        <div className="big-card">
          <span className="big-card-icon">🛠️</span>
          <h2>Tools</h2>
          <p>85+ professional utilities for all your digital tasks.</p>
          <Link to="/tools" className="big-card-open-btn">Open</Link>
        </div>

        <div className="big-card">
          <span className="big-card-icon">🎮</span>
          <h2>Games</h2>
          <p>Fun mini‑games to relax or challenge your brain.</p>
          <Link to="/games" className="big-card-open-btn">Open</Link>
        </div>

        <div className="big-card">
          <span className="big-card-icon">🎨</span>
          <h2>Backgrounds</h2>
          <p>Beautiful backgrounds & gradients for your projects.</p>
          <Link to="/backgrounds" className="big-card-open-btn">Open</Link>
        </div>
      </section>

      {/* ========== Why Choose ========== */}
      <section className="features-section">
        <h2 className="section-title">Why Choose AUQAB?</h2>
        <div className="features">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Fast & Lightweight</h3>
            <p>All tools run instantly in your browser.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Privacy First</h3>
            <p>Your data stays on your device, never uploaded.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Works Everywhere</h3>
            <p>Perfectly responsive on desktop, tablet, and mobile.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🆓</span>
            <h3>Completely Free</h3>
            <p>No registration, no hidden costs.</p>
          </div>
        </div>
      </section>

      {/* ========== Stats ========== */}
      <section className="stats-banner">
        <div className="stat">
          <strong>{toolsData.length}+</strong>
          <span>Free Tools</span>
        </div>
        <div className="stat">
          <strong>🎮</strong>
          <span>Games</span>
        </div>
        <div className="stat">
          <strong>🎨</strong>
          <span>Backgrounds</span>
        </div>
      </section>

      {/* ========== Call to Action ========== */}
      <section className="cta-section">
        <h2>Need a Custom Tool?</h2>
        <p>We build custom web utilities for businesses and individuals.</p>
        <Link to="/request-service" className="generate">
          ✨ Request Custom Service
        </Link>
      </section>
    </>
  );
}

export default Home;
