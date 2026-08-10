import { useState } from "react";
import CryptoJS from "crypto-js";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

const ALGOS = ["MD5", "SHA1", "SHA256", "SHA512"];

function HashGenerator() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState("SHA256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!text) return;
    let result = "";
    switch (algo) {
      case "MD5": result = CryptoJS.MD5(text).toString(); break;
      case "SHA1": result = CryptoJS.SHA1(text).toString(); break;
      case "SHA256": result = CryptoJS.SHA256(text).toString(); break;
      case "SHA512": result = CryptoJS.SHA512(text).toString(); break;
    }
    setHash(result);
    trackEvent("hash_generate", { tool: "hash_generator", algo });
  };

  const copy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <SEO
        title="Hash Generator - AUQAB Tools"
        description="Generate MD5, SHA1, SHA256, SHA512 hashes online."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔐 Hash Generator</h1>
          <p className="tool-description">Enter text and choose an algorithm to compute the hash.</p>

          <textarea
            rows="4"
            placeholder="Text to hash..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="hash-options">
            <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
              {ALGOS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <button className="generate" onClick={generate}>🔒 Generate Hash</button>
          </div>

          {hash && (
            <div className="hash-result">
              <div className="uuid-row">
                <code>{hash}</code>
                <button className="copy-btn-mini" onClick={copy}>
                  {copied ? "✅" : "📋"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HashGenerator;
