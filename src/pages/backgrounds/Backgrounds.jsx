import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

const backgroundTools = [
  {
    id: "gradient-generator",
    icon: "🌈",
    title: "CSS Gradient Generator",
    description: "Create beautiful linear and radial gradients visually and copy the CSS code.",
    path: "/tools/gradient-generator"
  },
  {
    id: "pattern-gallery",
    icon: "🧩",
    title: "Pattern Gallery",
    description: "Browse and customize seamless background patterns.",
    path: "/tools/pattern-gallery"
  },
  {
    id: "animated-backgrounds",
    icon: "✨",
    title: "Animated Backgrounds",
    description: "Pure CSS and Canvas animated backgrounds ready to use.",
    path: "/tools/animated-backgrounds"
  }
];

function Backgrounds() {
  return (
    <>
      <SEO
        title="Backgrounds - AUQAB"
        description="Free CSS backgrounds, gradients, patterns, and animated designs."
      />
      <section className="tool-page">
        <div className="password-card" style={{ textAlign: "center", maxWidth: 800 }}>
          <h1>🎨 Backgrounds</h1>
          <p className="tool-description">
            Beautiful, customizable backgrounds for your websites and projects.
            Generate gradients, browse patterns, and use animated designs — all for free.
          </p>

          <div className="cards" style={{ marginTop: 30 }}>
            {backgroundTools.map((tool) => (
              <div key={tool.id} className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <h3>{tool.title}</h3>
                <p className="tool-desc">{tool.description}</p>
                <Link to={tool.path} className="open-tool">Open</Link>
              </div>
            ))}
          </div>

          <div className="center-btn" style={{ marginTop: 30 }}>
            <Link to="/" className="open-tool">← Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Backgrounds;
