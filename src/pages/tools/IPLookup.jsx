import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function IPLookup() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!ip) return;
    setLoading(true);
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const result = await res.json();
      setData(result);
      trackEvent("ip_lookup", { tool: "ip_lookup" });
    } catch {
      setData({ error: "Lookup failed." });
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="IP Lookup - AUQAB Tools" description="Get detailed information about any IP address." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🌍 IP Lookup</h1>
          <p className="tool-description">Enter an IP address to see its geographic location and ISP.</p>
          <input type="text" placeholder="e.g. 8.8.8.8" value={ip} onChange={(e) => setIp(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={lookup} disabled={loading}>
            {loading ? "⏳ Looking up..." : "🔍 Lookup IP"}
          </button>
          {data && !data.error && (
            <div className="ssl-result">
              <ul>
                <li><strong>IP:</strong> {data.ip}</li>
                <li><strong>City:</strong> {data.city}</li>
                <li><strong>Region:</strong> {data.region}</li>
                <li><strong>Country:</strong> {data.country_name} ({data.country})</li>
                <li><strong>ISP:</strong> {data.org}</li>
              </ul>
            </div>
          )}
          {data?.error && <div className="json-error">{data.error}</div>}
        </div>
      </section>
    </>
  );
}

export default IPLookup;
