import { useState } from "react";
import SEO from "../../components/SEO";

function BinaryHexViewer() {
  const [hex, setHex] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const bytes = new Uint8Array(ev.target.result);
      const hexStr = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(" ");
      setHex(hexStr);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <SEO title="Binary/Hex Viewer - AUQAB Tools" description="View file content in hexadecimal." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔢 Binary / Hex Viewer</h1>
          <p className="tool-description">Upload any file to see its hex representation.</p>
          <input type="file" onChange={handleFile} className="file-input" />
          {hex && (
            <textarea rows="10" readOnly value={hex} style={{ marginTop: 15, wordBreak: "break-all" }} />
          )}
        </div>
      </section>
    </>
  );
}

export default BinaryHexViewer;
