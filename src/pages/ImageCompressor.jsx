import { useState } from "react";
import SEO from "../components/SEO";
import { showToast } from "../components/Toast";
import { trackEvent } from "../utils/analytics";

function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressed, setCompressed] = useState("");
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState("image/jpeg");
  const [maxWidth, setMaxWidth] = useState(1920);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    setCompressed("");
    setCompressedSize(0);
  };

  const compressImage = () => {
    if (!image || !preview) return;
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round(height * (maxWidth / width));
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = format === "image/png" ? "image/png" : format === "image/webp" ? "image/webp" : "image/jpeg";
      const qualityValue = mimeType === "image/png" ? undefined : quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setCompressed(url);
          setCompressedSize(blob.size);
          showToast("Image compressed!");
          trackEvent("image_compress", { tool: "image_compressor" });
        },
        mimeType,
        qualityValue
      );
    };
  };

  const reductionPercent = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  const downloadCompressed = () => {
    const link = document.createElement("a");
    link.href = compressed;
    link.download = `compressed.${format.split("/")[1]}`;
    link.click();
  };

  return (
    <>
      <SEO
        title="Image Compressor - AUQAB Tools"
        description="Compress JPG, PNG and WebP images online. Compare before and after quality."
      />
      <section className="tool-page">
        <div className="password-card img-compress-card">
          <h1>Image Compressor</h1>
          <p className="tool-description">
            Compress JPG, PNG & WebP images. Adjust quality and see the difference instantly.
          </p>

          <input type="file" accept="image/*" onChange={handleImage} className="file-input" />

          {preview && (
            <div className="compressor-preview">
              <div className="preview-box">
                <h4>Original</h4>
                <img src={preview} alt="Original" />
                <span className="size-badge">{(originalSize / 1024).toFixed(1)} KB</span>
              </div>
              {compressed && (
                <div className="preview-box">
                  <h4>Compressed</h4>
                  <img src={compressed} alt="Compressed" />
                  <span className="size-badge compressed-badge">
                    {(compressedSize / 1024).toFixed(1)} KB
                    {reductionPercent > 0 && <span className="reduction"> (-{reductionPercent}%)</span>}
                  </span>
                </div>
              )}
            </div>
          )}

          {preview && (
            <div className="compressor-controls">
              <div className="setting">
                <label>Quality: <strong>{quality}%</strong></label>
                <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
              </div>
              <div className="option-group">
                <label>Format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="image/jpeg">JPEG (smaller)</option>
                  <option value="image/png">PNG (lossless)</option>
                  <option value="image/webp">WebP (recommended)</option>
                </select>
              </div>
              <div className="option-group">
                <label>Max Width</label>
                <select value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))}>
                  <option value="800">800px</option>
                  <option value="1200">1200px</option>
                  <option value="1920">1920px</option>
                  <option value="3840">Original</option>
                </select>
              </div>

              <button className="generate" onClick={compressImage}>
                Compress Image
              </button>

              {compressed && (
                <button className="download-btn" onClick={downloadCompressed}>
                  Download Compressed Image
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ImageCompressor;
