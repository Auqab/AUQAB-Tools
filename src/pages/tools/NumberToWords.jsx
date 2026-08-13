import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const ones = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const tens = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

function convert(num) {
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num/10)] + (num%10 ? "-" + ones[num%10] : "");
  if (num < 1000) return ones[Math.floor(num/100)] + " hundred" + (num%100 ? " and " + convert(num%100) : "");
  return "Number too large";
}

function NumberToWords() {
  const [num, setNum] = useState("");
  const [words, setWords] = useState("");

  const handleConvert = () => {
    const n = parseInt(num);
    if (isNaN(n)) {
      showToast("Please enter a valid number.", "error");
      return;
    }
    setWords(convert(n));
    showToast("Number converted!");
    trackEvent("number_to_words", { tool: "number_to_words" });
  };

  const copyWords = () => {
    if (!words) return;
    navigator.clipboard.writeText(words);
    showToast("Result copied!");
  };

  return (
    <>
      <SEO
        title="Number to Words - AUQAB Tools"
        description="Convert numbers to English words."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Number to Words</h1>
          <p className="tool-description">Convert a number into its English words representation.</p>

          <input
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            placeholder="e.g. 123"
            className="url-input"
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={handleConvert}>
            Convert
          </button>

          {words && (
            <div className="converter-result">
              <h2>{words}</h2>
              <button className="open-tool-btn" onClick={copyWords}>
                Copy Result
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default NumberToWords;
