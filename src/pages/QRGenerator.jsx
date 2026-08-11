import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsQR from "jsqr";
import SEO from "../components/SEO";
import { showToast } from "../components/Toast";
import { trackEvent } from "../utils/analytics";

function QRGenerator() {
  // === حالة التبويب ===
  const [tab, setTab] = useState("generate"); // generate | scan

  // === حالة التوليد ===
  const [text, setText] = useState("");
  const [size, setSize] = useState(220);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState(null); // شعار اختياري
  const qrRef = useRef(null);

  // === حالة المسح ===
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanResult, setScanResult] = useState("");
  const [cameraStream, setCameraStream] = useState(null);
  const [scanning, setScanning] = useState(false);

  // === تنظيف الكاميرا عند الخروج ===
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // ========== دوال التوليد ==========
  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "AUQAB-QR.png";
    link.click();
    showToast("QR downloaded!");
    trackEvent("qr_download", { tool: "qr_generator" });
  };

  const clearQR = () => {
    setText("");
    setLogo(null);
  };

  // معالجة رفع الشعار
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  // ========== دوال المسح ==========
  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      setCameraStream(stream);
      setScanning(true);
      scanLoop();
    } catch {
      showToast("⚠️ Camera access denied.", "error");
    }
  };

  const stopScanner = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setScanning(false);
  };

  const scanLoop = () => {
    if (!videoRef.current || !canvasRef.current) return;
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
          setScanResult(code.data);
          stopScanner();
          showToast("QR Code scanned!");
          trackEvent("qr_scan", { tool: "qr_generator" });
          return;
        }
      }
      if (scanning) requestAnimationFrame(tick);
    };
    tick();
  };

  const copyScanResult = () => {
    navigator.clipboard.writeText(scanResult);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="QR Generator & Scanner - AUQAB Tools"
        description="Create and scan QR codes instantly. Free online tool."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔳 QR Generator & Scanner</h1>
          <p className="tool-description">
            Create custom QR codes or scan existing ones with your camera.
          </p>

          {/* أزرار التبويب */}
          <div className="qr-tabs">
            <button
              className={`tab-btn ${tab === "generate" ? "active" : ""}`}
              onClick={() => { setTab("generate"); stopScanner(); }}
            >
              ✨ Generate
            </button>
            <button
              className={`tab-btn ${tab === "scan" ? "active" : ""}`}
              onClick={() => { setTab("scan"); }}
            >
              📷 Scan
            </button>
          </div>

          {/* ========== تبويب التوليد ========== */}
          {tab === "generate" && (
            <div className="qr-generate-tab">
              <input
                type="text"
                placeholder="Enter text or URL..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="url-input"
              />

              <div className="qr-options">
                <div className="option-group">
                  <label>Size</label>
                  <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
                    <option value="150">Small (150px)</option>
                    <option value="220">Medium (220px)</option>
                    <option value="350">Large (350px)</option>
                  </select>
                </div>
                <div className="option-group">
                  <label>Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div className="option-group">
                  <label>Background</label>
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                </div>
                <div className="option-group">
                  <label>Logo (optional)</label>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} />
                </div>
              </div>

              <div className="qr-box" ref={qrRef}>
                {text ? (
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <QRCodeCanvas
                      value={text}
                      size={size}
                      fgColor={color}
                      bgColor={bgColor}
                      level="M"
                      includeMargin={true}
                    />
                    {logo && (
                      <img
                        src={logo}
                        alt="logo"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: size * 0.2,
                          height: size * 0.2,
                          borderRadius: "10%",
                          background: "white",
                          padding: 2,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <p className="qr-placeholder">Enter text to generate QR</p>
                )}
              </div>

              {text && (
                <div className="tool-actions">
                  <button className="download-btn" onClick={downloadQR}>
                    ⬇ Download QR
                  </button>
                  <button className="clear-btn" onClick={clearQR}>
                    ✕ Clear
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========== تبويب المسح ========== */}
          {tab === "scan" && (
            <div className="qr-scan-tab">
              {!scanning ? (
                <button className="generate" onClick={startScanner}>
                  📷 Open Camera
                </button>
              ) : (
                <button className="clear-btn" onClick={stopScanner}>
                  ⏹️ Stop Camera
                </button>
              )}

              <video ref={videoRef} autoPlay playsInline className="scanner-media" />
              <canvas ref={canvasRef} style={{ display: "none" }} />

              {scanResult && (
                <div className="scan-result">
                  <h3>Scanned Data:</h3>
                  <textarea rows="4" readOnly value={scanResult} />
                  <div className="tool-actions">
                    <button className="generate" onClick={copyScanResult}>
                      📋 Copy
                    </button>
                    <button className="clear-btn" onClick={() => setScanResult("")}>
                      ✕ Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* معلومات */}
          <div className="info-section">
            <h2>How to use?</h2>
            <p>Generate: Enter text, customize colors/size, add optional logo, then download.</p>
            <p>Scan: Open camera and point at a QR code to read it instantly.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default QRGenerator;
