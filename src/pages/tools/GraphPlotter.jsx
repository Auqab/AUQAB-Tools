import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function GraphPlotter() {
  const [func, setFunc] = useState("Math.sin(x)");
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const plot = async () => {
    setError("");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    try {
      const { default: Chart } = await import("chart.js/auto");

      const data = [];
      for (let i = -10; i <= 10; i += 0.2) {
        try {
          // استخدام Function بدلاً من eval لأمان أفضل
          const fn = new Function("x", `return ${func}`);
          const y = fn(i);
          data.push({ x: i, y });
        } catch {
          // تجاهل القيم غير الصالحة
        }
      }

      if (data.length === 0) {
        showToast("Could not plot this function.", "error");
        return;
      }

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [{
            label: func,
            data,
            borderColor: "#38bdf8",
            borderWidth: 2,
            pointRadius: 0,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { type: "linear", grid: { color: "rgba(255,255,255,0.1)" } },
            y: { grid: { color: "rgba(255,255,255,0.1)" } },
          },
          plugins: { legend: { display: false } },
        }
      });
      showToast("Graph plotted!");
      trackEvent("graph_plot", { tool: "graph_plotter" });
    } catch {
      showToast("Failed to plot. Check the function syntax.", "error");
    }
  };

  return (
    <>
      <SEO
        title="Graph Plotter - AUQAB Tools"
        description="Plot mathematical functions online."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Graph Plotter</h1>
          <p className="tool-description">Enter a function of x (e.g. Math.sin(x), x*x).</p>

          <input
            value={func}
            onChange={(e) => setFunc(e.target.value)}
            className="url-input"
            placeholder="Math.sin(x)"
          />
          <button className="generate" style={{ margin: "15px 0" }} onClick={plot}>
            Plot
          </button>

          {error && <div className="json-error">{error}</div>}

          <canvas
            ref={canvasRef}
            style={{ borderRadius: 15, background: "#0f172a" }}
          />
        </div>
      </section>
    </>
  );
}

export default GraphPlotter;
