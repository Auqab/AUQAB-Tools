import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function CharFrequencyCounter() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [freq, setFreq] = useState(null);
  const [wordFreq, setWordFreq] = useState(null);

  const analyze = () => {
    if (!text) return;

    // تردد الأحرف
    const chars = caseSensitive ? text.split("") : text.toLowerCase().split("");
    const charMap = {};
    chars.forEach((ch) => {
      if (ch.trim() === "") return; // تجاهل المسافات الفارغة
      charMap[ch] = (charMap[ch] || 0) + 1;
    });
    const charArray = Object.entries(charMap).sort((a, b) => b[1] - a[1]);

    // تردد الكلمات
    const words = caseSensitive
      ? text.split(/\s+/)
      : text.toLowerCase().split(/\s+/);
    const wordMap = {};
    words.forEach((w) => {
      if (!w) return;
      wordMap[w] = (wordMap[w] || 0) + 1;
    });
    const wordArray = Object.entries(wordMap).sort((a, b) => b[1] - a[1]);

    setFreq(charArray);
    setWordFreq(wordArray);
    trackEvent("char_frequency", { tool: "char_frequency_counter" });
  };

  return (
    <>
      <SEO
        title="Character Frequency Counter - AUQAB Tools"
        description="Count character and word frequency in any text."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔢 Character Frequency Counter</h1>
          <p className="tool-description">
            Paste your text and see how often each character and word appears.
          </p>

          <textarea
            rows="6"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="freq-options">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
              Case Sensitive
            </label>
            <button className="generate" onClick={analyze}>
              📊 Analyze
            </button>
          </div>

          {freq && freq.length > 0 && (
            <div className="freq-results">
              <div className="freq-section">
                <h3>Character Frequency</h3>
                <div className="freq-bars">
                  {freq.slice(0, 20).map(([char, count]) => (
                    <div key={char} className="freq-bar">
                      <span className="freq-char">{char}</span>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${(count / freq[0][1]) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="freq-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {wordFreq && wordFreq.length > 0 && (
                <div className="freq-section">
                  <h3>Top Words</h3>
                  <div className="freq-bars">
                    {wordFreq.slice(0, 15).map(([word, count]) => (
                      <div key={word} className="freq-bar">
                        <span className="freq-char">{word}</span>
                        <div className="bar-track">
                          <div
                            className="bar-fill word-fill"
                            style={{
                              width: `${(count / wordFreq[0][1]) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="freq-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CharFrequencyCounter;

