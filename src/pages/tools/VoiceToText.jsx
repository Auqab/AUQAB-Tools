import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function VoiceToText() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  let recognition = null;

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("Speech recognition is not supported in your browser.", "error");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = "ar-SA";

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) transcript += event.results[i][0].transcript;
      }
      setText((prev) => prev + " " + transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    setListening(true);
    showToast("Listening...");
    trackEvent("voice_to_text_start", { tool: "voice_to_text" });
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
    setListening(false);
    showToast("Stopped.");
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast("Copied!");
    trackEvent("voice_copy", { tool: "voice_to_text" });
  };

  const clearText = () => {
    setText("");
  };

  return (
    <>
      <SEO
        title="Voice to Text - AUQAB Tools"
        description="Convert your speech to text in real-time."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Voice to Text</h1>
          <p className="tool-description">
            Click the microphone and start speaking – your words will appear below.
          </p>

          <textarea
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your transcribed text..."
          />

          <div style={{ margin: "15px 0" }}>
            {!listening ? (
              <button className="generate" onClick={startListening}>
                Start Listening
              </button>
            ) : (
              <button className="clear-btn" onClick={stopListening}>
                Stop
              </button>
            )}
            <button className="generate" style={{ marginLeft: 10 }} onClick={copyText}>
              Copy
            </button>
            <button className="clear-btn" style={{ marginLeft: 10 }} onClick={clearText}>
              Clear
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default VoiceToText;
