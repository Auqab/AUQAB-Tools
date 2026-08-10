import { useState } from "react";
import SEO from "../components/SEO";

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const b = parseFloat(bill);
    if (isNaN(b)) return;
    const tip = (b * tipPercent) / 100;
    const total = b + tip;
    const perPerson = total / people;
    setResult({ tip: tip.toFixed(2), total: total.toFixed(2), each: perPerson.toFixed(2) });
  };

  return (
    <>
      <SEO title="Tip Calculator - AUQAB Tools" description="Split the bill and calculate the tip." />
      <section className="tool-page">
        <div className="password-card">
          <h1>💵 Tip Calculator</h1>
          <input type="number" placeholder="Bill amount" value={bill} onChange={(e) => setBill(e.target.value)} className="url-input" />
          <div style={{ margin: "10px 0" }}>
            <label>Tip: {tipPercent}%</label>
            <input type="range" min="0" max="50" value={tipPercent} onChange={(e) => setTipPercent(+e.target.value)} />
          </div>
          <input type="number" min="1" placeholder="Number of people" value={people} onChange={(e) => setPeople(+e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={calculate}>💰 Calculate</button>
          {result && (
            <div className="ssl-result">
              <p>Tip: ${result.tip}</p>
              <p>Total: ${result.total}</p>
              <p>Each person: ${result.each}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default TipCalculator;
