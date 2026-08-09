import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });

  // توليد كلمة المرور
  function generatePassword() {
    let chars = "";
    if (options.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+{}[]";

    if (!chars) {
      setPassword("");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(result);
    trackEvent("password_generate", { tool: "password_generator" });
    setCopied(false);
  }

  // توليد أولي
  useEffect(() => {
    generatePassword();
  }, []);

  // نسخ كلمة المرور
  function copyPassword() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    trackEvent("password_copy", { tool: "password_generator" });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // تصنيف القوة
  function getStrength() {
    if (!password) return { label: "None", level: 0 };
    const types = [options.upper, options.lower, options.numbers, options.symbols].filter(Boolean).length;
    if (length < 8 || types < 3) return { label: "Weak", level: 25 };
    if (length < 14 || types < 4) return { label: "Medium", level: 60 };
    return { label: "Strong", level: 100 };
  }

  const strength = getStrength();

  return (
    <>
      <SEO
        title="Free Password Generator - Create Strong Secure Passwords"
        description="Generate strong random passwords online with AUQAB Password Generator. Customize length and characters."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔐 Password Generator</h1>
          <p className="tool-description">
            Create strong and secure random passwords instantly.
            Customize length and characters to generate safer passwords.
          </p>

          {/* عرض كلمة المرور */}
          <div className="password-result">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              placeholder="Your secure password"
            />
            <button
              className="icon-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            <button className="icon-btn copy-btn" onClick={copyPassword}>
              {copied ? "✅" : "📋"}
            </button>
          </div>

          {/* شريط القوة */}
          {password && (
            <div className="strength-section">
              <div className="strength-bar-bg">
                <div
                  className={`strength-bar-fill ${strength.label.toLowerCase()}`}
                  style={{ width: `${strength.level}%` }}
                />
              </div>
              <span className={`strength-label ${strength.label.toLowerCase()}`}>
                {strength.label}
              </span>
            </div>
          )}

          {/* شريط الطول */}
          <div className="setting">
            <label>
              Password Length: <strong>{length}</strong>
            </label>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>4</span>
              <span>32</span>
            </div>
          </div>

          {/* خيارات الأحرف */}
          <div className="checks">
            <label className="check-label">
              <input
                type="checkbox"
                checked={options.upper}
                onChange={() => setOptions({ ...options, upper: !options.upper })}
              />
              <span className="check-text">A-Z Uppercase</span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={options.lower}
                onChange={() => setOptions({ ...options, lower: !options.lower })}
              />
              <span className="check-text">a-z Lowercase</span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={() => setOptions({ ...options, numbers: !options.numbers })}
              />
              <span className="check-text">0-9 Numbers</span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={() => setOptions({ ...options, symbols: !options.symbols })}
              />
              <span className="check-text">!@#$ Symbols</span>
            </label>
          </div>

          {/* زر إعادة التوليد */}
          <button className="generate" onClick={generatePassword}>
            🔄 Generate Password
          </button>

          {/* قسم المعلومات */}
          <div className="info-section">
            <h2>How to create a secure password?</h2>
            <p>1. Choose a suitable password length (12+ recommended).</p>
            <p>2. Enable uppercase, lowercase, numbers and symbols.</p>
            <p>3. Copy and save your generated password securely.</p>

            <h2>Why use AUQAB Password Generator?</h2>
            <ul>
              <li>Free and easy to use</li>
              <li>No registration required</li>
              <li>Generate passwords instantly in your browser</li>
              <li>Your passwords are not stored</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            <h3>Are generated passwords saved?</h3>
            <p>No. Passwords are created locally in your browser and are not stored.</p>
            <h3>What is a strong password?</h3>
            <p>A strong password usually contains a mix of letters, numbers and symbols with enough length.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default PasswordGenerator;
