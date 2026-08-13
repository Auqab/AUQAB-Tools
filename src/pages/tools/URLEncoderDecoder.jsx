import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function URLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const convert = () => {
    try {
      const result = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
      setOutput(result);
      showToast("Conversion complete!");
      trackEvent("url_encode", { tool: "url_encoder", mode });
    } catch {
      setOutput("Invalid input.");
      showToast("Invalid input", "error");
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
        title="URL Encoder/Decoder - AUQAB Tools"
        description="Encode or decode URL strings."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>URL Encoder / Decoder</h1>
          <p className="tool-description">Convert text to URL-safe format and back.</p>

          <div className="diff-mode">
            <label>
              <input
                type="radio"
                value="encode"
                checked={mode === "encode"}
                onChange={() => setMode("encode")}
              />
              Encode
            </label>
            <label>
              <input
                type="radio"
                value="decode"
                checked={mode === "decode"}
                onChange={() => setMode("decode")}
              />
              Decode
            </label>
          </div>

          <textarea
            rows="4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or URL..."
          />
          <button className="generate" style={{ margin: "15px 0" }} onClick={convert}>
            Convert
          </button>

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

export default URLEncoderDecoder;
