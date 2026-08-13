import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function NotePad() {
  const [note, setNote] = useState(() => localStorage.getItem("notepad") || "");

  useEffect(() => {
    localStorage.setItem("notepad", note);
  }, [note]);

  const copy = () => {
    if (!note) return;
    navigator.clipboard.writeText(note);
    showToast("Note copied!");
    trackEvent("notepad_copy", { tool: "notepad" });
  };

  const clear = () => {
    setNote("");
    showToast("Note cleared");
  };

  return (
    <>
      <SEO
        title="Note Pad - AUQAB Tools"
        description="A simple browser notepad."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Note Pad</h1>
          <p className="tool-description">Write and save notes locally in your browser.</p>

          <textarea
            rows="12"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Start typing..."
          />

          <div style={{ display: "flex", gap: 15, justifyContent: "center", marginTop: 15 }}>
            <button className="generate" style={{ width: "auto" }} onClick={copy}>
              Copy
            </button>
            <button className="clear-btn" style={{ marginLeft: 0 }} onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotePad;
