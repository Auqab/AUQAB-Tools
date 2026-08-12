import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import toolsData from "../tools/toolsData";
import SEO from "../components/SEO";

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="AUQAB – Free Tools, Games & Backgrounds"
        description="85+ free online tools, games, and beautiful backgrounds. No registration needed."
      />

      {/* Hero */}
      <section className="hero-new">
        <div className="hero-content-new">
          <h1 className="hero-title">AUQAB<span className="hero-dot">.</span></h1>
          <p className="hero-desc">{t.heroDesc}</p>

          <div className="hero-actions-new">
            <Link to="/tools" className="btn-circle"><span className="circle-icon">{t.tools}</span></Link>
            <Link to="/games" className="btn-circle"><span className="circle-icon">{t.games}</span></Link>
            <Link to="/backgrounds" className="btn-circle"><span className="circle-icon">{t.backgrounds}</span></Link>
          </div>
        </div>
      </section>

      {/* Big Cards */}
      <section className="big-cards-section">
        <div className="big-card">
          <h2>{t.tools}</h2>
          <p>{t.toolsDesc}</p>
          <Link to="/tools" className="big-card-open-btn">{t.open}</Link>
        </div>
        <div className="big-card">
          <h2>{t.games}</h2>
          <p>{t.gamesDesc}</p>
          <Link to="/games" className="big-card-open-btn">{t.open}</Link>
        </div>
        <div className="big-card">
          <h2>{t.backgrounds}</h2>
          <p>{t.backgroundsDesc}</p>
          <Link to="/backgrounds" className="big-card-open-btn">{t.open}</Link>
        </div>
      </section>

      {/* Why Choose */}
      <section className="features-section-new">
        <h2 className="section-title">{t.whyChoose}</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-circle">Fast</span>
            <h3>{t.fastLightweight}</h3>
            <p>{t.fastDesc}</p>
          </div>
          <div className="feature-item">
            <span className="feature-circle">Safe</span>
            <h3>{t.privacyFirst}</h3>
            <p>{t.privacyDesc}</p>
          </div>
          <div className="feature-item">
            <span className="feature-circle">Anywhere</span>
            <h3>{t.worksEverywhere}</h3>
            <p>{t.worksDesc}</p>
          </div>
          <div className="feature-item">
            <span className="feature-circle">Free</span>
            <h3>{t.completelyFree}</h3>
            <p>{t.freeDesc}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-banner">
        <div className="stat">
          <strong>{toolsData.length}+</strong>
          <span>{t.tools}</span>
        </div>
        <div className="stat">
          <strong>{t.games}</strong>
          <span>Relax & Play</span>
        </div>
        <div className="stat">
          <strong>{t.backgrounds}</strong>
          <span>Design Assets</span>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>{t.needCustomTool}</h2>
        <p>{t.needCustomToolDesc}</p>
        <Link to="/request-service" className="btn-primary">{t.requestCustomService}</Link>
      </section>
    </>
  );
}

export default Home;
