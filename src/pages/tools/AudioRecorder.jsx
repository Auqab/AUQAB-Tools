import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        showToast("Recording finished!");
        trackEvent("audio_record", { tool: "audio_recorder" });
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setAudioUrl(null);
    } catch {
      showToast("Microphone access denied or not available.", "error");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "recording.webm";
    link.click();
    showToast("Download started!");
  };

  return (
    <>
      <SEO
        title="Audio Recorder - AUQAB Tools"
        description="Record audio directly in your browser."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Audio Recorder</h1>
          <p className="tool-description">
            Record audio clips directly from your microphone.
          </p>

          <div className="recorder-controls">
            {!recording ? (
              <button className="generate" onClick={startRecording}>
                Start Recording
              </button>
            ) : (
              <button className="clear-btn" onClick={stopRecording}>
                Stop Recording
              </button>
            )}
          </div>

          {audioUrl && (
            <div className="audio-preview">
              <audio controls src={audioUrl} style={{ width: "100%", margin: "15px 0" }} />
              <button className="download-btn" onClick={downloadAudio}>
                Download Recording
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AudioRecorder;
