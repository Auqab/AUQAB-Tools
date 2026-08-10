import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

// دوال تصغير محلية بسيطة (لا تحتاج Node.js)
function minifyHTML(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // تعليقات
    .replace(/\s+/g, " ")
    .replace(/;\s}/g, "}")
    .replace(/\{\s+/g, "{")
    .replace(/:\s+/g, ":")
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\/.*$/gm, "") // تعليقات //
    .replace(/\/\*[\s\S]*?\*\//g, "") // تعليقات /**/
    .replace(/\s+/g, " ")
    .trim();
}

function CodeMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("html");

  const handleMinify = () => {
    let result = "";
    try {
      if (mode === "html") result = minifyHTML(input);
      else if (mode === "css") result = minifyCSS(input);
      else if (mode === "js") result = minifyJS(input);
      setOutput(result);
      trackEvent("code_minify", { tool: "code_minifier", mode });
    } catch {
      setOutput("Minification error.");
    }
  };

  return (
    <>
      <SEO title="Code Minifier - AUQAB Tools" description="Minify HTML, CSS and JavaScript online." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🧹 Code Minifier</h1>
          <p className="tool-description">Paste HTML, CSS or JS code and compress it.</p>

          <div className="diff-mode">
            {["html", "css", "js"].map((m) => (
              <label key={m}>
                <input type="radio" value={m} checked={mode === m} onChange={() => setMode(m)} />
                {m.toUpperCase()}
              </label>
            ))}
          </div>

          <textarea rows="8" placeholder={`Paste ${mode.toUpperCase()}...`} value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="generate" style={{ margin: "15px 0" }} onClick={handleMinify}>
            ⚡ Minify
          </button>

          {output && (
            <div>
              <textarea rows="8" readOnly value={output} />
              <button className="generate" onClick={() => { navigator.clipboard.writeText(output); trackEvent("code_copy", { tool: "code_minifier" }); }}>
                📋 Copy
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CodeMinifier;
