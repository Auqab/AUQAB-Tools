import { useState, useRef } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function ImageResizer() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [keepAspect, setKeepAspect] = useState(true);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(85);
  const [result, setResult] = useState("");
  const imgRef = useRef(null);

  function loadImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setResult("");

    const url = URL.createObjectURL(file);
    setPreview(url);

    // قراءة الأبعاد الأصلية
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
  }

  // عند تغيير العرض مع الحفاظ على النسبة
  function handleWidthChange(newWidth) {
    setWidth(newWidth);
    if (keepAspect && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(newWidth * ratio));
    }
  }

  // عند تغيير الارتفاع مع الحفاظ على النسبة
  function handleHeightChange(newHeight) {
    setHeight(newHeight);
    if (keepAspect && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(newHeight * ratio));
    }
  }

  function resizeImage() {
    if (!image || !preview) return;

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = Number(width);
      canvas.height = Number(height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mimeType = format;
      const qualityValue = format === "image/png" ? undefined : quality / 100;

      const dataUrl = canvas.toDataURL(mimeType, qualityValue);
      setResult(dataUrl);

      trackEvent("image_resize", { tool: "image_resizer" });
    };
  }

  function download() {
    if (!result) return;
    const extension = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const link = document.createElement("a");
    link.href = result;
    link.download = `AUQAB-resized-image.${extension}`;
    link.click();
    trackEvent("image_resize_download", { tool: "image_resizer" });
  }

  return (
    <>
      <SEO
        title="Free Image Resizer Online - AUQAB Tools"
        description="Resize images online easily. Change image dimensions, keep aspect ratio, and download resized photos."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>📷 Image Resizer</h1>
          <p className="tool-description">
            Resize images quickly while keeping good quality.
            Your images are processed locally in your browser.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={loadImage}
            className="file-input"
          />

          {preview && (
            <div className="resizer-preview">
              <p className="original-info">
                Original: {originalWidth} × {originalHeight} px
              </p>
              <img src={preview} alt="Original preview" className="preview-img" />
            </div>
          )}

          {preview && (
            <div className="resizer-controls">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={keepAspect}
                  onChange={(e) => setKeepAspect(e.target.checked)}
                />
                Keep aspect ratio
              </label>

              <div className="dimensions">
                <div className="dimension-input">
                  <label>Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div className="dimension-input">
                  <label>Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>

              <div className="resizer-options">
                <div className="option-group">
                  <label>Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
                {format !== "image/png" && (
                  <div className="option-group">
                    <label>Quality: {quality}%</label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                    />
                  </div>
                )}
              </div>

              <button className="generate" onClick={resizeImage}>
                🔄 Resize Image
              </button>
            </div>
          )}

          {result && (
            <div className="resizer-result">
              <h2>Result: {width} × {height} px</h2>
              <img src={result} alt="Resized result" className="preview-img" />
              <button className="download-btn" onClick={download}>
                ⬇ Download Resized Image
              </button>
            </div>
          )}

          <div className="info-section">
            <h2>How to resize an image?</h2>
            <p>Upload an image, choose the new dimensions, optionally keep the aspect ratio, then download the resized file.</p>

            <h2>Why use AUQAB Image Resizer?</h2>
            <ul>
              <li>Free online image resizing</li>
              <li>Works directly in your browser</li>
              <li>No image upload to server</li>
              <li>Works on mobile and desktop</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            <h3>Are my images stored?</h3>
            <p>No. Images are processed locally in your browser and never leave your device.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ImageResizer;
