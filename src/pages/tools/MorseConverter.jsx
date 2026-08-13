import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const morseMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....",
  6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----",
  " ": "/"
};

const reverseMorse = Object.fromEntries(
  Object.entries(morseMap).map(([k, v]) => [v, k])
);

function MorseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const toMorse = () => {
    const result = input
      .toUpperCase()
      .split("")
      .map((c) => morseMap[c] || c)
      .join(" ");
    setOutput(result);
    showToast("Converted to Morse code!");
    trackEvent("morse_encode", { tool: "morse_converter" });
  };

  const fromMorse = () => {
    const result = input
      .split(" ")
      .map((c) => reverseMorse[c] || c)
      .join("");
    setOutput(result);
    showToast("Converted from Morse code!");
    trackEvent("morse_decode", { tool: "morse_converter" });
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="Morse Code Converter - AUQAB Tools"
        description="Convert text to Morse code and back."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Morse Code Converter</h1>
          <p className="tool-description">Convert between text and Morse code.</p>

          <textarea
            rows="4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or Morse code..."
          />

          <div style={{ display: "flex", gap: 15, justifyContent: "center", margin: "15px 0" }}>
            <button className="generate" style={{ width: "auto" }} onClick={toMorse}>
              To Morse
            </button>
            <button className="minify-btn" onClick={fromMorse}>
              From Morse
            </button>
          </div>

          {output && (
            <div>
              <textarea rows="4" readOnly value={output} />
              <button className="generate" style={{ marginTop: 10 }} onClick={copyOutput}>
                Copy Result
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MorseConverter;
