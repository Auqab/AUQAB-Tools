import { useState, useRef } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function StopwatchTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("stopwatch"); // stopwatch | timer
  const [input, setInput] = useState(60);
  const intervalRef = useRef(null);

  const startStop = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
      return;
    }
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (mode === "timer") {
          if (s <= 0) { clearInterval(intervalRef.current); setRunning(false); return 0; }
          return s - 1;
        }
        return s + 1;
      });
    }, 1000);
    trackEvent("stopwatch", { tool: "stopwatch_timer" });
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSeconds(mode === "timer" ? input : 0);
  };

  const formatTime = (s) => new Date(s * 1000).toISOString().slice(11, 19);

  return (
    <>
      <SEO title="Stopwatch & Timer - AUQAB Tools" description="Online stopwatch and countdown timer." />
      <section className="tool-page">
        <div className="password-card">
          <h1>⏱️ Stopwatch & Timer</h1>
          <div className="diff-mode">
            <label><input type="radio" value="stopwatch" checked={mode === "stopwatch"} onChange={() => { setMode("stopwatch"); reset(); }} /> Stopwatch</label>
            <label><input type="radio" value="timer" checked={mode === "timer"} onChange={() => { setMode("timer"); reset(); }} /> Timer</label>
          </div>
          {mode === "timer" && (
            <input type="number" min="1" value={input} onChange={(e) => { setInput(+e.target.value); setSeconds(+e.target.value); }} className="url-input" />
          )}
          <h2 style={{ fontSize: 48 }}>{formatTime(seconds)}</h2>
          <button className="generate" onClick={startStop}>{running ? "⏸️ Pause" : "▶️ Start"}</button>
          <button className="clear-btn" style={{ marginLeft: 10 }} onClick={reset}>↺ Reset</button>
        </div>
      </section>
    </>
  );
}

export default StopwatchTimer;
