import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function AIGrammarCheck() {
  const [text, setText] = useState("");
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkGrammar = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text, language: "en-US" }),
      });
      const data = await res.json();
      setMatches(data.matches || []);
      trackEvent("ai_grammar_check", { tool: "ai_grammar_check" });
    } catch {
      alert("Error checking grammar.");
    }
    setLoading(false);
  };

  const highlight = (match) => {
    if (!match.replacements) return match.message;
    const rep = match.replacements.map((r) => r.value).join(", ");
    return `${match.message} → ${rep}`;
  };

  return (
    <>
      <SEO title="AI Grammar Check - AUQAB Tools" description="Free AI-powered grammar checker." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🧠 AI Grammar Check</h1>
          <p className="tool-description">Paste your text and let AI find grammar mistakes.</p>
          <textarea rows="6" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write or paste text..." />
          <button className="generate" style={{ margin: "15px 0" }} onClick={checkGrammar} disabled={loading}>
            {loading ? "Checking..." : "🔎 Check Grammar"}
          </button>
          {matches && matches.length === 0 && <p style={{ color: "#22c55e" }}>No errors found! 🎉</p>}
          {matches && matches.length > 0 && (
            <div className="ssl-result">
              <ul>
                {matches.map((m, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <strong>{m.shortMessage}</strong>: {highlight(m)}
                    <br /><small>{m.sentence}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AIGrammarCheck;
