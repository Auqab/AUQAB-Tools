import { useState, useCallback } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const backgroundTypes = [
  { label: "Linear Gradient", value: "linear" },
  { label: "Radial Gradient", value: "radial" },
  { label: "Dots Pattern", value: "dots" },
  { label: "Lines Pattern", value: "lines" },
  { label: "Waves", value: "waves" },
];

function BackgroundGenerator() {
  const [type, setType] = useState("linear");
  const [color1, setColor1] = useState("#38bdf8");
  const [color2, setColor2] = useState("#1e293b");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const generateCSS = useCallback(() => {
    switch (type) {
      case "linear":
        return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
      case "radial":
        return `background: radial-gradient(circle, ${color1}, ${color2});`;
      case "dots":
        return `background-color: ${color1};\nbackground-image: radial-gradient(${color2} 1px, transparent 1px);\nbackground-size: 20px 20px;`;
      case "lines":
        return `background-color: ${color1};\nbackground-image: repeating-linear-gradient(45deg, ${color2} 0, ${color2} 1px, transparent 1px, transparent 10px);`;
      case "waves":
        return `background-color: ${color1};\nbackground-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,60 C300,120 600,0 900,60 C1050,90 1150,90 1200,60 L1200,120 L0,120 Z' fill='${color2.replace('#', '%23')}'/%3E%3C/svg%3E");\nbackground-repeat: repeat-x;\nbackground-position: bottom;`;
      default:
        return "";
    }
  }, [type, color1, color2, angle]);

  const cssCode = generateCSS();

  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    showToast("CSS copied!");
    trackEvent("bg_copy", { tool: "background_generator" });
    setTimeout(() => setCopied(false), 1500);
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
      <SEO title="CSS Background Generator - AUQAB" description="Create beautiful CSS gradients, patterns, and waves." />
      <section className="tool-page">
        <div className="password-card">
          <h1>Background Generator</h1>
          <p className="tool-description">Design CSS backgrounds interactively. Choose type, colors, and copy the code.</p>

          {/* معاينة حية */}
          <div className="bg-preview" style={{ background: cssCode.replace("background: ", "") }}>
            <span className="bg-preview-text">Preview</span>
          </div>

          {/* عناصر التحكم */}
          <div className="bg-controls">
            <div className="bg-control-row">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {backgroundTypes.map((t) => (
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

            {(type === "linear") && (
              <div className="bg-control-row">
                <label>Angle: {angle}°</label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
              </div>
            )}

            <button className="preset-btn" onClick={randomize}>Randomize</button>
          </div>

          {/* كود CSS */}
          <div className="bg-code">
            <h3>CSS Code</h3>
            <div className="uuid-row">
              <code>{cssCode}</code>
              <button className="copy-btn-mini" onClick={copyCSS}>{copied ? "✅" : "📋"}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BackgroundGenerator;
