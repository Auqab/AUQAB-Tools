import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

const BASES = [
  { label: "Binary (2)", value: 2 },
  { label: "Octal (8)", value: 8 },
  { label: "Decimal (10)", value: 10 },
  { label: "Hexadecimal (16)", value: 16 },
];

function BaseConverter() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [output, setOutput] = useState("");

  const convert = () => {
    if (input === "") { setOutput(""); return; }
    try {
      const decimal = parseInt(input, fromBase);
      if (isNaN(decimal)) throw new Error();
      const converted = decimal.toString(toBase).toUpperCase();
      setOutput(converted);
      trackEvent("base_convert", { tool: "base_converter" });
    } catch {
      setOutput("Invalid input");
    }
  };

  return (
    <>
      <SEO
        title="Number Base Converter - AUQAB Tools"
        description="Convert numbers between binary, octal, decimal, hexadecimal and more."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔢 Number Base Converter</h1>
          <p className="tool-description">Convert numbers between different bases (2, 8, 10, 16).</p>

          <input
            type="text"
            placeholder="Enter number..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="url-input"
          />

          <div className="converter-row">
            <div className="unit-select">
              <label>From base</label>
              <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))}>
                {BASES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
            <span className="swap-icon" onClick={() => { const t = fromBase; setFromBase(toBase); setToBase(t); }}>⇄</span>
            <div className="unit-select">
              <label>To base</label>
              <select value={toBase} onChange={(e) => setToBase(Number(e.target.value))}>
                {BASES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
          </div>

          <button className="generate" style={{ margin: "20px 0" }} onClick={convert}>
            🔄 Convert
          </button>

          {output && (
            <div className="converter-result">
              <h2>{output}</h2>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BaseConverter;
