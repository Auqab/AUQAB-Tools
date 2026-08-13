import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const filters = [
  { name: "Original", apply: null },
  {
    name: "Grayscale",
    apply: (ctx, w, h, img) => {
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      for (let i = 0; i < d.length; i += 4) {
        const avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
        d[i] = d[i + 1] = d[i + 2] = avg;
      }
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    },
  },
  {
    name: "Sepia",
    apply: (ctx, w, h, img) => {
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        d[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        d[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      }
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    },
  },
  {
    name: "Invert",
    apply: (ctx, w, h, img) => {
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      for (let i = 0; i < d.length; i += 4) {
        d[i] = 255 - d[i];
        d[i + 1] = 255 - d[i + 1];
        d[i + 2] = 255 - d[i + 2];
      }
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    },
  },
  {
    name: "High Contrast",
    apply: (ctx, w, h, img) => {
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, w, h).data;
      for (let i = 0; i < d.length; i += 4) {
        const avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
        const v = avg > 128 ? 255 : 0;
        d[i] = d[i + 1] = d[i + 2] = v;
      }
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    },
  },
  {
    name: "Blur",
    apply: (ctx, w, h, img) => {
      ctx.filter = "blur(4px)";
      ctx.drawImage(img, 0, 0);
      ctx.filter = "none";
    },
  },
];

function ImageFilters() {
  const [src, setSrc] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const applyFilter = (filter) => {
    if (!src) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (filter.apply) {
        filter.apply(ctx, img.width, img.height, img);
      } else {
        ctx.drawImage(img, 0, 0);
      }
      setFiltered(canvas.toDataURL("image/jpeg", 0.9));
      showToast(`Filter applied: ${filter.name}`);
      trackEvent("image_filter", { tool: "image_filters", filter: filter.name });
    };
    img.src = src;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result);
      setFiltered(null);
    };
    reader.readAsDataURL(file);
  };

  const download = () => {
    if (!filtered) return;
    const link = document.createElement("a");
    link.href = filtered;
    link.download = "filtered.jpg";
    link.click();
    showToast("Download started!");
  };

  return (
    <>
      <SEO
        title="Image Filters - AUQAB Tools"
        description="Apply filters to your images online."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Image Filters</h1>
          <p className="tool-description">Upload an image and apply artistic filters.</p>

          <input type="file" accept="image/*" onChange={handleImage} className="file-input" />

          {src && (
            <div>
              <img src={src} alt="original" className="scanner-media" />
              <div className="filter-buttons">
                {filters.map((f) => (
                  <button key={f.name} className="case-btn" onClick={() => applyFilter(f)}>
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filtered && (
            <div>
              <h3>Result</h3>
              <img src={filtered} alt="filtered" className="scanner-media" />
              <button className="download-btn" onClick={download}>
                Download
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </section>
    </>
  );
}

export default ImageFilters;
