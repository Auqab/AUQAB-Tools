import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

function Games() {
  return (
    <>
      <SEO title="Games - AUQAB" description="Fun mini-games coming soon." />
      <section className="tool-page">
        <div className="password-card" style={{ textAlign: "center" }}>
          <h1>🎮 Games</h1>
          <p>We're building awesome mini‑games for you. Stay tuned!</p>
          <Link to="/" className="generate" style={{ display: "inline-block", marginTop: 20 }}>← Back to Home</Link>
        </div>
      </section>
    </>
  );
}

export default Games;
