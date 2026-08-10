import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function HTTPTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    if (!url) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(url, { method });
      const data = await res.text();
      setResponse(`Status: ${res.status}\n\n${data}`);
      trackEvent("http_request", { tool: "http_tester" });
    } catch (e) {
      setResponse("Request failed. Check URL or CORS policy.");
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="HTTP Request Tester - AUQAB Tools" description="Test HTTP requests and see responses." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🌐 HTTP Request Tester</h1>
          <p className="tool-description">Send GET or POST requests and view the response.</p>

          <input
            type="url"
            placeholder="https://api.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
          />

          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ margin: "10px 0", width: "100%" }}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>

          <button className="generate" onClick={sendRequest} disabled={loading}>
            {loading ? "⏳ Sending..." : "🚀 Send Request"}
          </button>

          {response && (
            <textarea rows="10" readOnly value={response} style={{ marginTop: 15 }} />
          )}
        </div>
      </section>
    </>
  );
}

export default HTTPTester;
