import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressed, setCompressed] = useState("");
  const [compressedSize, setCompressedSize] = useState(0);

  // خيارات المستخدم
  const [quality, setQuality] = useState(75); // 10-100
  const [format, setFormat] = useState("image/jpeg");
  const [maxWidth, setMaxWidth] = useState(1920); // أقصى عرض

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // إعادة تعيين النتيجة السابقة
    setCompressed("");
    setCompressedSize(0);
  }

  function compressImage() {
    if (!image || !preview) return;

    trackEvent("image_compress", { tool: "image_compressor" });

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // تصغير الأبعاد إذا تجاوزت الحد الأقصى
      if (width > maxWidth) {
        height = Math.round(height * (maxWidth / width));
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // تحديد mimeType
      const mimeType = format === "image/png" ? "image/png" : format === "image/webp" ? "image/webp" : "image/jpeg";
      const qualityValue = mimeType === "image/png" ? undefined : quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setCompressed(url);
          setCompressedSize(blob.size);
        },
        mimeType,
        qualityValue
      );
    };
  }

  const reductionPercent = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return (
    <>
      <SEO
        title="Free Image Compressor - AUQAB Tools"
        description="Compress JPG, PNG and WebP images online while keeping quality. Fast, private, browser-based."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🖼️ Image Compressor</h1>
          <p className="tool-description">
            Compress JPG, PNG and WebP images online for free.
            Reduce file size while keeping good visual quality.
            Your images are processed securely in your browser.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="file-input"
          />

          {preview && (
            <div className="compressor-preview">
              <div className="preview-box">
                <img src={preview} alt="Original" />
                <span className="size-badge">
                  Original: {(originalSize / 1024).toFixed(1)} KB
                </span>
              </div>

              {compressed && (
                <div className="preview-box">
                  <img src={compressed} alt="Compressed" />
                  <span className="size-badge compressed-badge">
                    Compressed: {(compressedSize / 1024).toFixed(1)} KB
                    {reductionPercent > 0 && (
                      <span className="reduction"> (-{reductionPercent}%)</span>
                    )}
                  </span>
                </div>
              )}
            </div>
          )}

          {preview && (
            <div className="compressor-controls">
              {/* جودة الضغط */}
              <div className="setting">
                <label>
                  Quality: <strong>{quality}%</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
              </div>

              {/* تنسيق الإخراج */}
              <div className="option-group">
                <label>Output Format:</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="image/jpeg">JPEG (smaller)</option>
                  <option value="image/png">PNG (lossless)</option>
                  <option value="image/webp">WebP (modern)</option>
                </select>
              </div>

              {/* الحجم الأقصى */}
              <div className="option-group">
                <label>Max Width (px):</label>
                <select value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))}>
                  <option value="800">800px</option>
                  <option value="1200">1200px</option>
                  <option value="1920">1920px</option>
                  <option value="3840">Original</option>
                </select>
              </div>

              <button className="generate" onClick={compressImage}>
                🗜️ Compress Image
              </button>

              {compressed && (
                <a href={compressed} download={`compressed.${format.split("/")[1]}`} className="download-btn">
                  ⬇ Download Compressed Image
                </a>
              )}
            </div>
          )}
        </div>

        {/* معلومات إضافية */}
        <div className="info-section">
          <h2>How to compress an image?</h2>
          <p>1. Select an image from your device.</p>
          <p>2. Adjust quality, format and maximum width if needed.</p>
          <p>3. Click "Compress Image" and download the result.</p>

          <h2>Why use AUQAB Image Compressor?</h2>
          <ul>
            <li>No registration required</li>
            <li>Fast browser‑based processing</li>
            <li>Your images stay private (never uploaded)</li>
            <li>Works on mobile and desktop</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <h3>Are my images uploaded to a server?</h3>
          <p>No. Compression happens directly in your browser. Your files never leave your device.</p>
          <h3>Which formats are supported?</h3>
          <p>You can upload any image format (JPG, PNG, WebP, etc.) and choose your preferred output format.</p>
        </div>
      </section>
    </>
  );
}

export default ImageCompressor;
