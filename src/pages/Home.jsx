import { Link } from "react-router-dom";
import toolsData from "../tools/toolsData";
import SEO from "../components/SEO";

function Home() {
  return (
    <>
      <SEO
        title="AUQAB – Free Tools, Games & Backgrounds"
        description="85+ free online tools, fun games, and beautiful backgrounds. No registration needed."
      />

      <section className="hero-new">
        <div className="hero-content-new">
          <h1 className="hero-title">
            AUQAB<span className="hero-dot">.</span>
          </h1>
          <p className="hero-desc">
            Free online tools, games, and backgrounds.
            <br />
            Simple, fast, and private. No sign-up needed.
          </p>

          <div className="hero-actions-new">
            <Link to="/tools" className="btn-circle">
              <span className="circle-icon">Tools</span>
            </Link>
            <Link to="/games" className="btn-circle">
              <span className="circle-icon">Games</span>
            </Link>
            <Link to="/backgrounds" className="btn-circle">
              <span className="circle-icon">Art</span>
            </Link>
          </div>
        </div>

        <div className="hero-decor">
          <div className="decor-circle" />
          <div className="decor-circle small" />
        </div>
      </section>

      <section className="big-cards-section">
        <div className="big-card">
          <h2>Utilities</h2>
          <p>85+ professional utilities for all your digital tasks.</p>
          <Link to="/tools" className="big-card-open-btn">Open</Link>
        </div>

        <div className="big-card">
          <h2>Play</h2>
          <p>Fun mini-games to relax or challenge your brain.</p>
          <Link to="/games" className="big-card-open-btn">Open</Link>
        </div>

        <div className="big-card">
          <h2>Backgrounds</h2>
          <p>Beautiful backgrounds and gradients for your projects.</p>
          <Link to="/backgrounds" className="big-card-open-btn">Open</Link>
        </div>
      </section>

      <section className="features-section-new">
        <h2 className="section-title">Why choose AUQAB?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-circle">Fast</span>
            <h3>Lightweight</h3>
            <p>All tools run instantly in your browser.</p>
          </div>
          <div className="feature-item">
            <span className="feature-circle">Safe</span>
            <h3>Privacy First</h3>
            <p>Your data stays on your device, never uploaded.</p>
          </div>
          <div className="feature-item">
            <span className="feature-circle">Anywhere</span>
            <h3>Works Everywhere</h3>
            <p>Perfectly responsive on any device.</p>
          </div>
          <div className="feature-item">
            <span className="feature-circle">Free</span>
            <h3>Completely Free</h3>
            <p>No registration, no hidden costs.</p>
          </div>
        </div>
      </section>

      <section className="stats-banner">
        <div className="stat">
          <strong>{toolsData.length}+</strong>
          <span>Free Tools</span>
        </div>
        <div className="stat">
          <strong>Games</strong>
          <span>Relax & Play</span>
        </div>
        <div className="stat">
          <strong>Backgrounds</strong>
          <span>Design Assets</span>
        </div>
      </section>

      <section className="cta-section">
        <h2>Need a custom tool?</h2>
        <p>We build web utilities and automations for your business.</p>
        <Link to="/request-service" className="btn-primary">Request Custom Service</Link>
      </section>
    </>
  );
}

export default Home;
