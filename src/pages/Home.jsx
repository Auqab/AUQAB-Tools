import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toolsData from "../tools/toolsData";
import ToolCard from "../components/ToolCard";
import SEO from "../components/SEO";

function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const featuredTools = toolsData.slice(0, 6);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const filtered = toolsData.filter(
      (tool) =>
        tool.title.toLowerCase().includes(value.toLowerCase()) ||
        tool.description.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered.slice(0, 8)); // عرض 8 نتائج كحد أقصى
  };

  const goToTool = (path) => {
    setQuery("");
    setResults([]);
    navigate(path);
  };

  return (
    <>
      <SEO
        title="AUQAB Tools - Free Online Tools for Everyone"
        description="Free online tools for images, text, security and developers."
      />

      {/* ========== Hero Section ========== */}
      <section className="hero">
        <div className="hero-content">
          <h1>AUQAB Tools</h1>
          <p>أدوات رقمية مجانية وسريعة تساعدك في إنجاز مهامك اليومية بسهولة.</p>
          <p className="hero-subtitle">
            Free online tools for images, text, security and developers. All tools work directly in your browser — no sign‑up needed.
          </p>

          {/* شريط البحث الذكي */}
          <div className="smart-search">
            <input
              type="text"
              placeholder="🔍 Search for a tool... (e.g. QR, PDF, AI)"
              value={query}
              onChange={handleSearch}
              className="smart-search-input"
              autoComplete="off"
            />
            {results.length > 0 && (
              <div className="smart-results">
                {results.map((tool) => (
                  <div
                    key={tool.id}
                    className="smart-result-item"
                    onClick={() => goToTool(tool.path)}
                  >
                    <span className="tool-icon">{tool.icon}</span>
                    <div>
                      <strong>{tool.title}</strong>
                      <p>{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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

      {/* باقي الأقسام بدون تغيير */}
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
