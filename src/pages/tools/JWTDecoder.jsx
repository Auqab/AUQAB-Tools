import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function JWTDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState("");

  const decode = () => {
    setError("");
    setHeader(null);
    setPayload(null);
    if (!token.trim()) return;

    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format");

      const headerObj = JSON.parse(atob(parts[0]));
      const payloadObj = JSON.parse(atob(parts[1]));

      setHeader(headerObj);
      setPayload(payloadObj);
      showToast("JWT decoded successfully!");
      trackEvent("jwt_decode", { tool: "jwt_debugger" });
    } catch {
      setError("Invalid JWT token. Check the format.");
      showToast("Invalid JWT token", "error");
    }
  };

  const formatJSON = (obj) => JSON.stringify(obj, null, 2);

  const copyJSON = (json) => {
    navigator.clipboard.writeText(json);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="JWT Debugger - AUQAB Tools"
        description="Decode and inspect JWT tokens."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>JWT Debugger</h1>
          <p className="tool-description">Paste a JWT token to decode its header and payload.</p>

          <textarea
            rows="4"
            placeholder="Paste JWT here..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={decode}>
            Decode JWT
          </button>

          {error && <div className="json-error">{error}</div>}

          {header && (
            <div className="jwt-section">
              <h3>Header</h3>
              <textarea readOnly rows="4" value={formatJSON(header)} />
              <button className="copy-btn-mini" onClick={() => copyJSON(formatJSON(header))}>
                Copy Header
              </button>
            </div>
          )}

          {payload && (
            <div className="jwt-section">
              <h3>Payload</h3>
              <textarea readOnly rows="8" value={formatJSON(payload)} />
              <button className="copy-btn-mini" onClick={() => copyJSON(formatJSON(payload))}>
                Copy Payload
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default JWTDecoder;
