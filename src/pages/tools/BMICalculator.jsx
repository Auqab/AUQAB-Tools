import { useState } from "react";
import SEO from "../../components/SEO";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");

  const calc = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    const val = (w / (h * h)).toFixed(1);
    setBmi(val);
  };

  return (
    <>
      <SEO title="BMI Calculator - AUQAB Tools" description="Calculate your Body Mass Index." />
      <section className="tool-page">
        <div className="password-card">
          <h1>⚖️ BMI Calculator</h1>
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="url-input" />
          <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="url-input" style={{ marginTop: 10 }} />
          <button className="generate" style={{ margin: "15px 0" }} onClick={calc}>Calculate BMI</button>
          {bmi && <h2 style={{ color: "#38bdf8" }}>Your BMI: {bmi}</h2>}
        </div>
      </section>
    </>
  );
}

export default BMICalculator;
