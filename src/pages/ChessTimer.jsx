import { useState, useRef } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function ChessTimer() {
  const [left, setLeft] = useState(300); // 5 دقائق
  const [right, setRight] = useState(300);
  const [turn, setTurn] = useState("none"); // left | right
  const intervalRef = useRef(null);

  const start = (side) => {
    if (turn !== "none") return;
    setTurn(side);
    intervalRef.current = setInterval(() => {
      if (side === "left") {
        setLeft((s) => { if (s <= 0) { clearInterval(intervalRef.current); return 0; } return s - 1; });
      } else {
        setRight((s) => { if (s <= 0) { clearInterval(intervalRef.current); return 0; } return s - 1; });
      }
    }, 1000);
    trackEvent("chess_timer_start", { tool: "chess_timer" });
  };

  const switchTurn = () => {
    clearInterval(intervalRef.current);
    const newSide = turn === "left" ? "right" : "left";
    setTurn(newSide);
    intervalRef.current = setInterval(() => {
      if (newSide === "left") {
        setLeft((s) => { if (s <= 0) { clearInterval(intervalRef.current); return 0; } return s - 1; });
      } else {
        setRight((s) => { if (s <= 0) { clearInterval(intervalRef.current); return 0; } return s - 1; });
      }
    }, 1000);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setLeft(300); setRight(300); setTurn("none");
  };

  const fmt = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  return (
    <>
      <SEO title="Chess Timer - AUQAB Tools" description="A simple two-player chess clock." />
      <section className="tool-page">
        <div className="password-card">
          <h1>♟️ Chess Timer</h1>
          <div style={{ display: "flex", justifyContent: "space-around", fontSize: 36 }}>
            <div onClick={() => start("left")} style={{ background: turn === "left" ? "#38bdf8" : "transparent", padding: 20, borderRadius: 15, cursor: "pointer" }}>
              {fmt(left)}
            </div>
            <div onClick={() => start("right")} style={{ background: turn === "right" ? "#38bdf8" : "transparent", padding: 20, borderRadius: 15, cursor: "pointer" }}>
              {fmt(right)}
            </div>
          </div>
          <button className="generate" style={{ margin: "20px 10px" }} onClick={switchTurn}>🔄 Switch Turn</button>
          <button className="clear-btn" onClick={reset}>↺ Reset</button>
        </div>
      </section>
    </>
  );
}

export default ChessTimer;
