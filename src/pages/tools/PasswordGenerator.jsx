import { useState, useEffect, useCallback } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const PRESETS = {
  basic: { upper: true, lower: true, numbers: true, symbols: false, length: 8 },
  strong: { upper: true, lower: true, numbers: true, symbols: true, length: 16 },
  pin: { upper: false, lower: false, numbers: true, symbols: false, length: 6 },
  passphrase: { upper: false, lower: true, numbers: false, symbols: false, length: 24 },
};

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [showPassword, setShowPassword] = useState(false);
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });

  // توليد كلمة مرور
  const generatePassword = useCallback(() => {
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
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // نسخ كلمة المرور
  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    showToast("Password copied!");
    trackEvent("password_copy", { tool: "password_generator" });
  };

  // نطق كلمة المرور
  const speakPassword = () => {
    if (!password || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(password);
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
    showToast("Speaking...");
  };

  // تطبيق قالب محدد
  const applyPreset = (presetName) => {
    const preset = PRESETS[presetName];
    if (!preset) return;
    setLength(preset.length);
    setOptions({
      upper: preset.upper,
      lower: preset.lower,
      numbers: preset.numbers,
      symbols: preset.symbols,
    });
    showToast(`Preset applied: ${presetName}`);
  };

  // قوة كلمة المرور
  const getStrength = () => {
    if (!password) return { label: "None", level: 0 };
    const types = [options.upper, options.lower, options.numbers, options.symbols].filter(Boolean).length;
    if (length < 8 || types < 3) return { label: "Weak", level: 25 };
    if (length < 14 || types < 4) return { label: "Medium", level: 60 };
    return { label: "Strong", level: 100 };
  };

  const strength = getStrength();

  return (
    <>
      <SEO
        title="Password Generator - Create Strong Secure Passwords"
        description="Generate strong random passwords online with AUQAB Password Generator. Customize length and characters."
      />

      <section className="tool-page">
        <div className="password-card password-gen-card">
          <h1>Password Generator</h1>
          <p className="tool-description">
            Generate strong, secure passwords instantly. Customize length and character types.
          </p>

          {/* عرض كلمة المرور */}
          <div className="password-display">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              placeholder="Your secure password"
              className="pass-input"
            />
            <button
              className="icon-btn toggle-vis"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            <button className="icon-btn copy-pass" onClick={copyPassword} title="Copy password">
              📋
            </button>
            <button className="icon-btn speak-pass" onClick={speakPassword} title="Speak password">
              🔊
            </button>
          </div>

          {/* شريط القوة */}
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

          {/* شريط الطول */}
          <div className="setting">
            <label>
              Length: <strong>{length}</strong>
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
              A-Z
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={options.lower}
                onChange={() => setOptions({ ...options, lower: !options.lower })}
              />
              a-z
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={() => setOptions({ ...options, numbers: !options.numbers })}
              />
              0-9
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={() => setOptions({ ...options, symbols: !options.symbols })}
              />
              !@#
            </label>
          </div>

          {/* القوالب المخصصة */}
          <div className="presets-section">
            <p className="presets-label">Quick Presets</p>
            <div className="presets-buttons">
              {Object.keys(PRESETS).map((key) => (
                <button key={key} className="preset-btn" onClick={() => applyPreset(key)}>
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* زر إعادة التوليد */}
          <button className="generate" onClick={generatePassword}>
            Generate Password
          </button>

          {/* معلومات */}
          <div className="info-section">
            <h2>How to create a secure password?</h2>
            <p>1. Choose a suitable password length (12+ recommended).</p>
            <p>2. Enable uppercase, lowercase, numbers and symbols.</p>
            <p>3. Use a preset for quick configurations.</p>
            <p>4. Copy and save your generated password securely.</p>

            <h2>Why use AUQAB Password Generator?</h2>
            <ul>
              <li>Free and easy to use</li>
              <li>No registration required</li>
              <li>Generate passwords instantly in your browser</li>
              <li>Your passwords are not stored</li>
              <li>Quick presets for common needs</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default PasswordGenerator;
