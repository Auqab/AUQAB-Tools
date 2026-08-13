import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function MatrixCalculator() {
  const [m1, setM1] = useState("[[1,2],[3,4]]");
  const [m2, setM2] = useState("[[5,6],[7,8]]");
  const [operation, setOperation] = useState("multiply");
  const [result, setResult] = useState("");

  const compute = async () => {
    setResult("");
    try {
      const math = await import("mathjs");
      const A = math.matrix(JSON.parse(m1));
      const B = math.matrix(JSON.parse(m2));
      let res;
      if (operation === "multiply") res = math.multiply(A, B);
      else if (operation === "add") res = math.add(A, B);
      else if (operation === "inverse") res = math.inv(A);
      setResult(JSON.stringify(res.toArray(), null, 2));
      showToast("Calculation complete!");
      trackEvent("matrix_calc", { tool: "matrix_calculator" });
    } catch {
      setResult("Error: Check matrix format.");
      showToast("Check matrix format", "error");
    }
  };

  const copyResult = () => {
    if (!result || result.startsWith("Error")) return;
    navigator.clipboard.writeText(result);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="Matrix Calculator - AUQAB Tools"
        description="Perform matrix operations online."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Matrix Calculator</h1>
          <p className="tool-description">Enter matrices in JSON format.</p>

          <textarea
            rows="3"
            value={m1}
            onChange={(e) => setM1(e.target.value)}
            placeholder="Matrix A"
          />
          <textarea
            rows="3"
            value={m2}
            onChange={(e) => setM2(e.target.value)}
            placeholder="Matrix B"
          />

          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            style={{ margin: "10px 0", width: "100%" }}
          >
            <option value="multiply">Multiply</option>
            <option value="add">Add</option>
            <option value="inverse">Inverse A</option>
          </select>

          <button className="generate" onClick={compute}>
            Compute
          </button>

          {result && (
            <div style={{ marginTop: 15 }}>
              <textarea rows="5" readOnly value={result} />
              <button className="generate" style={{ marginTop: 10 }} onClick={copyResult}>
                Copy Result
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MatrixCalculator;
