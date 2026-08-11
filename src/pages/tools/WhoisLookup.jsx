import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function WhoisLookup() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!domain) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.hackertarget.com/whois/?q=${encodeURIComponent(domain)}`);
      const text = await res.text();
      setResult(text);
      trackEvent("whois_lookup", { tool: "whois_lookup" });
    } catch {
      setResult("Lookup failed.");
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Whois Lookup - AUQAB Tools" description="Check domain registration details." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📋 Whois Lookup</h1>
          <p className="tool-description">Enter a domain to view its registration record.</p>
          <input type="text" placeholder="example.com" value={domain} onChange={(e) => setDomain(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={lookup} disabled={loading}>
            {loading ? "⏳ Checking..." : "🔍 Whois Lookup"}
          </button>
          {result && (
            <textarea rows="12" readOnly value={result} style={{ width: "100%", background: "#111", color: "#fff", borderRadius: 12, padding: 15 }} />
          )}
        </div>
      </section>
    </>
  );
}

export default WhoisLookup;
