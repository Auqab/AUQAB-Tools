import { useState, useRef } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function VideoToGIF() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [gifUrl, setGifUrl] = useState(null);
  const [converting, setConverting] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoSrc(URL.createObjectURL(file));
    setGifUrl(null);
  };

  const convertToGif = async () => {
    if (!videoSrc) return;
    setConverting(true);
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const maxDuration = Math.min(video.duration, 3);
      video.currentTime = 0;
      await new Promise((r) => (video.onseeked = r));

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const fps = 10;
      const frameCount = Math.floor(maxDuration * fps);
      const frames = [];

      for (let i = 0; i < frameCount; i++) {
        await new Promise((r) => {
          video.currentTime = i / fps;
          video.onseeked = () => {
            ctx.drawImage(video, 0, 0);
            frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            r();
          };
        });
      }

      // استخدم gif.js من النافذة العامة
      const gif = new window.GIF({
        workers: 2,
        quality: 10,
        width: canvas.width,
        height: canvas.height,
      });

      frames.forEach(() => {
        gif.addFrame(canvas, { delay: 1000 / fps, copy: true });
      });

      gif.on("finished", (blob) => {
        setGifUrl(URL.createObjectURL(blob));
        trackEvent("video_to_gif", { tool: "video_to_gif" });
        setConverting(false);
      });

      gif.render();
    } catch (e) {
      alert("Conversion failed. Try a shorter video.");
      setConverting(false);
    }
  };

  const downloadGif = () => {
    const link = document.createElement("a");
    link.href = gifUrl;
    link.download = "animated.gif";
    link.click();
  };

  return (
    <>
      <SEO title="Video to GIF - AUQAB Tools" description="Convert short videos to GIF animations." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🎥 Video to GIF</h1>
          <p className="tool-description">Upload a short video clip and convert it to an animated GIF.</p>

          <input type="file" accept="video/*" onChange={handleVideo} className="file-input" />

          {videoSrc && (
            <video ref={videoRef} src={videoSrc} controls style={{ maxWidth: "100%", borderRadius: 15, margin: "15px 0" }} />
          )}

          <button className="generate" onClick={convertToGif} disabled={!videoSrc || converting}>
            {converting ? "⏳ Converting..." : "🔄 Convert to GIF"}
          </button>

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {gifUrl && (
            <div style={{ marginTop: 20 }}>
              <img src={gifUrl} alt="GIF" style={{ maxWidth: "100%", borderRadius: 15 }} />
              <br />
              <button className="download-btn" onClick={downloadGif} style={{ marginTop: 10 }}>
                ⬇ Download GIF
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default VideoToGIF;
