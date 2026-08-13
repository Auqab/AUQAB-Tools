import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function PDFToImage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setImages([]);
  };

  const convertToImages = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) throw new Error("PDF library not loaded");

      pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const pageImages = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current || document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;
        pageImages.push(canvas.toDataURL("image/jpeg", 0.9));
      }

      setImages(pageImages);
      showToast("PDF converted to images successfully!");
      trackEvent("pdf_to_image", { tool: "pdf_to_image" });
    } catch {
      showToast("Conversion failed. PDF may be corrupted or library not loaded.", "error");
    }
    setLoading(false);
  };

  const downloadImage = (dataUrl, index) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `page_${index + 1}.jpg`;
    link.click();
    showToast(`Page ${index + 1} downloaded!`);
  };

  return (
    <>
      <SEO
        title="PDF to Image - AUQAB Tools"
        description="Convert PDF pages to JPG images online."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>PDF to Image</h1>
          <p className="tool-description">
            Convert each page of a PDF into a separate image.
          </p>

          <input type="file" accept="application/pdf" onChange={handleFile} className="file-input" />

          <button
            className="generate"
            onClick={convertToImages}
            disabled={!file || loading}
            style={{ margin: "15px 0" }}
          >
            {loading ? "Converting..." : "Convert to Images"}
          </button>

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {images.length > 0 && (
            <div className="image-grid">
              {images.map((img, idx) => (
                <div key={idx} className="image-item">
                  <img src={img} alt={`Page ${idx + 1}`} style={{ maxWidth: "100%", borderRadius: 10 }} />
                  <button className="download-btn small" onClick={() => downloadImage(img, idx)}>
                    Download Page {idx + 1}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PDFToImage;
