import { useState, useRef } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function ImageCropper() {
  const [src, setSrc] = useState(null);
  const [cropped, setCropped] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
  const imgRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [format, setFormat] = useState("image/jpeg");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(file);
    setCropped(null);
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.nativeEvent.offsetX - crop.x, y: e.nativeEvent.offsetY - crop.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const x = Math.min(Math.max(e.nativeEvent.offsetX - dragStart.x, 0), imgRef.current.naturalWidth - crop.w);
    const y = Math.min(Math.max(e.nativeEvent.offsetY - dragStart.y, 0), imgRef.current.naturalHeight - crop.h);
    setCrop({ ...crop, x, y });
  };

  const handleMouseUp = () => setDragging(false);

  const applyCrop = () => {
    const canvas = document.createElement("canvas");
    canvas.width = crop.w;
    canvas.height = crop.h;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
    const dataUrl = canvas.toDataURL(format, 0.9);
    setCropped(dataUrl);
    trackEvent("image_crop", { tool: "image_cropper" });
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = cropped;
    link.download = `cropped.${format.split("/")[1]}`;
    link.click();
  };

  return (
    <>
      <SEO title="Image Cropper - AUQAB Tools" description="Crop images online with mouse and download the result." />

      <section className="tool-page">
        <div className="password-card">
          <h1>✂️ Image Cropper</h1>
          <p className="tool-description">Upload an image, drag the crop area, adjust size, and download.</p>

          <input type="file" accept="image/*" onChange={handleImage} className="file-input" />

          {src && (
            <div className="crop-container">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  ref={imgRef}
                  src={src}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  style={{ maxWidth: "100%", maxHeight: 400, cursor: "crosshair" }}
                  alt="crop"
                />
                <div
                  style={{
                    position: "absolute",
                    left: crop.x,
                    top: crop.y,
                    width: crop.w,
                    height: crop.h,
                    border: "2px solid #38bdf8",
                    backgroundColor: "rgba(56,189,248,0.1)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              <div className="crop-settings">
                <div className="dimension-input">
                  <label>Width</label>
                  <input type="number" value={crop.w} onChange={(e) => setCrop({ ...crop, w: +e.target.value })} />
                </div>
                <div className="dimension-input">
                  <label>Height</label>
                  <input type="number" value={crop.h} onChange={(e) => setCrop({ ...crop, h: +e.target.value })} />
                </div>
                <div className="option-group">
                  <label>Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
                <button className="generate" onClick={applyCrop}>✂️ Crop</button>
              </div>
            </div>
          )}

          {cropped && (
            <div className="crop-result">
              <h3>Result</h3>
              <img src={cropped} alt="cropped" className="scanner-media" />
              <button className="download-btn" onClick={download}>⬇️ Download</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ImageCropper;
