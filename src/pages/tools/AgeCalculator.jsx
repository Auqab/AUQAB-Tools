import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function AgeCalculator() {
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState("");

  const calc = () => {
    if (!birth) {
      showToast("Please enter your birth date.", "error");
      return;
    }
    const today = new Date();
    const dob = new Date(birth);
    let years = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      years--;
    }
    setAge(years);
    showToast("Age calculated!");
    trackEvent("age_calculate", { tool: "age_calculator" });
  };

  const copyAge = () => {
    if (age === "") return;
    navigator.clipboard.writeText(String(age));
    showToast("Age copied!");
  };

  return (
    <>
      <SEO
        title="Age Calculator - AUQAB Tools"
        description="Calculate your exact age."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Age Calculator</h1>
          <p className="tool-description">Enter your birth date to calculate your age.</p>

          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="url-input"
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={calc}>
            Calculate Age
          </button>

          {age !== "" && (
            <div className="converter-result">
              <h2>You are {age} years old</h2>
              <button className="open-tool-btn" onClick={copyAge}>
                Copy Age
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AgeCalculator;
