import { useRef, useState } from "react";
import SEO from "../../components/SEO";
import jsQR from "jsqr";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function QRCodeScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = s;
      setStream(s);
      scanLoop();
    } catch {
      showToast("Camera access required.", "error");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  const scanLoop = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const tick = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setResult(code.data);
          showToast("QR code scanned!");
          trackEvent("qr_scan", { tool: "qr_scanner" });
          stopCamera();
          return;
        }
      }
      requestAnimationFrame(tick);
    };
    tick();
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    showToast("Copied!");
  };

  const clearResult = () => {
    setResult("");
  };

  return (
    <>
      <SEO
        title="QR Code Scanner - AUQAB Tools"
        description="Scan QR codes using your camera."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>QR Code Scanner</h1>
          <p className="tool-description">
            Point your camera at a QR code to read it instantly.
          </p>

          {!stream ? (
            <button className="generate" onClick={startCamera}>
              Open Camera
            </button>
          ) : (
            <button className="clear-btn" onClick={stopCamera}>
              Stop Camera
            </button>
          )}

          <video ref={videoRef} autoPlay playsInline className="scanner-media" />
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {result && (
            <div className="qr-result">
              <h3>Scanned Data:</h3>
              <textarea readOnly rows="4" value={result} />
              <div className="tool-actions">
                <button className="generate" onClick={copyResult}>
                  Copy
                </button>
                <button className="clear-btn" onClick={clearResult}>
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default QRCodeScanner;
