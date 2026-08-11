import { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function GraphPlotter() {
  const [func, setFunc] = useState("Math.sin(x)");
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const plot = () => {
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    const data = [];
    for (let i = -10; i <= 10; i += 0.2) {
      try {
        const y = eval(func.replace(/x/g, `(${i})`));
        data.push({ x: i, y });
      } catch {}
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
    trackEvent("graph_plot", { tool: "graph_plotter" });
  };

  return (
    <>
      <SEO title="Graph Plotter - AUQAB Tools" description="Plot mathematical functions online." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📈 Graph Plotter</h1>
          <p className="tool-description">Enter a function of x (e.g. Math.sin(x), x*x).</p>
          <input value={func} onChange={(e) => setFunc(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={plot}>📈 Plot</button>
          <canvas ref={canvasRef} style={{ borderRadius: 15, background: "#0f172a" }} />
        </div>
      </section>
    </>
  );
}

export default GraphPlotter;
