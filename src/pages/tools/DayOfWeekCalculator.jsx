import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function DayOfWeekCalculator() {
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  const calc = () => {
    if (!date) {
      showToast("Please select a date.", "error");
      return;
    }
    const d = new Date(date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(days[d.getDay()]);
    showToast("Day calculated!");
    trackEvent("day_of_week_calculate", { tool: "day_of_week_calculator" });
  };

  const copyDay = () => {
    if (!day) return;
    navigator.clipboard.writeText(day);
    showToast("Day copied!");
  };

  return (
    <>
      <SEO
        title="Day of Week Calculator - AUQAB Tools"
        description="Find the weekday for any date."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Day of Week</h1>
          <p className="tool-description">Select a date to see which day of the week it falls on.</p>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="url-input"
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={calc}>
            Find Day
          </button>

          {day && (
            <div className="converter-result">
              <h2>It's a {day}</h2>
              <button className="open-tool-btn" onClick={copyDay}>
                Copy Day
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default DayOfWeekCalculator;
