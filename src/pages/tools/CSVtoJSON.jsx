import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function CSVtoJSON() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState("");

  const convert = async () => {
    setError("");
    setJson("");
    if (!csv.trim()) return;
    try {
      const Papa = (await import("papaparse")).default;
      const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
      if (result.errors.length) {
        setError("Invalid CSV format.");
        return;
      }
      setJson(JSON.stringify(result.data, null, 2));
      trackEvent("csv_to_json", { tool: "csv_to_json" });
    } catch {
      setError("Conversion error.");
    }
  };

  return (
    <>
      <SEO
        title="CSV to JSON Converter - AUQAB Tools"
        description="Convert CSV data to JSON format instantly."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>📊 CSV to JSON</h1>
          <p className="tool-description">Paste CSV data and get a clean JSON output.</p>

          <textarea
            rows="6"
            placeholder="name,age\nAli,25"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
          />
          <button className="generate" style={{ margin: "15px 0" }} onClick={convert}>
            🔄 Convert to JSON
          </button>

          {error && <div className="json-error">{error}</div>}

          {json && (
            <div>
              <textarea rows="10" readOnly value={json} />
              <button
                className="generate"
                onClick={() => {
                  navigator.clipboard.writeText(json);
                  trackEvent("csv_copy_json", { tool: "csv_to_json" });
                }}
              >
                📋 Copy JSON
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CSVtoJSON;
