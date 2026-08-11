import { useState } from "react";
import SEO from "../../components/SEO";

function DayOfWeekCalculator() {
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  const calc = () => {
    if (!date) return;
    const d = new Date(date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(days[d.getDay()]);
  };

  return (
    <>
      <SEO title="Day of Week Calculator - AUQAB Tools" description="Find the weekday for any date." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📅 Day of Week</h1>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={calc}>Find Day</button>
          {day && <h2 style={{ color: "#38bdf8" }}>It's a {day}</h2>}
        </div>
      </section>
    </>
  );
}

export default DayOfWeekCalculator;
