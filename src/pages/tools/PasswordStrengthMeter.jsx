import { useState } from "react";
import SEO from "../../components/SEO";

function getStrength(pwd) {
  let score = 0;
  if (!pwd) return { label: "None", color: "#666", percent: 0 };

  if (pwd.length >= 8) score++;
  if (pwd.length >= 14) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  const map = [
    { label: "Very Weak", color: "#ef4444", percent: 20 },
    { label: "Weak", color: "#f97316", percent: 40 },
    { label: "Fair", color: "#eab308", percent: 60 },
    { label: "Good", color: "#22c55e", percent: 80 },
    { label: "Strong", color: "#10b981", percent: 100 },
  ];

  return map[Math.min(score, 4)];
}

function PasswordStrengthMeter() {
  const [password, setPassword] = useState("");
  const strength = getStrength(password);

  return (
    <>
      <SEO
        title="Password Strength Meter - AUQAB Tools"
        description="Check how strong your password is instantly."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Password Strength Meter</h1>
          <p className="tool-description">Enter a password to see its strength score.</p>

          <input
            type="password"
            placeholder="Type a password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="url-input"
          />

          <div style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>{strength.label}</span>
              <span>{strength.percent}%</span>
            </div>
            <div className="strength-bar-bg">
              <div
                className="strength-bar-fill"
                style={{
                  width: `${strength.percent}%`,
                  background: strength.color,
                }}
              />
            </div>
          </div>

          <ul style={{ textAlign: "left", color: "#cbd5e1" }}>
            <li>✓ At least 8 characters</li>
            <li>✓ Uppercase & lowercase letters</li>
            <li>✓ Numbers</li>
            <li>✓ Special characters</li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default PasswordStrengthMeter;
