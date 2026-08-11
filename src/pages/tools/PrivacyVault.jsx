import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function PrivacyVault() {
  const [vault, setVault] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auqab_vault") || "[]");
    } catch {
      return [];
    }
  });

  const [masterKey, setMasterKey] = useState("");
  const [showEntries, setShowEntries] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newSecret, setNewSecret] = useState("");

  useEffect(() => {
    localStorage.setItem("auqab_vault", JSON.stringify(vault));
  }, [vault]);

  // تشفير البيانات
  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, masterKey).toString();
  };

  // فك التشفير
  const decrypt = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, masterKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return "[Cannot decrypt]";
    }
  };

  // إضافة عنصر جديد
  const addEntry = () => {
    if (!newLabel || !newSecret || !masterKey) return;
    const encrypted = encrypt(newSecret);
    setVault([...vault, { id: Date.now(), label: newLabel, secret: encrypted }]);
    setNewLabel("");
    setNewSecret("");
    showToast("Entry saved!");
    trackEvent("vault_add", { tool: "privacy_vault" });
  };

  // حذف عنصر
  const removeEntry = (id) => {
    setVault(vault.filter((e) => e.id !== id));
    showToast("Entry removed");
  };

  // مسح الخزنة بالكامل
  const clearVault = () => {
    if (confirm("Delete all entries?")) {
      setVault([]);
      showToast("Vault cleared");
    }
  };

  return (
    <>
      <SEO
        title="Privacy Vault - AUQAB Tools"
        description="Encrypt and store your private notes or passwords securely."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔐 Privacy Vault</h1>
          <p className="tool-description">
            Store notes and passwords encrypted with AES. All data stays in your browser.
          </p>

          {!showEntries ? (
            <div>
              <input
                type="password"
                placeholder="Set/enter master password..."
                value={masterKey}
                onChange={(e) => setMasterKey(e.target.value)}
                className="url-input"
              />
              <button
                className="generate"
                style={{ margin: "15px 0" }}
                onClick={() => setShowEntries(true)}
                disabled={!masterKey}
              >
                🔓 Unlock Vault
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                  type="text"
                  placeholder="Label (e.g. Gmail)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="url-input"
                />
                <input
                  type="text"
                  placeholder="Secret..."
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  className="url-input"
                />
                <button className="generate" onClick={addEntry}>
                  ➕ Add
                </button>
              </div>

              {vault.length > 0 ? (
                <div className="uuid-list">
                  {vault.map((entry) => {
                    const decrypted = decrypt(entry.secret);
                    const isVisible = false; // يمكنك إضافة زر للإظهار/الإخفاء لاحقًا
                    return (
                      <div key={entry.id} className="uuid-row" style={{ justifyContent: "space-between" }}>
                        <span>
                          <strong>{entry.label}</strong>: ••••••••••
                        </span>
                        <button
                          className="copy-btn-mini"
                          onClick={() => {
                            navigator.clipboard.writeText(decrypted);
                            showToast("Copied!");
                          }}
                        >
                          📋
                        </button>
                        <button className="copy-btn-mini" onClick={() => removeEntry(entry.id)}>
                          🗑️
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No entries yet. Add your first secret.</p>
              )}

              <div style={{ marginTop: 20 }}>
                <button className="clear-btn" onClick={clearVault}>
                  Clear Vault
                </button>
                <button
                  className="clear-btn"
                  style={{ marginLeft: 10 }}
                  onClick={() => setShowEntries(false)}
                >
                  🔒 Lock
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default PrivacyVault;
