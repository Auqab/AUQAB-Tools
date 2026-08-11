import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0) setSelectedVoice(v[0]);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.onstart = () => {
      setSpeaking(true);
      trackEvent("tts", { tool: "text_to_speech" });
    };
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <>
      <SEO title="Text to Speech - AUQAB Tools" description="Convert text to spoken words." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔊 Text to Speech</h1>
          <p className="tool-description">Enter text and listen to it spoken aloud.</p>

          <textarea rows="4" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", margin: "15px 0" }}>
            <div className="unit-select">
              <label>Voice</label>
              <select value={selectedVoice?.name} onChange={(e) => {
                const voice = voices.find((v) => v.name === e.target.value);
                setSelectedVoice(voice);
              }}>
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
            </div>
            <div className="setting">
              <label>Speed: {rate}x</label>
              <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} />
            </div>
          </div>

          {!speaking ? (
            <button className="generate" onClick={speak}>🔊 Speak</button>
          ) : (
            <button className="clear-btn" onClick={stop}>⏹️ Stop</button>
          )}
        </div>
      </section>
    </>
  );
}

export default TextToSpeech;
