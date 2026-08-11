import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          if (minutes === 0) { clearInterval(intervalRef.current); setRunning(false); return 0; }
          setMinutes((m) => m - 1);
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    trackEvent("pomodoro", { tool: "pomodoro_timer" });
  };

  const stop = () => { clearInterval(intervalRef.current); setRunning(false); };
  const reset = () => { stop(); setMinutes(25); setSeconds(0); };

  return (
    <>
      <SEO title="Pomodoro Timer - AUQAB Tools" description="Boost productivity with Pomodoro technique." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🍅 Pomodoro Timer</h1>
          <p className="tool-description">Focus session: 25 minutes.</p>
          <h2 style={{ fontSize: 48 }}>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</h2>
          <button className="generate" onClick={start} disabled={running}>▶️ Start</button>
          <button className="clear-btn" style={{ marginLeft: 10 }} onClick={stop}>⏸️ Stop</button>
          <button className="clear-btn" style={{ marginLeft: 10 }} onClick={reset}>↺ Reset</button>
        </div>
      </section>
    </>
  );
}

export default PomodoroTimer;
