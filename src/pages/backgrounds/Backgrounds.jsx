import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";

const presetBackgrounds = [
  {
    id: "aurora",
    name: "Aurora",
    css: "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  },
  {
    id: "ocean",
    name: "Ocean",
    css: "background: linear-gradient(135deg, #0c3483 0%, #a2b6df 100%);"
  },
  {
    id: "forest",
    name: "Forest",
    css: "background: linear-gradient(135deg, #134e5e 0%, #71b280 100%);"
  },
  {
    id: "midnight",
    name: "Midnight",
    css: "background: linear-gradient(135deg, #232526 0%, #414345 100%);"
  },
  {
    id: "sunset",
    name: "Sunset",
    css: "background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);"
  },
  {
    id: "purple",
    name: "Purple Dream",
    css: "background: radial-gradient(circle, #a18cd1 0%, #fbc2eb 100%);"
  },
];

function Backgrounds() {
  const [copiedId, setCopiedId] = useState(null);

  const copyCSS = (bg) => {
    navigator.clipboard.writeText(bg.css);
    setCopiedId(bg.id);
    showToast("CSS copied!");
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <>
      <SEO title="Backgrounds - AUQAB" description="A collection of beautiful CSS backgrounds for your projects." />
      <section className="tool-page">
        <div className="password-card">
          <h1>Backgrounds</h1>
          <p className="tool-description">Choose from ready-made backgrounds or create your own with the generator.</p>

          <div className="cards" style={{ marginTop: 30 }}>
            {presetBackgrounds.map((bg) => (
              <div key={bg.id} className="tool-card">
                <div
                  style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 12,
                    ...parseCSS(bg.css)
                  }}
                />
                <h3 className="tool-title">{bg.name}</h3>
                <button
                  className="open-tool-btn"
                  onClick={() => copyCSS(bg)}
                >
                  {copiedId === bg.id ? "Copied!" : "Copy CSS"}
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 30 }}>
            <Link to="/backgrounds/generator" className="big-card-open-btn">Open Generator</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// دالة صغيرة لتحويل خاصية CSS إلى كائن style مناسب
function parseCSS(css) {
  const result = {};
  css.split(";").forEach((decl) => {
    if (!decl.trim()) return;
    const [prop, value] = decl.split(":");
    if (prop && value) {
      const jsProp = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      result[jsProp] = value.trim();
    }
  });
  return result;
}

export default Backgrounds;
