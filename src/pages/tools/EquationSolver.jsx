import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function EquationSolver() {
  const [equation, setEquation] = useState("x^2 + 2*x + 1 = 0");
  const [solution, setSolution] = useState("");

  const resolve = async () => {
    setSolution("");
    if (!equation) return;

    try {
      const math = await import("mathjs");
      const parts = equation.split("=");
      const left = parts[0].trim();
      const right = parts[1]?.trim() || "0";
      const expr = math.parse(`(${left}) - (${right})`);
      const roots = math.solve(expr, "x");
      setSolution(Array.isArray(roots) ? roots.join(", ") : String(roots));
      showToast("Solved!");
      trackEvent("equation_solve", { tool: "equation_solver" });
    } catch {
      setSolution("Error: Invalid equation.");
      showToast("Invalid equation", "error");
    }
  };

  return (
    <>
      <SEO
        title="Equation Solver - AUQAB Tools"
        description="Solve algebraic equations online."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Equation Solver</h1>
          <p className="tool-description">Enter an equation like x^2 + 2*x + 1 = 0.</p>

          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            className="url-input"
            placeholder="x^2 + 2*x + 1 = 0"
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={resolve}>
            Solve
          </button>

          {solution && (
            <div className="converter-result">
              <h2>Solution:</h2>
              <p className="result-value">{solution}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default EquationSolver;
