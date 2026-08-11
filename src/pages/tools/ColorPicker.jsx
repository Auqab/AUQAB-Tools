import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

// تحويل HEX إلى RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// تحويل RGB إلى HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// توليد لوحة متناسقة من لون أساسي
function generatePalette(hex) {
  const { h, s, l } = rgbToHsl(...Object.values(hexToRgb(hex)));
  const palette = [];

  // تدرج بالإضاءة والتشبع
  palette.push(`hsl(${h}, ${s}%, ${Math.min(l + 20, 95)}%)`);
  palette.push(`hsl(${h}, ${Math.min(s + 20, 100)}%, ${l}%)`);
  palette.push(hex); // اللون الأصلي
  palette.push(`hsl(${h}, ${Math.max(s - 20, 0)}%, ${Math.max(l - 15, 5)}%)`);
  palette.push(`hsl(${(h + 30) % 360}, ${s}%, ${l}%)`);

  return palette;
}

function ColorPicker() {
  const [color, setColor] = useState("#38bdf8");
  const [rgb, setRgb] = useState("");
  const [hsl, setHsl] = useState("");
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const { r, g, b } = hexToRgb(color);
    const hslObj = rgbToHsl(r, g, b);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
    setPalette(generatePalette(color));
  }, [color]);

  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    trackEvent("color_copy", { tool: "color_picker", type });
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <SEO
        title="Color Picker & Palette Generator - AUQAB Tools"
        description="Pick colors, get HEX, RGB, HSL values and generate beautiful color palettes instantly."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🎨 Color Picker & Palette</h1>
          <p className="tool-description">
            Choose a color and get its HEX, RGB & HSL values. Instantly generate a harmonious palette.
          </p>

          {/* منتقي اللون */}
          <div className="color-picker-area">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-wheel"
            />
            <div className="color-preview" style={{ backgroundColor: color }}>
              <span className="preview-text">{color}</span>
            </div>
          </div>

          {/* صيغ اللون */}
          <div className="color-formats">
            <div className="format-row">
              <span className="format-label">HEX</span>
              <code>{color}</code>
              <button className="copy-btn-mini" onClick={() => copy(color, "hex")}>
                {copied === "hex" ? "✓" : "📋"}
              </button>
            </div>
            <div className="format-row">
              <span className="format-label">RGB</span>
              <code>{rgb}</code>
              <button className="copy-btn-mini" onClick={() => copy(rgb, "rgb")}>
                {copied === "rgb" ? "✓" : "📋"}
              </button>
            </div>
            <div className="format-row">
              <span className="format-label">HSL</span>
              <code>{hsl}</code>
              <button className="copy-btn-mini" onClick={() => copy(hsl, "hsl")}>
                {copied === "hsl" ? "✓" : "📋"}
              </button>
            </div>
          </div>

          {/* لوحة الألوان */}
          {palette.length > 0 && (
            <div className="palette-section">
              <h3>🎯 Generated Palette</h3>
              <div className="palette">
                {palette.map((c, i) => (
                  <div
                    key={i}
                    className="palette-swatch"
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      setColor(c.startsWith("#") ? c : color);
                      trackEvent("palette_select", { tool: "color_picker" });
                    }}
                  >
                    <span className="swatch-value">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ColorPicker;
