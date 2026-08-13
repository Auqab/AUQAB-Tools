import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function Base64Tool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const textSize = text.length;
  const resultSize = result.length;

  const encode = () => {
    if (!text) return;
    try {
      const encoded = btoa(String.fromCharCode(...new TextEncoder().encode(text)));
      setResult(encoded);
      showToast("Text encoded to Base64!");
      trackEvent("base64_encode", { tool: "base64_tool" });
    } catch {
      setResult("Encoding error. Check your input.");
    }
  };

  const decode = () => {
    if (!text) return;
    try {
      const decoded = new TextDecoder().decode(
        Uint8Array.from(atob(text), (c) => c.charCodeAt(0))
      );
      setResult(decoded);
      showToast("Base64 decoded to text!");
      trackEvent("base64_decode", { tool: "base64_tool" });
    } catch {
      setResult("Invalid Base64 string.");
    }
  };

  const copyResult = () => {
    if (!result || result.startsWith("Error") || result.startsWith("Invalid")) return;
    navigator.clipboard.writeText(result);
    showToast("Result copied!");
  };

  const clearAll = () => {
    setText("");
    setResult("");
  };

  return (
    <>
      <SEO
        title="Free Base64 Encoder Decoder Online - AUQAB Tools"
        description="Encode and decode Base64 text online quickly. Free developer tool for Base64 conversion."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>Base64 Encoder / Decoder</h1>
          <p className="tool-description">
            Convert text to Base64 and decode Base64 data instantly.
            Useful for developers, APIs, and web projects.
          </p>

          <div className="json-section">
            <label className="json-label">
              Input
              {textSize > 0 && <span className="size-hint">({textSize} chars)</span>}
            </label>
            <textarea
              rows="8"
              placeholder="Enter text to encode or Base64 string to decode..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setResult("");
              }}
              spellCheck={false}
            />
          </div>

          <div className="base64-actions">
            <button className="generate" onClick={encode}>
              Encode to Base64
            </button>
            <button className="minify-btn" onClick={decode}>
              Decode from Base64
            </button>
          </div>

          {result && (
            <div className="json-section">
              <label className="json-label">
                Output
                <span className="size-hint">({resultSize} chars)</span>
              </label>
              <textarea
                rows="8"
                readOnly
                value={result}
                className={`output-textarea ${result.startsWith("Error") || result.startsWith("Invalid") ? "json-error-textarea" : ""}`}
                spellCheck={false}
              />
              <button
                className="copy-btn-json"
                onClick={copyResult}
                disabled={result.startsWith("Error") || result.startsWith("Invalid")}
              >
                Copy Result
              </button>
            </div>
          )}

          {(text || result) && (
            <button className="clear-btn" onClick={clearAll}>
              Clear All
            </button>
          )}

          <div className="info-section">
            <h2>How to use Base64 Tool?</h2>
            <p>Enter your text, then choose <strong>Encode</strong> to convert it to Base64, or <strong>Decode</strong> to revert Base64 back to plain text.</p>

            <h2>Why use AUQAB Base64 Tool?</h2>
            <ul>
              <li>Free online developer tool</li>
              <li>Works directly in your browser</li>
              <li>No data is stored or uploaded</li>
              <li>Fast, modern and simple</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Base64Tool;
