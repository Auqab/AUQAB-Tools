import { useState, useCallback } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const types = [
  { label: "Linear Gradient", value: "linear" },
  { label: "Radial Gradient", value: "radial" },
];

function BackgroundGenerator() {
  const [type, setType] = useState("linear");
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [angle, setAngle] = useState(135);

  // توليد كود CSS بناءً على الاختيارات
  const generateCSS = useCallback(() => {
    if (type === "linear") {
      return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
    } else if (type === "radial") {
      return `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`;
    }
    return "";
  }, [type, color1, color2, angle]);

  const cssCode = generateCSS();

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${cssCode};`);
    showToast("CSS copied!");
    trackEvent("bg_copy", { tool: "background_generator" });
  };

  const randomize = () => {
    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
    trackEvent("bg_randomize", { tool: "background_generator" });
  };

  return (
    <>
      <SEO title="CSS Background Generator - AUQAB" description="Create beautiful CSS gradients interactively." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🎨 Background Generator</h1>
          <p className="tool-description">Design your own CSS gradient background. Choose colors, type, and angle.</p>

          {/* معاينة حية */}
          <div className="bg-preview" style={{ background: cssCode }}>
            <span className="bg-preview-text">Preview</span>
          </div>

          {/* عناصر التحكم */}
          <div className="bg-controls">
            <div className="bg-control-row">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {types.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="bg-control-row">
              <label>Color 1</label>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
            </div>

            <div className="bg-control-row">
              <label>Color 2</label>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
            </div>

            {type === "linear" && (
              <div className="bg-control-row">
                <label>Angle: {angle}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                />
              </div>
            )}

            <button className="preset-btn" onClick={randomize}>
              🎲 Randomize
            </button>
          </div>

          {/* كود CSS */}
          <div className="bg-code">
            <h3>CSS Code</h3>
            <div className="uuid-row">
              <code>background: {cssCode};</code>
              <button className="copy-btn-mini" onClick={copyCSS}>
                📋
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BackgroundGenerator;
