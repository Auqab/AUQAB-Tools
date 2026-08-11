import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function PingTool() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ping = async () => {
    if (!url) return;
    setLoading(true);
    const start = performance.now();
    try {
      await fetch(url, { method: "HEAD", mode: "no-cors" });
      const end = performance.now();
      setResult({ success: true, time: (end - start).toFixed(2) });
      trackEvent("ping", { tool: "ping_tool" });
    } catch (e) {
      setResult({ success: false });
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Ping Tool - AUQAB Tools" description="Check if a website is reachable." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📶 Ping Tool</h1>
          <p className="tool-description">Enter a website URL to test its response time.</p>
          <input type="text" placeholder="https://google.com" value={url} onChange={(e) => setUrl(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={ping} disabled={loading}>
            {loading ? "⏳ Pinging..." : "📡 Ping"}
          </button>
          {result && (
            <div className="converter-result">
              {result.success ? <p>✅ Reachable – Response time: {result.time} ms</p> : <p>❌ Unreachable</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PingTool;
