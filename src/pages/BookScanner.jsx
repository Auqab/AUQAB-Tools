import { useRef, useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function BookScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // الخطوة الحالية: home | camera | crop | result
  const [step, setStep] = useState("home");
  const [capturedImage, setCapturedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [stream, setStream] = useState(null);
  const [copied, setCopied] = useState(false);

  // 1. فتح الكاميرا
  async function openCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setStep("camera");
    } catch (err) {
      alert("⚠️ Unable to access camera. Please allow camera permissions.");
    }
  }

  // 2. إيقاف الكاميرا
  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }

  // 3. التقاط صورة من الكاميرا
  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
    stopCamera();
    setStep("crop");
    trackEvent("book_scanner_capture", { tool: "book_scanner" });
  }

  // 4. اختيار صورة من المعرض
  function selectFromGallery(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(reader.result);
      setStep("crop");
    };
    reader.readAsDataURL(file);
  }

  // 5. تحسين الصورة (تباين عالي – أبيض وأسود)
  function enhanceImage(imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        // عتبة 140 للحصول على تباين واضح للنصوص
        const value = avg > 140 ? 255 : 30;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      ctx.putImageData(imageData, 0, 0);
      const enhanced = canvas.toDataURL("image/png");
      setProcessedImage(enhanced);
      setStep("result");
      trackEvent("book_scanner_enhance", { tool: "book_scanner" });
    };
  }

  // 6. استخراج النص يدوياً (لأن OCR الحقيقي يحتاج Backend أو مكتبة كبيرة)
  // هنا نعرض الصورة المحسنة فقط ويمكن للمستخدم نسخ النص يدوياً أو إضافته
  // هذه الخطوة ستتحسن لاحقاً عند إضافة Tesseract.js أو API حقيقي
  function simulateTextExtraction() {
    setExtractedText("");
    trackEvent("book_scanner_extract", { tool: "book_scanner" });
  }

  // 7. تحميل TXT
  function downloadTXT() {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AUQAB-Scan.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  function copyText() {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // إعادة ضبط
  function reset() {
    setCapturedImage(null);
    setProcessedImage(null);
    setExtractedText("");
    setStep("home");
    stopCamera();
  }

  return (
    <>
      <SEO
        title="Book Scanner - AUQAB Tools"
        description="Scan book pages with your camera, enhance image quality, and extract text."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>📖 Book Scanner</h1>
          <p className="tool-description">
            Scan book pages using your camera or upload an image.
            Enhance contrast and extract readable text.
          </p>

          {/* الخطوة: الصفحة الرئيسية */}
          {step === "home" && (
            <div className="scanner-home">
              <button className="generate" onClick={openCamera}>
                📷 Open Camera
              </button>
              <label className="gallery-btn">
                🖼️ Choose from Gallery
                <input type="file" accept="image/*" onChange={selectFromGallery} hidden />
              </label>
            </div>
          )}

          {/* الخطوة: الكاميرا */}
          {step === "camera" && (
            <div className="scanner-camera">
              <video ref={videoRef} autoPlay playsInline className="scanner-media" />
              <div className="scanner-actions">
                <button className="generate" onClick={capturePhoto}>
                  📸 Capture
                </button>
                <button className="clear-btn" onClick={reset}>
                  ✕ Cancel
                </button>
              </div>
            </div>
          )}

          {/* الخطوة: الصورة الملتقطة + تحسين */}
          {step === "crop" && capturedImage && (
            <div className="scanner-preview">
              <h3>📷 Captured Image</h3>
              <img src={capturedImage} alt="Captured" className="scanner-media" />
              <div className="scanner-actions">
                <button className="generate" onClick={() => enhanceImage(capturedImage)}>
                  ✨ Enhance & Extract
                </button>
                <button className="clear-btn" onClick={reset}>
                  📷 Retake
                </button>
              </div>
            </div>
          )}

          {/* الخطوة: النتيجة */}
          {step === "result" && processedImage && (
            <div className="scanner-result">
              <h3>🔍 Enhanced Image</h3>
              <img src={processedImage} alt="Enhanced" className="scanner-media" />

              <p className="ocr-note">
                💡 <strong>Text extraction</strong> will be available soon with full OCR support.
                For now, you can manually copy text from the enhanced image above.
              </p>

              <textarea
                rows="6"
                placeholder="You can type or paste text here..."
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
              />

              {extractedText && (
                <div className="scanner-actions">
                  <button className="generate" onClick={copyText}>
                    {copied ? "✅ Copied!" : "📋 Copy Text"}
                  </button>
                  <button className="download-btn" onClick={downloadTXT}>
                    ⬇ Download TXT
                  </button>
                </div>
              )}

              <button className="clear-btn" onClick={reset} style={{ marginTop: 15 }}>
                🔄 Start New Scan
              </button>
            </div>
          )}

          {/* Canvas مخفي */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* معلومات */}
          <div className="info-section">
            <h2>How to use Book Scanner?</h2>
            <p>1. Open your camera or upload a book page image.</p>
            <p>2. Capture the page and click "Enhance" to improve contrast.</p>
            <p>3. The enhanced image will help you read text more clearly.</p>
            <p>4. Full OCR text extraction coming soon!</p>

            <h2>Why use AUQAB Book Scanner?</h2>
            <ul>
              <li>Free and easy to use</li>
              <li>Works on mobile and desktop</li>
              <li>Enhances image contrast for readability</li>
              <li>Your images stay private (processed locally)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookScanner;
