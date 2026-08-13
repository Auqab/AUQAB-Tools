import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");

  const calc = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) {
      showToast("Please enter valid weight and height.", "error");
      return;
    }
    const val = (w / (h * h)).toFixed(1);
    setBmi(val);
    showToast("BMI calculated!");
    trackEvent("bmi_calculate", { tool: "bmi_calculator" });
  };

  const copyResult = () => {
    if (!bmi) return;
    navigator.clipboard.writeText(bmi);
    showToast("BMI copied!");
  };

  return (
    <>
      <SEO
        title="BMI Calculator - AUQAB Tools"
        description="Calculate your Body Mass Index."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>BMI Calculator</h1>
          <p className="tool-description">Calculate your Body Mass Index.</p>

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="url-input"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="url-input"
            style={{ marginTop: 10 }}
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={calc}>
            Calculate BMI
          </button>

          {bmi && (
            <div className="converter-result">
              <h2>Your BMI: {bmi}</h2>
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

export default BMICalculator;
