import { useState } from "react";
import { evaluate } from "mathjs";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function ScientificCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    try {
      const res = evaluate(expression);
      setResult(String(res));
      trackEvent("calculator", { tool: "scientific_calculator" });
    } catch {
      setResult("Error");
    }
  };

  const addToExpression = (value) => setExpression((prev) => prev + value);
  const clear = () => { setExpression(""); setResult(""); };

  return (
    <>
      <SEO title="Scientific Calculator - AUQAB Tools" description="Online calculator with advanced functions." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔢 Scientific Calculator</h1>
          <p className="tool-description">Enter any mathematical expression.</p>
          <div className="calc-display">
            <input type="text" value={expression} readOnly className="url-input" />
            <h2>= {result}</h2>
          </div>
          <div className="calc-buttons">
            {["sin(","cos(","tan(","log(","sqrt(","π","(",")","/","*","-","+","7","8","9","4","5","6","1","2","3","0",".","C","="].map((btn) => (
              <button key={btn} className="calc-btn" onClick={() => {
                if (btn === "C") clear();
                else if (btn === "=") calculate();
                else addToExpression(btn);
              }}>{btn}</button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ScientificCalculator;
