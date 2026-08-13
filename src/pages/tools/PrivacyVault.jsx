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

  const encrypt = (text) => CryptoJS.AES.encrypt(text, masterKey).toString();

  const decrypt = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, masterKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return "[Cannot decrypt]";
    }
  };

  const addEntry = () => {
    if (!newLabel || !newSecret || !masterKey) {
      showToast("Please fill in all fields and master password.", "error");
      return;
    }
    const encrypted = encrypt(newSecret);
    setVault([...vault, { id: Date.now(), label: newLabel, secret: encrypted }]);
    setNewLabel("");
    setNewSecret("");
    showToast("Entry saved!");
    trackEvent("vault_add", { tool: "privacy_vault" });
  };

  const removeEntry = (id) => {
    setVault(vault.filter((e) => e.id !== id));
    showToast("Entry removed");
  };

  const clearVault = () => {
    if (window.confirm("Delete all entries?")) {
      setVault([]);
      showToast("Vault cleared");
    }
  };

  const copySecret = (ciphertext) => {
    const decrypted = decrypt(ciphertext);
    if (decrypted.startsWith("[Cannot")) {
      showToast("Unable to decrypt with current key", "error");
      return;
    }
    navigator.clipboard.writeText(decrypted);
    showToast("Secret copied!");
  };

  const unlock = () => {
    if (!masterKey) {
      showToast("Please enter master password.", "error");
      return;
    }
    setShowEntries(true);
  };

  const lock = () => {
    setShowEntries(false);
  };

  return (
    <>
      <SEO
        title="Privacy Vault - AUQAB Tools"
        description="Encrypt and store your private notes or passwords securely."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Privacy Vault</h1>
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
              <button className="generate" style={{ margin: "15px 0" }} onClick={unlock}>
                Unlock Vault
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
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
                  Add Entry
                </button>
              </div>

              {vault.length > 0 ? (
                <div className="uuid-list">
                  {vault.map((entry) => (
                    <div key={entry.id} className="uuid-row" style={{ justifyContent: "space-between" }}>
                      <span style={{ flex: 1, textAlign: "left" }}>
                        <strong>{entry.label}</strong>: ••••••••••
                      </span>
                      <button className="copy-btn-mini" onClick={() => copySecret(entry.secret)}>
                        Copy
                      </button>
                      <button className="copy-btn-mini" onClick={() => removeEntry(entry.id)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#94a3b8" }}>No entries yet. Add your first secret.</p>
              )}

              <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center" }}>
                <button className="clear-btn" style={{ marginLeft: 0 }} onClick={clearVault}>
                  Clear Vault
                </button>
                <button className="clear-btn" style={{ marginLeft: 0 }} onClick={lock}>
                  Lock
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
