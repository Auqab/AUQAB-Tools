import { useState } from "react";
import * as math from "mathjs";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function EquationSolver() {
  const [equation, setEquation] = useState("x^2 + 2*x + 1 = 0");
  const [solution, setSolution] = useState("");

  const resolve = () => {
    try {
      const parts = equation.split("=");
      const left = parts[0].trim();
      const right = parts[1]?.trim() || "0";
      const expr = math.parse(`(${left}) - (${right})`);
      const roots = math.solve(expr, "x");
      setSolution(Array.isArray(roots) ? roots.join(", ") : String(roots));
      trackEvent("equation_solve", { tool: "equation_solver" });
    } catch {
      setSolution("Error: Invalid equation.");
    }
  };

  return (
    <>
      <SEO title="Equation Solver - AUQAB Tools" description="Solve algebraic equations online." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🧮 Equation Solver</h1>
          <p className="tool-description">Enter an equation like x^2 + 2*x + 1 = 0.</p>
          <input value={equation} onChange={(e) => setEquation(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={resolve}>⚡ Solve</button>
          {solution && <h2 style={{ color: "#38bdf8" }}>Solution: {solution}</h2>}
        </div>
      </section>
    </>
  );
}

export default EquationSolver;
