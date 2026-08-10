import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function AITextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.meaningcloud.com/summarize-2.0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          key: "YOUR_MEANINGCLOUD_KEY", // سنستبدلها لاحقاً بمفتاح مجاني أو نستخدم بديلاً
          txt: text,
          sentences: "5",
        }),
      });
      const data = await res.json();
      setSummary(data.summary || "Could not generate summary.");
      trackEvent("ai_summarize", { tool: "ai_summarizer" });
    } catch {
      alert("Summarization failed.");
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="AI Text Summarizer - AUQAB Tools" description="Summarize long texts with AI." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📝 AI Text Summarizer</h1>
          <p className="tool-description">Paste a long article and get a short summary.</p>
          <textarea rows="8" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text to summarize..." />
          <button className="generate" style={{ margin: "15px 0" }} onClick={summarize} disabled={loading}>
            {loading ? "Summarizing..." : "✨ Summarize"}
          </button>
          {summary && (
            <div className="converter-result">
              <h3>Summary</h3>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AITextSummarizer;
