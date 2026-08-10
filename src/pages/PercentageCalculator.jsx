import { useState } from "react";
import SEO from "../components/SEO";

function PercentageCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");

  const calc = (mode) => {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;
    if (mode === "percent") setResult(`${((x / y) * 100).toFixed(2)}%`);
    else if (mode === "value") setResult(`${(x * y / 100).toFixed(2)}`);
  };

  return (
    <>
      <SEO title="Percentage Calculator - AUQAB Tools" description="Calculate percentages easily." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📊 Percentage Calculator</h1>
          <input type="number" placeholder="Value" value={a} onChange={(e) => setA(e.target.value)} className="url-input" />
          <input type="number" placeholder="Total / Percent" value={b} onChange={(e) => setB(e.target.value)} className="url-input" style={{ marginTop: 10 }} />
          <div style={{ display: "flex", gap: 15, justifyContent: "center", marginTop: 15 }}>
            <button className="generate" onClick={() => calc("percent")}>% of total</button>
            <button className="generate" onClick={() => calc("value")}>% value</button>
          </div>
          {result && <h2 style={{ color: "#38bdf8", marginTop: 15 }}>{result}</h2>}
        </div>
      </section>
    </>
  );
}

export default PercentageCalculator;
