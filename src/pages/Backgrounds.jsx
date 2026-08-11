import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function Backgrounds() {
  return (
    <>
      <SEO title="Backgrounds - AUQAB" description="Beautiful backgrounds coming soon." />
      <section className="tool-page">
        <div className="password-card" style={{ textAlign: "center" }}>
          <h1>🎨 Backgrounds</h1>
          <p>We're preparing a collection of stunning CSS backgrounds. Coming soon!</p>
          <Link to="/" className="generate" style={{ display: "inline-block", marginTop: 20 }}>← Back to Home</Link>
        </div>
      </section>
    </>
  );
}

export default Backgrounds;
