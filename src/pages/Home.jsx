import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toolsData from "../tools/toolsData";
import ToolCard from "../components/ToolCard";
import SEO from "../components/SEO";

// بيانات الألعاب والخلفيات (يمكنك توسيعها لاحقاً)
const gamesData = [
  { id: "chess-timer", icon: "♟️", title: "Chess Timer", description: "Two-player chess clock", path: "/tools/chess-timer" },
  { id: "dice-roller", icon: "🎲", title: "Dice Roller", description: "Roll virtual dice", path: "/tools/dice-roller" },
  { id: "pomodoro-timer", icon: "🍅", title: "Pomodoro Timer", description: "Boost focus with timed sessions", path: "/tools/pomodoro-timer" },
];

const backgroundsData = [
  { id: "particles", icon: "✨", title: "Particle Background", description: "Live animated particles", path: "/" },
  { id: "gradient-gen", icon: "🎨", title: "Gradient Generator", description: "Create beautiful CSS gradients", path: "/tools/color-picker" },
  { id: "patterns", icon: "🖼️", title: "Pattern Gallery", description: "Background pattern library", path: "/" },
];

function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

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
    setResults(filtered.slice(0, 8));
  };

  const goToTool = (path) => {
    setQuery("");
    setResults([]);
    navigate(path);
  };

  return (
    <>
      <SEO
        title="AUQAB - Free Tools, Games & Backgrounds"
        description="85+ free online tools, fun games, and beautiful backgrounds. QR, PDF, AI, Security, Media, Developer, and more."
      />

      {/* ========== Hero Section ========== */}
      <section className="hero">
        <div className="hero-content">
          <h1>AUQAB</h1>
          <p>أدوات رقمية، ألعاب، وخلفيات – مجاناً وسريعة.</p>
          <p className="hero-subtitle">
            Free online tools, games, and backgrounds. All directly in your browser — no sign‑up needed.
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
              🚀 Explore All
            </Link>
            <Link to="/services" className="service-btn">
              💼 Custom Services
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Why Choose Section ========== */}
      <section className="features-section">
        <h2 className="section-title">Why Choose AUQAB?</h2>
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
          <strong>🎮</strong>
          <span>Games</span>
        </div>
        <div className="stat">
          <strong>🎨</strong>
          <span>Backgrounds</span>
        </div>
      </section>

{/* ========== البطاقات الثلاثة الكبيرة ========== */}
<section className="big-cards-section">
  <div className="big-card" onClick={() => navigate("/tools")}>
    <span className="big-card-icon">🛠️</span>
    <h2>Tools</h2>
    <p>85+ professional utilities for images, text, security, developers, and more.</p>
  </div>

  <div className="big-card" onClick={() => navigate("/games")}>
    <span className="big-card-icon">🎮</span>
    <h2>Games</h2>
    <p>Fun mini‑games to relax or challenge your brain. More coming soon!</p>
  </div>

  <div className="big-card" onClick={() => navigate("/backgrounds")}>
    <span className="big-card-icon">🎨</span>
    <h2>Backgrounds</h2>
    <p>Beautiful CSS backgrounds, gradients, and patterns for your projects.</p>
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
