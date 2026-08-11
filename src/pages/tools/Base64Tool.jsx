import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function Base64Tool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const textSize = text.length;
  const resultSize = result.length;

  // ترميز Base64 بطريقة حديثة
  function encode() {
    if (!text) return;
    try {
      const encoded = btoa(String.fromCharCode(...new TextEncoder().encode(text)));
      setResult(encoded);
      trackEvent("base64_encode", { tool: "base64_tool" });
    } catch (e) {
      setResult("❌ Encoding error. Check your input.");
    }
  }

  // فك ترميز Base64 بطريقة حديثة
  function decode() {
    if (!text) return;
    try {
      const decoded = new TextDecoder().decode(
        Uint8Array.from(atob(text), (c) => c.charCodeAt(0))
      );
      setResult(decoded);
      trackEvent("base64_decode", { tool: "base64_tool" });
    } catch (e) {
      setResult("❌ Invalid Base64 string.");
    }
  }

  function copyResult() {
    if (!result || result.startsWith("❌")) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function clearAll() {
    setText("");
    setResult("");
    setCopied(false);
  }

  return (
    <>
      <SEO
        title="Free Base64 Encoder Decoder Online - AUQAB Tools"
        description="Encode and decode Base64 text online quickly. Free developer tool for Base64 conversion."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔐 Base64 Encoder / Decoder</h1>
          <p className="tool-description">
            Convert text to Base64 and decode Base64 data instantly.
            Useful for developers, APIs, and web projects.
          </p>

          {/* إدخال */}
          <div className="json-section">
            <label className="json-label">
              📥 Input
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

          {/* أزرار */}
          <div className="base64-actions">
            <button className="generate" onClick={encode}>
              🔒 Encode to Base64
            </button>
            <button className="minify-btn" onClick={decode}>
              🔓 Decode from Base64
            </button>
          </div>

          {/* نتيجة */}
          {result && (
            <div className="json-section">
              <label className="json-label">
                📤 Output
                <span className="size-hint">({resultSize} chars)</span>
              </label>
              <textarea
                rows="8"
                readOnly
                value={result}
                className={`output-textarea ${result.startsWith("❌") ? "json-error-textarea" : ""}`}
                spellCheck={false}
              />
              <button
                className="copy-btn-json"
                onClick={copyResult}
                disabled={result.startsWith("❌")}
              >
                {copied ? "✅ Copied!" : "📋 Copy Result"}
              </button>
            </div>
          )}

          {/* مسح */}
          {(text || result) && (
            <button className="clear-btn" onClick={clearAll}>
              ✕ Clear All
            </button>
          )}

          {/* معلومات */}
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

            <h2>Frequently Asked Questions</h2>
            <h3>What is Base64?</h3>
            <p>Base64 is an encoding method that represents binary data as ASCII text. It's commonly used in data URLs, APIs, and email attachments.</p>
            <h3>Is Base64 encryption?</h3>
            <p>No. Base64 is encoding, not encryption. Anyone can decode it back. Do not use Base64 for securing sensitive data.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Base64Tool;
