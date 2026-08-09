import { Link } from "react-router-dom";
import toolsData from "../tools/toolsData";
import ToolCard from "../components/ToolCard";
import SEO from "../components/SEO";

function Home() {
  // عرض 6 أدوات مميزة بدلاً من 4 لإظهار تنوع أكبر
  const featuredTools = toolsData.slice(0, 6);

  return (
    <>
      <SEO
        title="AUQAB Tools - Free Online Tools for Everyone"
        description="Free online tools for images, text, security and developers. Use our tools directly in your browser, no registration required."
      />

      {/* ========== Hero Section ========== */}
      <section className="hero">
        <div className="hero-content">
          <h1>AUQAB Tools</h1>
          <p>أدوات رقمية مجانية وسريعة تساعدك في إنجاز مهامك اليومية بسهولة.</p>
          <p className="hero-subtitle">
            Free online tools for images, text, security and developers. All tools work directly in your browser — no sign‑up needed.
          </p>

          <div className="hero-actions">
            <Link to="/tools" className="generate">
              🚀 Explore All Tools
            </Link>
            <Link to="/services" className="service-btn">
              💼 Custom Services
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Why Choose Section ========== */}
      <section className="features-section">
        <h2 className="section-title">Why Choose AUQAB Tools?</h2>
        <div className="features">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Fast & Lightweight</h3>
            <p>All tools run instantly in your browser with no heavy downloads.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Privacy First</h3>
            <p>Your files and data are processed locally and never uploaded.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Works Everywhere</h3>
            <p>Use our tools on desktop, tablet or mobile — perfectly responsive.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🆓</span>
            <h3>Completely Free</h3>
            <p>No registration, no hidden costs. Just free useful utilities.</p>
          </div>
        </div>
      </section>

      {/* ========== Stats Banner ========== */}
      <section className="stats-banner">
        <div className="stat">
          <strong>{toolsData.length}+</strong>
          <span>Free Tools</span>
        </div>
        <div className="stat">
          <strong>100%</strong>
          <span>Browser-based</span>
        </div>
        <div className="stat">
          <strong>📱💻</strong>
          <span>All Devices</span>
        </div>
      </section>

      {/* ========== Popular Tools Section ========== */}
      <section className="featured-tools">
        <h2 className="section-title">🔥 Popular Tools</h2>
        <div className="cards">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
        <div className="center-btn">
          <Link to="/tools" className="open-tool">
            View All Tools →
          </Link>
        </div>
      </section>

      {/* ========== Call to Action ========== */}
      <section className="cta-section">
        <h2>Need a Custom Tool?</h2>
        <p>We build custom web utilities and automations for businesses and individuals.</p>
        <Link to="/request-service" className="generate">
          ✨ Request Custom Service
        </Link>
      </section>
    </>
  );
}

export default Home;
