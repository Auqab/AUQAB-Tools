import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

const morseMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", 1: ".----", 2: "..---", 3: "...--",
  4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----", " ": "/"
};

const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

function MorseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const toMorse = () => {
    setOutput(input.toUpperCase().split("").map((c) => morseMap[c] || c).join(" "));
    trackEvent("morse_encode", { tool: "morse_converter" });
  };

  const fromMorse = () => {
    setOutput(input.split(" ").map((c) => reverseMorse[c] || c).join(""));
    trackEvent("morse_decode", { tool: "morse_converter" });
  };

  return (
    <>
      <SEO title="Morse Code Converter - AUQAB Tools" description="Convert text to Morse code and back." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🆘 Morse Code Converter</h1>
          <textarea rows="4" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text or Morse code..." />
          <div style={{ display: "flex", gap: 15, justifyContent: "center", margin: "15px 0" }}>
            <button className="generate" onClick={toMorse}>🔠 To Morse</button>
            <button className="generate" onClick={fromMorse}>🔢 From Morse</button>
          </div>
          {output && <textarea rows="4" readOnly value={output} />}
        </div>
      </section>
    </>
  );
}

export default MorseConverter;
