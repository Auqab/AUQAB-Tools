import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { QRCodeCanvas } from "qrcode.react";
import { trackEvent } from "../utils/analytics";

function URLShortener() {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [savedLinks, setSavedLinks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auqab_links") || "[]");
    } catch {
      return [];
    }
  });
  const [showQRFor, setShowQRFor] = useState(null);

  // حفظ في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("auqab_links", JSON.stringify(savedLinks));
  }, [savedLinks]);

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

  function addLink() {
    if (!url || !isValidUrl(url)) {
      alert("Please enter a valid URL (including http:// or https://)");
      return;
    }

    const newLink = {
      id: Date.now(),
      original: url,
      label: label || url,
      createdAt: new Date().toLocaleDateString(),
    };

    setSavedLinks((prev) => [newLink, ...prev]);
    setUrl("");
    setLabel("");
    trackEvent("url_save", { tool: "url_manager" });
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  function deleteLink(id) {
    setSavedLinks((prev) => prev.filter((link) => link.id !== id));
  }

  function clearAll() {
    if (confirm("Delete all saved links?")) {
      setSavedLinks([]);
    }
  }

  return (
    <>
      <SEO
        title="URL Manager & QR Generator - AUQAB Tools"
        description="Save your important links, generate QR codes and manage them securely in your browser."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔗 URL Manager</h1>
          <p className="tool-description">
            Save your important links with labels, generate QR codes instantly, and access them anytime.
            All data is stored locally in your browser.
          </p>

          {/* إضافة رابط جديد */}
          <div className="url-form">
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="url-input"
            />
            <input
              type="text"
              placeholder="Label (optional)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="url-label-input"
            />
            <button className="generate" onClick={addLink}>
              💾 Save Link
            </button>
          </div>

          {/* قائمة الروابط المحفوظة */}
          {savedLinks.length > 0 && (
            <div className="url-history">
              <div className="history-header">
                <h2>📋 Saved Links ({savedLinks.length})</h2>
                <button className="clear-btn" onClick={clearAll}>
                  Clear All
                </button>
              </div>

              {savedLinks.map((link) => (
                <div key={link.id} className="url-item">
                  <div className="url-info">
                    <strong>{link.label || link.original}</strong>
                    <p className="url-original">{link.original}</p>
                    <span className="url-date">{link.createdAt}</span>
                  </div>

                  <div className="url-actions">
                    <button
                      className="icon-btn small"
                      onClick={() => copyToClipboard(link.original)}
                      title="Copy original URL"
                    >
                      📋
                    </button>
                    <button
                      className="icon-btn small"
                      onClick={() => window.open(link.original, "_blank")}
                      title="Open in new tab"
                    >
                      ↗️
                    </button>
                    <button
                      className="icon-btn small"
                      onClick={() => setShowQRFor(showQRFor === link.id ? null : link.id)}
                      title="Show QR Code"
                    >
                      🔳
                    </button>
                    <button
                      className="icon-btn small delete"
                      onClick={() => deleteLink(link.id)}
                      title="Delete link"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* QR Code */}
                  {showQRFor === link.id && (
                    <div className="qr-inline">
                      <QRCodeCanvas value={link.original} size={120} />
                      <button
                        className="download-btn small"
                        onClick={() => {
                          const canvas = document.querySelector(`.qr-inline canvas`);
                          if (canvas) {
                            const img = canvas.toDataURL("image/png");
                            const a = document.createElement("a");
                            a.href = img;
                            a.download = "AUQAB-QR.png";
                            a.click();
                          }
                        }}
                      >
                        ⬇ Download QR
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* معلومات */}
          <div className="info-section">
            <h2>How to use URL Manager?</h2>
            <p>1. Paste any URL and add an optional label.</p>
            <p>2. Click "Save Link" to store it in your browser.</p>
            <p>3. Copy, open, or generate QR codes for your saved links.</p>

            <h2>Why use AUQAB URL Manager?</h2>
            <ul>
              <li>Keep your important links organized</li>
              <li>Generate QR codes for any link instantly</li>
              <li>All data stays in your browser (private)</li>
              <li>No account required</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default URLShortener;
