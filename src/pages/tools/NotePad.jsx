import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function NotePad() {
  const [note, setNote] = useState(() => localStorage.getItem("notepad") || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem("notepad", note);
  }, [note]);

  const copy = () => {
    navigator.clipboard.writeText(note);
    setCopied(true);
    trackEvent("notepad_copy", { tool: "notepad" });
    setTimeout(() => setCopied(false), 1500);
  };

  const clear = () => setNote("");

  return (
    <>
      <SEO title="Note Pad - AUQAB Tools" description="A simple browser notepad." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📝 Note Pad</h1>
          <p className="tool-description">Write and save notes locally.</p>
          <textarea rows="12" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Start typing..." />
          <div style={{ display: "flex", gap: 15, justifyContent: "center", marginTop: 15 }}>
            <button className="generate" onClick={copy}>{copied ? "✅ Copied!" : "📋 Copy"}</button>
            <button className="clear-btn" onClick={clear}>✕ Clear</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotePad;
