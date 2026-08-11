import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function generateUUID() {
  // استخدم crypto.randomUUID إن وُجدت، وإلا fallback رياضي
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback (متوافق مع المتصفحات القديمة)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function UUIDGenerator() {
  const [uuids, setUuids] = useState([generateUUID()]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(null);

  const generateNew = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
    setCopied(null);
    trackEvent("uuid_generate", { tool: "uuid_generator", count });
  };

  const copySingle = (uuid, idx) => {
    navigator.clipboard.writeText(uuid);
    setCopied(idx);
    trackEvent("uuid_copy", { tool: "uuid_generator" });
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied("all");
    trackEvent("uuid_copy_all", { tool: "uuid_generator" });
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <SEO
        title="Free UUID/GUID Generator - AUQAB Tools"
        description="Generate random UUIDs (GUIDs) online instantly. Copy individual or batch UUIDs for your projects."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🆔 UUID / GUID Generator</h1>
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
              🔄 Generate {count > 1 ? `${count} UUIDs` : "UUID"}
            </button>
          </div>

          <div className="uuid-list">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="uuid-row">
                <code>{uuid}</code>
                <button
                  className="copy-btn-mini"
                  onClick={() => copySingle(uuid, idx)}
                >
                  {copied === idx ? "✅" : "📋"}
                </button>
              </div>
            ))}
          </div>

          {uuids.length > 1 && (
            <button className="generate" onClick={copyAll} style={{ marginTop: 15 }}>
              {copied === "all" ? "✅ Copied All!" : "📋 Copy All UUIDs"}
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default UUIDGenerator;
