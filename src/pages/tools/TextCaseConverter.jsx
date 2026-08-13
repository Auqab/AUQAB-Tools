import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function TextCaseConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [active, setActive] = useState("");

  function applyCase(type) {
    if (!text) return;
    let output = "";

    switch (type) {
      case "upper":
        output = text.toUpperCase();
        break;
      case "lower":
        output = text.toLowerCase();
        break;
      case "capitalize":
        output = text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case "sentence":
        output = text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
        break;
      case "alternating":
        output = text
          .split("")
          .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
          .join("");
        break;
      case "inverse":
        output = text
          .split("")
          .map((char) =>
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      default:
        output = text;
    }

    setResult(output);
    setActive(type);
    trackEvent("text_case_convert", { tool: "text_case_converter", type });
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    showToast("Result copied!");
  }

  function clearAll() {
    setText("");
    setResult("");
    setActive("");
  }

  return (
    <>
      <SEO
        title="Free Text Case Converter - AUQAB Tools"
        description="Convert text to uppercase, lowercase, sentence case, alternating case and more."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>Text Case Converter</h1>
          <p className="tool-description">
            Change text format instantly. Uppercase, lowercase, sentence case, and more creative styles.
          </p>

          <textarea
            rows="8"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setResult("");
              setActive("");
            }}
          />

          <div className="case-buttons">
            <button className={`case-btn ${active === "upper" ? "active-case" : ""}`} onClick={() => applyCase("upper")}>
              UPPERCASE
            </button>
            <button className={`case-btn ${active === "lower" ? "active-case" : ""}`} onClick={() => applyCase("lower")}>
              lowercase
            </button>
            <button className={`case-btn ${active === "capitalize" ? "active-case" : ""}`} onClick={() => applyCase("capitalize")}>
              Capitalize Words
            </button>
            <button className={`case-btn ${active === "sentence" ? "active-case" : ""}`} onClick={() => applyCase("sentence")}>
              Sentence case
            </button>
            <button className={`case-btn ${active === "alternating" ? "active-case" : ""}`} onClick={() => applyCase("alternating")}>
              aLtErNaTiNg
            </button>
            <button className={`case-btn ${active === "inverse" ? "active-case" : ""}`} onClick={() => applyCase("inverse")}>
              iNVERSE cASE
            </button>
          </div>

          {result && (
            <div className="result-section">
              <textarea
                rows="6"
                readOnly
                value={result}
                placeholder="Converted text appears here..."
                className="output-textarea"
              />
              <div className="result-actions">
                <button className="generate" onClick={copyResult}>
                  Copy Result
                </button>
              </div>
            </div>
          )}

          {(text || result) && (
            <button className="clear-btn" onClick={clearAll}>
              Clear All
            </button>
          )}

          <div className="info-section">
            <h2>Available Transformations</h2>
            <ul>
              <li><strong>UPPERCASE</strong> – all letters capital</li>
              <li><strong>lowercase</strong> – all letters small</li>
              <li><strong>Capitalize Words</strong> – first letter of each word</li>
              <li><strong>Sentence case</strong> – first letter after punctuation</li>
              <li><strong>aLtErNaTiNg cAsE</strong> – alternates letter by letter</li>
              <li><strong>iNVERSE cASE</strong> – flips capitalization</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default TextCaseConverter;
