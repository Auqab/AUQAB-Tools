import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function generateUUID() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function UUIDGenerator() {
  const [uuids, setUuids] = useState([generateUUID()]);
  const [count, setCount] = useState(1);

  const generateNew = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
    showToast("UUIDs generated!");
    trackEvent("uuid_generate", { tool: "uuid_generator", count });
  };

  const copySingle = (uuid) => {
    navigator.clipboard.writeText(uuid);
    showToast("UUID copied!");
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    showToast("All UUIDs copied!");
  };

  return (
    <>
      <SEO
        title="Free UUID/GUID Generator - AUQAB Tools"
        description="Generate random UUIDs (GUIDs) online instantly. Copy individual or batch UUIDs for your projects."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>UUID / GUID Generator</h1>
          <p className="tool-description">
            Generate random UUIDs (v4) instantly. Perfect for developers, APIs, and database keys.
          </p>

          <div className="uuid-controls">
            <div className="setting">
              <label>
                Number of UUIDs: <strong>{count}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </div>
            <button className="generate" onClick={generateNew}>
              Generate {count > 1 ? `${count} UUIDs` : "UUID"}
            </button>
          </div>

          <div className="uuid-list">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="uuid-row">
                <code>{uuid}</code>
                <button className="copy-btn-mini" onClick={() => copySingle(uuid)}>
                  Copy
                </button>
              </div>
            ))}
          </div>

          {uuids.length > 1 && (
            <button className="generate" onClick={copyAll} style={{ marginTop: 15 }}>
              Copy All UUIDs
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default UUIDGenerator;
