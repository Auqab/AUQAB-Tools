import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

// تحويل عدد صحيح إلى روماني
function toRoman(num) {
  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let result = "";
  for (const [value, numeral] of map) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

// تحويل روماني إلى عدد صحيح
function fromRoman(str) {
  const map = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const current = map[str[i]];
    const next = map[str[i + 1]];
    if (next > current) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }
  return result;
}

function RomanNumerals() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("toRoman");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    if (!input.trim()) return;
    try {
      if (mode === "toRoman") {
        const num = parseInt(input, 10);
        if (isNaN(num) || num < 1 || num > 3999) {
          setError("Enter a number between 1 and 3999.");
          showToast("Invalid number", "error");
          return;
        }
        setOutput(toRoman(num));
      } else {
        const roman = input.toUpperCase().trim();
        if (!/^[MDCLXVI]+$/i.test(roman)) {
          setError("Invalid Roman numeral.");
          showToast("Invalid Roman numeral", "error");
          return;
        }
        setOutput(fromRoman(roman).toString());
      }
      showToast("Conversion complete!");
      trackEvent("roman_convert", { tool: "roman_numerals", mode });
    } catch {
      setError("Conversion error.");
      showToast("Conversion error", "error");
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="Roman Numerals Converter - AUQAB Tools"
        description="Convert numbers to Roman numerals and vice versa."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Roman Numerals Converter</h1>
          <p className="tool-description">Convert between Arabic numbers and Roman numerals.</p>

          <div className="diff-mode">
            <label>
              <input type="radio" value="toRoman" checked={mode === "toRoman"} onChange={() => setMode("toRoman")} />
              Number to Roman
            </label>
            <label>
              <input type="radio" value="fromRoman" checked={mode === "fromRoman"} onChange={() => setMode("fromRoman")} />
              Roman to Number
            </label>
          </div>

          <input
            type="text"
            placeholder={mode === "toRoman" ? "e.g. 2024" : "e.g. MMXXIV"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="url-input"
            style={{ margin: "15px 0" }}
          />

          <button className="generate" onClick={convert}>
            Convert
          </button>

          {error && <div className="json-error">{error}</div>}

          {output && (
            <div className="converter-result" style={{ marginTop: 20 }}>
              <h2>{output}</h2>
              <button className="open-tool-btn" onClick={copyOutput}>Copy Result</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default RomanNumerals;
