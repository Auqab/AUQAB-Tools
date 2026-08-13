import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function ImagesToPDF() {
  const [images, setImages] = useState([]);
  const [creating, setCreating] = useState(false);

  const handleFiles = (e) => {
    setImages([...e.target.files]);
  };

  const createPDF = async () => {
    if (images.length === 0) return;
    setCreating(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();

      for (const file of images) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === "image/jpeg") {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // محاولة تضمين أي صورة كـ JPEG
          image = await pdfDoc.embedJpg(arrayBuffer);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "images.pdf";
      link.click();
      URL.revokeObjectURL(link.href);

      showToast("PDF created successfully!");
      trackEvent("images_to_pdf", { tool: "images_to_pdf" });
    } catch {
      showToast("Failed to create PDF. Check your images.", "error");
    }
    setCreating(false);
  };

  return (
    <>
      <SEO
        title="Images to PDF - AUQAB Tools"
        description="Combine multiple images into a single PDF file."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Images to PDF</h1>
          <p className="tool-description">
            Select images and combine them into a single PDF document.
          </p>

          <input type="file" accept="image/*" multiple onChange={handleFiles} className="file-input" />

          {images.length > 0 && (
            <div className="pdf-list">
              <h3>{images.length} image(s) selected</h3>
              {Array.from(images).map((f, i) => (
                <div key={i} className="uuid-row">
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          )}

          <button
            className="generate"
            onClick={createPDF}
            disabled={images.length === 0 || creating}
            style={{ marginTop: 15 }}
          >
            {creating ? "Creating PDF..." : "Create PDF"}
          </button>
        </div>
      </section>
    </>
  );
}

export default ImagesToPDF;
