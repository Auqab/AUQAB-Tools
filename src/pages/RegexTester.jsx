import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState("");

  const handleTest = () => {
    setError("");
    setMatches(null);
    if (!pattern) return;

    try {
      const regex = new RegExp(pattern, flags);
      const results = [];
      let match;
      while ((match = regex.exec(testText)) !== null) {
        results.push({
          index: match.index,
          full: match[0],
          groups: match.slice(1),
        });
        if (!flags.includes("g")) break;
      }
      setMatches(results);
      trackEvent("regex_test", { tool: "regex_tester" });
    } catch (e) {
      setError(e.message);
    }
  };

  const highlightMatches = () => {
    if (!matches || matches.length === 0) return testText;
    // تجميع النص مع تمييز المطابقات
    let lastIndex = 0;
    const parts = [];
    matches.forEach((m) => {
      if (m.index > lastIndex) {
        parts.push(testText.slice(lastIndex, m.index));
      }
      parts.push(<mark key={m.index}>{m.full}</mark>);
      lastIndex = m.index + m.full.length;
    });
    if (lastIndex < testText.length) {
      parts.push(testText.slice(lastIndex));
    }
    return parts;
  };

  return (
    <>
      <SEO
        title="Regex Tester - AUQAB Tools"
        description="Test regular expressions online. See matches, groups, and debug patterns."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔍 Regex Tester</h1>
          <p className="tool-description">
            Write a regular expression, add flags, and test it against any text.
          </p>

          <div className="regex-inputs">
            <div className="regex-field">
              <label>Pattern</label>
              <input
                type="text"
                placeholder="e.g. \\d+"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
            </div>
            <div className="regex-field flags">
              <label>Flags</label>
              <input
                type="text"
                placeholder="g, i, m"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
              />
            </div>
          </div>

          <textarea
            rows="6"
            placeholder="Text to test against..."
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
          />

          <button className="generate" onClick={handleTest} style={{ margin: "15px 0" }}>
            🧪 Test Regex
          </button>

          {error && <div className="json-error">{error}</div>}

          {matches && (
            <div className="regex-results">
              <h3>{matches.length} match(es) found</h3>
              <div className="highlighted-text">{highlightMatches()}</div>
              {matches.length > 0 && (
                <div className="matches-list">
                  {matches.map((m, idx) => (
                    <div key={idx} className="match-item">
                      <strong>Match {idx + 1}:</strong> <code>{m.full}</code>
                      {m.groups.length > 0 && (
                        <span className="groups">
                          {" "}
                          Groups: {m.groups.join(", ")}
                        </span>
                      )}
                      <span className="index"> at index {m.index}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default RegexTester;
