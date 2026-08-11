import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const templates = [
  { name: "Sunset", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { name: "Ocean", value: "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)" },
  { name: "Forest", value: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)" },
  { name: "Midnight", value: "linear-gradient(135deg, #232526 0%, #414345 100%)" },
];

function BackgroundGenerator() {
  const [gradient, setGradient] = useState(templates[0].value);
  const [copied, setCopied] = useState(false);

  const applyTemplate = (value) => {
    setGradient(value);
    trackEvent("bg_template", { tool: "background_generator" });
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
    setCopied(true);
    showToast("CSS copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <SEO title="CSS Background Generator - AUQAB" description="Create beautiful CSS backgrounds, gradients, and patterns." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🎨 CSS Background Generator</h1>
          <p className="tool-description">Choose a background template or create your own. Copy the CSS instantly.</p>

          {/* المعاينة */}
          <div className="bg-preview" style={{ background: gradient }}>
            <span className="bg-preview-text">Preview</span>
          </div>

          {/* القوالب */}
          <div className="bg-templates">
            <h3>Templates</h3>
            <div className="bg-template-buttons">
              {templates.map((t) => (
                <button key={t.name} className="preset-btn" onClick={() => applyTemplate(t.value)}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* كود CSS */}
          <div className="bg-code">
            <h3>CSS Code</h3>
            <div className="uuid-row">
              <code>background: {gradient};</code>
              <button className="copy-btn-mini" onClick={copyCSS}>
                {copied ? "✅" : "📋"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BackgroundGenerator;
