import { useRef, useState, useEffect } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function AudioVisualizer() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const startVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      setRunning(true);
      draw();
      trackEvent("visualizer_start", { tool: "audio_visualizer" });
    } catch (e) {
      alert("Microphone access denied.");
    }
  };

  const stopVisualizer = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setRunning(false);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, "#38bdf8");
        gradient.addColorStop(1, "#818cf8");
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      animationRef.current = requestAnimationFrame(render);
    };
    render();
  };

  useEffect(() => {
    return () => stopVisualizer();
  }, []);

  return (
    <>
      <SEO title="Audio Visualizer - AUQAB Tools" description="See live audio frequencies from your microphone." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🎵 Audio Visualizer</h1>
          <p className="tool-description">Watch your voice or any sound come alive as colorful bars!</p>

          <canvas ref={canvasRef} width={600} height={200} style={{ width: "100%", borderRadius: 15, background: "#0f172a" }} />

          <div style={{ margin: "15px 0" }}>
            {!running ? (
              <button className="generate" onClick={startVisualizer}>▶️ Start</button>
            ) : (
              <button className="clear-btn" onClick={stopVisualizer}>⏹️ Stop</button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AudioVisualizer;
