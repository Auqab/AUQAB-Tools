import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const timezones = Intl.supportedValuesOf("timeZone");

function TimeZoneConverter() {
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [fromTZ, setFromTZ] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [toTZ, setToTZ] = useState("Europe/London");
  const [result, setResult] = useState(null);

  const convert = () => {
    if (!dateTime) return;
    try {
      const fromDate = new Date(dateTime);
      const fromFormatted = new Intl.DateTimeFormat("en-US", {
        timeZone: fromTZ,
        dateStyle: "full",
        timeStyle: "long",
      }).format(fromDate);

      const toDate = new Date(dateTime);
      const toFormatted = new Intl.DateTimeFormat("en-US", {
        timeZone: toTZ,
        dateStyle: "full",
        timeStyle: "long",
      }).format(toDate);

      setResult({ from: fromFormatted, to: toFormatted, fromTZ, toTZ });
      showToast("Conversion complete!");
      trackEvent("timezone_convert", { tool: "timezone_converter" });
    } catch {
      setResult({ error: "Invalid date/time" });
      showToast("Invalid date/time", "error");
    }
  };

  const swapTimeZones = () => {
    setFromTZ(toTZ);
    setToTZ(fromTZ);
  };

  return (
    <>
      <SEO
        title="Time Zone Converter - AUQAB Tools"
        description="Convert date and time between different time zones."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Time Zone Converter</h1>
          <p className="tool-description">
            Pick a date and time, then convert it between any two time zones.
          </p>

          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="url-input"
          />

          <div className="converter-row">
            <div className="unit-select">
              <label>From</label>
              <select value={fromTZ} onChange={(e) => setFromTZ(e.target.value)}>
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <button className="swap-btn" onClick={swapTimeZones}>Swap</button>
            <div className="unit-select">
              <label>To</label>
              <select value={toTZ} onChange={(e) => setToTZ(e.target.value)}>
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="generate" style={{ margin: "20px 0" }} onClick={convert}>
            Convert
          </button>

          {result && !result.error && (
            <div className="converter-result">
              <h3>{fromTZ}</h3>
              <p>{result.from}</p>
              <h3>{toTZ}</h3>
              <p>{result.to}</p>
            </div>
          )}
          {result?.error && <div className="json-error">{result.error}</div>}
        </div>
      </section>
    </>
  );
}

export default TimeZoneConverter;
