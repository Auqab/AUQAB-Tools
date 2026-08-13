import { useState } from "react";
import CryptoJS from "crypto-js";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function AESEncryption() {
  const [text, setText] = useState("");
  const [secret, setSecret] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encrypt");

  const process = () => {
    if (!text || !secret) return;
    try {
      let result = "";
      if (mode === "encrypt") {
        result = CryptoJS.AES.encrypt(text, secret).toString();
      } else {
        const bytes = CryptoJS.AES.decrypt(text, secret);
        result = bytes.toString(CryptoJS.enc.Utf8);
        if (!result) throw new Error("Invalid key or corrupted ciphertext.");
      }
      setOutput(result);
      showToast(mode === "encrypt" ? "Text encrypted!" : "Text decrypted!");
      trackEvent("aes_process", { tool: "aes_encryption", mode });
    } catch {
      setOutput("Invalid key or corrupted ciphertext.");
      showToast("Operation failed", "error");
    }
  };

  const copyOutput = () => {
    if (!output || output.startsWith("Invalid")) return;
    navigator.clipboard.writeText(output);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="AES Encryption - AUQAB Tools"
        description="Encrypt and decrypt text with AES symmetric encryption."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>AES Encryption</h1>
          <p className="tool-description">Encrypt or decrypt text using a secret passphrase.</p>

          <div className="diff-mode">
            <label>
              <input
                type="radio"
                value="encrypt"
                checked={mode === "encrypt"}
                onChange={() => setMode("encrypt")}
              />
              Encrypt
            </label>
            <label>
              <input
                type="radio"
                value="decrypt"
                checked={mode === "decrypt"}
                onChange={() => setMode("decrypt")}
              />
              Decrypt
            </label>
          </div>

          <textarea
            rows="4"
            placeholder={mode === "encrypt" ? "Text to encrypt..." : "Ciphertext to decrypt..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="text"
            placeholder="Secret passphrase"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="url-input"
            style={{ margin: "15px 0" }}
          />

          <button className="generate" onClick={process}>
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>

          {output && (
            <div className="hash-result" style={{ marginTop: 20 }}>
              <div className="uuid-row">
                <code style={{ wordBreak: "break-all" }}>{output}</code>
                <button className="copy-btn-mini" onClick={copyOutput}>
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AESEncryption;
