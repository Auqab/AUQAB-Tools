import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
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
        showToast("Invalid CSV", "error");
        return;
      }

      setJson(JSON.stringify(result.data, null, 2));
      showToast("Conversion successful!");
      trackEvent("csv_to_json", { tool: "csv_to_json" });
    } catch {
      setError("Conversion error.");
      showToast("Conversion error", "error");
    }
  };

  const copyJSON = () => {
    if (!json) return;
    navigator.clipboard.writeText(json);
    showToast("Copied!");
    trackEvent("csv_copy_json", { tool: "csv_to_json" });
  };

  return (
    <>
      <SEO
        title="CSV to JSON Converter - AUQAB Tools"
        description="Convert CSV data to JSON format instantly."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>CSV to JSON</h1>
          <p className="tool-description">Paste CSV data and get a clean JSON output.</p>

          <textarea
            rows="6"
            placeholder="name,age\nAli,25"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
          />
          <button className="generate" style={{ margin: "15px 0" }} onClick={convert}>
            Convert to JSON
          </button>

          {error && <div className="json-error">{error}</div>}

          {json && (
            <div>
              <textarea rows="10" readOnly value={json} />
              <button className="generate" style={{ marginTop: 10 }} onClick={copyJSON}>
                Copy JSON
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CSVtoJSON;
