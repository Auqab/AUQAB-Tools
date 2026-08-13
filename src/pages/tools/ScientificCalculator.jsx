import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function ScientificCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const calculate = async () => {
    if (!expression) return;
    try {
      const math = await import("mathjs");
      const res = math.evaluate(expression);
      setResult(String(res));
      showToast("Calculation complete!");
      trackEvent("calculator", { tool: "scientific_calculator" });
    } catch {
      setResult("Error");
      showToast("Invalid expression", "error");
    }
  };

  const addToExpression = (value) => setExpression((prev) => prev + value);
  const clear = () => {
    setExpression("");
    setResult("");
  };

  const copyResult = () => {
    if (!result || result === "Error") return;
    navigator.clipboard.writeText(result);
    showToast("Result copied!");
  };

  return (
    <>
      <SEO
        title="Scientific Calculator - AUQAB Tools"
        description="Online calculator with advanced functions."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Scientific Calculator</h1>
          <p className="tool-description">Enter any mathematical expression.</p>

          <div className="calc-display">
            <input
              type="text"
              value={expression}
              readOnly
              className="url-input"
              placeholder="Expression"
            />
            <h2>= {result}</h2>
            {result && result !== "Error" && (
              <button className="open-tool-btn" onClick={copyResult}>
                Copy Result
              </button>
            )}
          </div>

          <div className="calc-buttons">
            {[
              "sin(", "cos(", "tan(", "log(", "sqrt(",
              "π", "(", ")", "/", "*", "-", "+",
              "7", "8", "9", "4", "5", "6",
              "1", "2", "3", "0", ".", "C", "="
            ].map((btn) => (
              <button
                key={btn}
                className="calc-btn"
                onClick={() => {
                  if (btn === "C") clear();
                  else if (btn === "=") calculate();
                  else addToExpression(btn);
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ScientificCalculator;
