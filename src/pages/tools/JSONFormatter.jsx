import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const inputSize = input.length;
  const outputSize = output.length;

  function formatJSON() {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 4);
      setOutput(formatted);
      setError("");
      trackEvent("json_format", { tool: "json_formatter" });
    } catch (e) {
      setError("❌ Invalid JSON format. Please check your syntax.");
      setOutput("");
    }
  }

  function minifyJSON() {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      trackEvent("json_minify", { tool: "json_formatter" });
    } catch (e) {
      setError("❌ Invalid JSON format. Please check your syntax.");
      setOutput("");
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <>
      <SEO
        title="Free JSON Formatter Online - AUQAB Tools"
        description="Format, beautify and minify JSON data online. Fast, private and browser-based JSON tool."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>{} JSON Formatter</h1>
          <p className="tool-description">
            Format and clean JSON data instantly.
            Beautify with indentation or compress to a smaller format.
            All processing is private and happens in your browser.
          </p>

          {/* إدخال */}
          <div className="json-section">
            <label className="json-label">
              📥 Input JSON
              {inputSize > 0 && <span className="size-hint">({inputSize} chars)</span>}
            </label>
            <textarea
              rows="10"
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
                setOutput("");
              }}
              spellCheck={false}
            />
          </div>

          {/* أزرار العمليات */}
          <div className="json-actions">
            <button className="generate" onClick={formatJSON}>
              ✨ Format (Beautify)
            </button>
            <button className="minify-btn" onClick={minifyJSON}>
              📦 Minify (Compress)
            </button>
          </div>

          {/* خطأ */}
          {error && <div className="json-error">{error}</div>}

          {/* نتيجة */}
          {output && (
            <div className="json-section">
              <label className="json-label">
                📤 Output JSON
                <span className="size-hint">
                  ({outputSize} chars
                  {inputSize > 0 && outputSize !== inputSize &&
                    ` • ${inputSize > outputSize ? '↓' : '↑'} ${Math.abs(outputSize - inputSize)} chars`}
                  )
                </span>
              </label>
              <textarea
                rows="10"
                readOnly
                value={output}
                placeholder="Result appears here..."
                spellCheck={false}
                className="output-textarea"
              />
              <button className="copy-btn-json" onClick={copyOutput}>
                {copied ? "✅ Copied!" : "📋 Copy Result"}
              </button>
            </div>
          )}

          {/* مسح */}
          {(input || output) && (
            <button className="clear-btn" onClick={clearAll} style={{ marginTop: '20px' }}>
              ✕ Clear All
            </button>
          )}
        </div>

        {/* معلومات */}
        <div className="info-section">
          <h2>How to use JSON Formatter?</h2>
          <p>1. Paste your JSON data in the input box.</p>
          <p>2. Click "Format" for readable indentation or "Minify" to compress.</p>
          <p>3. Copy the result to your clipboard.</p>

          <h2>Why use AUQAB JSON Formatter?</h2>
          <ul>
            <li>Free online JSON tool</li>
            <li>Works directly in your browser</li>
            <li>No data is stored or uploaded</li>
            <li>Useful for developers and API testing</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <h3>Is my JSON uploaded?</h3>
          <p>No. Processing happens locally in your browser. Your data stays private.</p>
          <h3>Who can use this tool?</h3>
          <p>Developers, data analysts and anyone working with JSON files or APIs.</p>
        </div>
      </section>
    </>
  );
}

export default JSONFormatter;
