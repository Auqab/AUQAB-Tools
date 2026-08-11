import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function SSLChecker() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkSSL = async () => {
    if (!domain) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      // نستخدم CORS proxy عام للوصول إلى SSL Checker API
      const proxy = "https://corsproxy.io/?"; // وكيل مجاني
      const apiUrl = `https://ssl-checker.io/api/v1/check/${encodeURIComponent(domain)}`;
      const res = await fetch(proxy + encodeURIComponent(apiUrl));
      if (!res.ok) throw new Error("Failed to fetch SSL data");
      const data = await res.json();
      setResult(data);
      trackEvent("ssl_check", { tool: "ssl_checker" });
    } catch (e) {
      setError("Could not check SSL. Make sure the domain is correct and you are online.");
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <>
      <SEO
        title="SSL Checker - AUQAB Tools"
        description="Check SSL certificate details for any domain."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔒 SSL Checker</h1>
          <p className="tool-description">Enter a domain to inspect its SSL certificate.</p>

          <input
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="url-input"
          />
          <button className="generate" style={{ margin: "15px 0" }} onClick={checkSSL} disabled={loading}>
            {loading ? "⏳ Checking..." : "🔍 Check SSL"}
          </button>

          {error && <div className="json-error">{error}</div>}

          {result && (
            <div className="ssl-result">
              <h3>{result.domain || domain}</h3>
              <ul>
                <li><strong>Issuer:</strong> {result.issuer?.organization || "N/A"}</li>
                <li><strong>Valid from:</strong> {formatDate(result.validFrom)}</li>
                <li><strong>Valid to:</strong> {formatDate(result.validTo)}</li>
                <li><strong>Days left:</strong> {result.daysRemaining ?? "N/A"}</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SSLChecker;
