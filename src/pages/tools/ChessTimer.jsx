import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function ChessTimer() {
  const [left, setLeft] = useState(300);
  const [right, setRight] = useState(300);
  const [turn, setTurn] = useState("none");
  const intervalRef = useRef(null);

  const start = (side) => {
    if (turn !== "none") return;
    setTurn(side);
    intervalRef.current = setInterval(() => {
      if (side === "left") {
        setLeft((s) => {
          if (s <= 0) {
            clearInterval(intervalRef.current);
            showToast("Left player time finished!");
            return 0;
          }
          return s - 1;
        });
      } else {
        setRight((s) => {
          if (s <= 0) {
            clearInterval(intervalRef.current);
            showToast("Right player time finished!");
            return 0;
          }
          return s - 1;
        });
      }
    }, 1000);
    showToast("Timer started");
    trackEvent("chess_timer_start", { tool: "chess_timer" });
  };

  const switchTurn = () => {
    clearInterval(intervalRef.current);
    const newSide = turn === "left" ? "right" : "left";
    setTurn(newSide);
    intervalRef.current = setInterval(() => {
      if (newSide === "left") {
        setLeft((s) => {
          if (s <= 0) {
            clearInterval(intervalRef.current);
            showToast("Left player time finished!");
            return 0;
          }
          return s - 1;
        });
      } else {
        setRight((s) => {
          if (s <= 0) {
            clearInterval(intervalRef.current);
            showToast("Right player time finished!");
            return 0;
          }
          return s - 1;
        });
      }
    }, 1000);
    showToast(`Turn switched to ${newSide === "left" ? "left" : "right"}`);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setLeft(300);
    setRight(300);
    setTurn("none");
    showToast("Timer reset");
  };

  const fmt = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  return (
    <>
      <SEO
        title="Chess Timer - AUQAB Tools"
        description="A simple two-player chess clock."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Chess Timer</h1>
          <p className="tool-description">Click a side to start its clock.</p>

          <div style={{ display: "flex", justifyContent: "space-around", fontSize: 36 }}>
            <div
              onClick={() => start("left")}
              style={{
                background: turn === "left" ? "#38bdf8" : "rgba(255,255,255,0.1)",
                padding: 20,
                borderRadius: 15,
                cursor: "pointer",
              }}
            >
              {fmt(left)}
            </div>
            <div
              onClick={() => start("right")}
              style={{
                background: turn === "right" ? "#38bdf8" : "rgba(255,255,255,0.1)",
                padding: 20,
                borderRadius: 15,
                cursor: "pointer",
              }}
            >
              {fmt(right)}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
            <button className="generate" style={{ width: "auto" }} onClick={switchTurn}>
              Switch Turn
            </button>
            <button className="clear-btn" style={{ marginLeft: 0 }} onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChessTimer;
