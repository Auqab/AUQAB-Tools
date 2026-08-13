import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [decimal, setDecimal] = useState(false);
  const [results, setResults] = useState([]);

  const generate = () => {
    const nums = [];
    for (let i = 0; i < count; i++) {
      const range = max - min;
      let rand = Math.random() * range + min;
      if (!decimal) rand = Math.floor(rand);
      else rand = rand.toFixed(2);
      nums.push(rand);
    }
    setResults(nums);
    showToast("Numbers generated!");
    trackEvent("random_number", { tool: "random_number_generator" });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join(", "));
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="Random Number Generator - AUQAB Tools"
        description="Generate random numbers within a range."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Random Number Generator</h1>
          <p className="tool-description">
            Pick a range, choose count, and get random numbers instantly.
          </p>

          <div className="random-fields">
            <div className="cron-field">
              <label>Min</label>
              <input type="number" value={min} onChange={(e) => setMin(+e.target.value)} />
            </div>
            <div className="cron-field">
              <label>Max</label>
              <input type="number" value={max} onChange={(e) => setMax(+e.target.value)} />
            </div>
            <div className="cron-field">
              <label>Count</label>
              <input type="number" min="1" max="20" value={count} onChange={(e) => setCount(+e.target.value)} />
            </div>
          </div>

          <label className="checkbox-option" style={{ justifyContent: "center", margin: "15px 0" }}>
            <input type="checkbox" checked={decimal} onChange={(e) => setDecimal(e.target.checked)} />
            Include decimals
          </label>

          <button className="generate" onClick={generate}>Generate</button>

          {results.length > 0 && (
            <div className="random-results">
              <div className="uuid-list">
                {results.map((n, i) => (
                  <div key={i} className="uuid-row">
                    <code>{n}</code>
                  </div>
                ))}
              </div>
              <button className="generate" onClick={copyAll}>Copy All</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default RandomNumberGenerator;
