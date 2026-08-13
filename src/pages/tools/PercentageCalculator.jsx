import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function PercentageCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");

  const calc = (mode) => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) {
      showToast("Please enter valid numbers.", "error");
      return;
    }
    if (mode === "percent") {
      setResult(`${((x / y) * 100).toFixed(2)}%`);
    } else if (mode === "value") {
      setResult(`${(x * y / 100).toFixed(2)}`);
    }
    showToast("Calculation complete!");
    trackEvent("percentage_calculate", { tool: "percentage_calculator" });
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    showToast("Result copied!");
  };

  return (
    <>
      <SEO
        title="Percentage Calculator - AUQAB Tools"
        description="Calculate percentages easily."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Percentage Calculator</h1>
          <p className="tool-description">Calculate percentages quickly.</p>

          <input
            type="number"
            placeholder="Value"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="url-input"
          />
          <input
            type="number"
            placeholder="Total / Percent"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="url-input"
            style={{ marginTop: 10 }}
          />

          <div style={{ display: "flex", gap: 15, justifyContent: "center", marginTop: 15 }}>
            <button className="generate" style={{ width: "auto" }} onClick={() => calc("percent")}>
              Percent of Total
            </button>
            <button className="minify-btn" onClick={() => calc("value")}>
              Percent Value
            </button>
          </div>

          {result && (
            <div className="converter-result" style={{ marginTop: 20 }}>
              <h2>{result}</h2>
              <button className="open-tool-btn" onClick={copyResult}>
                Copy Result
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PercentageCalculator;
