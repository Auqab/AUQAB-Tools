import { useState, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function QRGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(220);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const qrRef = useRef(null);
  const hasTracked = useRef(false);

  // تتبع الاستخدام مرة واحدة فقط عند أول إدخال فعلي
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    if (newText && !hasTracked.current) {
      trackEvent("qr_generate", { tool: "qr_generator" });
      hasTracked.current = true;
    }

    // إعادة تعيين التتبع إذا مسح المستخدم النص بالكامل
    if (!newText) {
      hasTracked.current = false;
    }
  };

  // تحميل QR كصورة PNG
  const downloadQR = useCallback(() => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "AUQAB-QR.png";
    link.click();

    trackEvent("qr_download", { tool: "qr_generator" });
  }, []);

  const clearAll = () => {
    setText("");
    hasTracked.current = false;
  };

  return (
    <>
      <SEO
        title="Free QR Code Generator - AUQAB Tools"
        description="Create QR codes instantly for text and URLs. Customize colors, size and download your QR code free."
      />

      <section className="tool-page">
        <h1>🔳 QR Code Generator</h1>
        <p className="tool-description">
          Create free QR codes instantly from text, links and URLs.
          Customize the colors and size, then download your QR code.
        </p>

        <input
          type="text"
          placeholder="Enter text or URL..."
          value={text}
          onChange={handleTextChange}
        />

        <div className="options">
          <div className="option-group">
            <label>Size:</label>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            >
              <option value="150">Small (150px)</option>
              <option value="220">Medium (220px)</option>
              <option value="350">Large (350px)</option>
            </select>
          </div>

          <div className="option-group">
            <label>Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="option-group">
            <label>Background:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>

        <div className="qr-box" ref={qrRef}>
          {text ? (
            <QRCodeCanvas
              value={text}
              size={size}
              fgColor={color}
              bgColor={bgColor}
              level="M"
              includeMargin={true}
            />
          ) : (
            <p className="qr-placeholder">
              Enter text or URL to generate QR code
            </p>
          )}
        </div>

        {text && (
          <div className="tool-actions">
            <button className="download-btn" onClick={downloadQR}>
              ⬇ Download QR
            </button>
            <button className="clear-btn" onClick={clearAll}>
              ✕ Clear
            </button>
          </div>
        )}

        <div className="info-section">
          <h2>How to create a QR code?</h2>
          <p>1. Enter your text or URL in the box above.</p>
          <p>2. Customize the size, color and background.</p>
          <p>3. Download your QR code as an image.</p>

          <h2>Why use AUQAB QR Generator?</h2>
          <ul>
            <li>Free and easy to use</li>
            <li>Works on mobile and desktop</li>
            <li>No registration required</li>
            <li>QR codes are generated directly in your browser</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <h3>Are QR codes generated securely?</h3>
          <p>Yes. The QR code is created inside your browser and your data is not uploaded.</p>
          <h3>Can I use the QR code commercially?</h3>
          <p>Yes, you can download and use generated QR codes for your projects.</p>
        </div>
      </section>
    </>
  );
}

export default QRGenerator;
