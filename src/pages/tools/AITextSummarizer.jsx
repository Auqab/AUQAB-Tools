import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function AITextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!text) {
      showToast("Please paste text to summarize.", "error");
      return;
    }
    setLoading(true);
    setSummary("");
    try {
      // نستخدم خدمة تلخيص مجانية بدون مفتاح (يمكن استبدالها لاحقاً)
      const res = await fetch("https://api.meaningcloud.com/summarize-2.0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          key: "YOUR_MEANINGCLOUD_KEY", // استبدل بمفتاحك المجاني
          txt: text,
          sentences: "5",
        }),
      });
      const data = await res.json();
      setSummary(data.summary || "Could not generate summary.");
      showToast("Summarization complete!");
      trackEvent("ai_summarize", { tool: "ai_text_summarizer" });
    } catch {
      showToast("Summarization failed.", "error");
    }
    setLoading(false);
  };

  const copySummary = () => {
    if (!summary || summary.startsWith("Could not")) return;
    navigator.clipboard.writeText(summary);
    showToast("Summary copied!");
  };

  return (
    <>
      <SEO
        title="AI Text Summarizer - AUQAB Tools"
        description="Summarize long texts with AI."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>AI Text Summarizer</h1>
          <p className="tool-description">Paste a long article and get a short summary.</p>

          <textarea
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text to summarize..."
          />
          <button className="generate" style={{ margin: "15px 0" }} onClick={summarize} disabled={loading}>
            {loading ? "Summarizing..." : "Summarize"}
          </button>

          {summary && (
            <div className="converter-result">
              <h3>Summary</h3>
              <p>{summary}</p>
              <button className="open-tool-btn" onClick={copySummary}>
                Copy Summary
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AITextSummarizer;
