import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function DNSLookup() {
  const [domain, setDomain] = useState("");
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!domain) return;
    setLoading(true);
    try {
      const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`);
      const data = await res.json();
      setRecords(data.Answer || []);
      trackEvent("dns_lookup", { tool: "dns_lookup" });
    } catch {
      setRecords([]);
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="DNS Lookup - AUQAB Tools" description="Retrieve DNS records for any domain." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📚 DNS Lookup</h1>
          <p className="tool-description">Fetch A, AAAA, CNAME, and other DNS records.</p>
          <input type="text" placeholder="example.com" value={domain} onChange={(e) => setDomain(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={lookup} disabled={loading}>
            {loading ? "⏳ Looking up..." : "🔎 Lookup"}
          </button>
          {records && (
            <div className="ssl-result">
              {records.length > 0 ? records.map((r, i) => (
                <p key={i}><strong>{r.type}</strong>: {r.data} (TTL: {r.TTL})</p>
              )) : <p>No records found.</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default DNSLookup;
