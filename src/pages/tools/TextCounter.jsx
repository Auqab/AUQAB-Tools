import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function TextCounter() {
  const [text, setText] = useState("");
  const hasTracked = useRef(false);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    if (newText && !hasTracked.current) {
      trackEvent("text_counter_use", { tool: "text_counter" });
      hasTracked.current = true;
    }

    if (!newText) {
      hasTracked.current = false;
    }
  };

  const characters = text.length;
  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;
  const lines = text.split("\n").length;
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    : 0;
  const readingTime = Math.ceil(words / 200);

  const clearText = () => {
    setText("");
    hasTracked.current = false;
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast("Text copied!");
  };

  return (
    <>
      <SEO
        title="Free Text & Word Counter - AUQAB Tools"
        description="Count words, characters, sentences, lines and reading time instantly."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>Text & Word Counter</h1>
          <p className="tool-description">
            Analyze your text instantly. Count words, characters, sentences, lines, and estimated reading time.
          </p>

          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Write or paste your text here..."
            rows="8"
          />

          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Characters</span>
              <strong>{characters}</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">Words</span>
              <strong>{words}</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">Sentences</span>
              <strong>{sentences}</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">Lines</span>
              <strong>{lines}</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">Reading Time</span>
              <strong>{readingTime} min</strong>
            </div>
          </div>

          <div className="buttons">
            <button className="generate" onClick={copyText}>
              Copy Text
            </button>
            <button className="clear" onClick={clearText}>
              Clear
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default TextCounter;
