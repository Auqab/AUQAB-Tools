import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [copied, setCopied] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result);
      trackEvent("image_to_base64", { tool: "image_to_base64" });
    };
    reader.readAsDataURL(file);
  };

  const copyBase64 = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <SEO title="Image to Base64 - AUQAB Tools" description="Convert any image to Base64 data URI online." />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔣 Image to Base64</h1>
          <p className="tool-description">Upload an image and get its Base64 data URI instantly.</p>

          <input type="file" accept="image/*" onChange={handleImage} className="file-input" />

          {base64 && (
            <div className="base64-result">
              <img src={base64} alt="preview" className="scanner-media" />
              <textarea readOnly rows="6" value={base64} />
              <button className="generate" onClick={copyBase64}>
                {copied ? "✅ Copied!" : "📋 Copy Base64"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ImageToBase64;
