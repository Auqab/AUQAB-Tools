import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

const presets = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Sunday at 3am", value: "0 3 * * 0" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "First day of month", value: "0 0 1 * *" },
];

function CronGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayMonth, setDayMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayWeek, setDayWeek] = useState("*");
  const [copied, setCopied] = useState(false);

  const expression = `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`;

  const copyExpression = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    trackEvent("cron_copy", { tool: "cron_generator" });
    setTimeout(() => setCopied(false), 1500);
  };

  const selectPreset = (value) => {
    const [mi, h, dm, mo, dw] = value.split(" ");
    setMinute(mi); setHour(h); setDayMonth(dm); setMonth(mo); setDayWeek(dw);
    trackEvent("cron_preset", { tool: "cron_generator" });
  };

  return (
    <>
      <SEO title="Cron Expression Generator - AUQAB Tools" description="Build cron schedule expressions visually." />
      <section className="tool-page">
        <div className="password-card">
          <h1>⏱️ Cron Expression Generator</h1>
          <p className="tool-description">Create cron schedule expressions easily.</p>

          <div className="cron-fields">
            <div className="cron-field">
              <label>Minute</label>
              <input value={minute} onChange={(e) => setMinute(e.target.value)} placeholder="*" />
            </div>
            <div className="cron-field">
              <label>Hour</label>
              <input value={hour} onChange={(e) => setHour(e.target.value)} placeholder="*" />
            </div>
            <div className="cron-field">
              <label>Day (month)</label>
              <input value={dayMonth} onChange={(e) => setDayMonth(e.target.value)} placeholder="*" />
            </div>
            <div className="cron-field">
              <label>Month</label>
              <input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="*" />
            </div>
            <div className="cron-field">
              <label>Day (week)</label>
              <input value={dayWeek} onChange={(e) => setDayWeek(e.target.value)} placeholder="*" />
            </div>
          </div>

          <div className="cron-output">
            <code>{expression}</code>
            <button className="copy-btn-mini" onClick={copyExpression}>
              {copied ? "✅" : "📋"}
            </button>
          </div>

          <div className="presets">
            <p>Presets:</p>
            {presets.map((p) => (
              <button key={p.value} className="case-btn" onClick={() => selectPreset(p.value)}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="info-section">
            <p>Format: minute hour day(month) month day(week)</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default CronGenerator;
