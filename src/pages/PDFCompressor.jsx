import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

function PDFCompressor() {
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setOriginalSize(f.size);
  };

  const compressPDF = async () => {
    if (!file) return;
    setCompressing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // ضغط بسيط عبر إعادة حفظ الصفحات (يقلل بعض البيانات الوصفية)
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });
      
      const blob = new Blob([compressedBytes], { type: "application/pdf" });
      setCompressedSize(blob.size);
      
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name.replace(".pdf", "_compressed.pdf");
      link.click();
      URL.revokeObjectURL(link.href);
      
      trackEvent("pdf_compress", { tool: "pdf_compressor" });
    } catch (e) {
      alert("Compression failed. The PDF may be corrupted.");
    }
    setCompressing(false);
  };

  return (
    <>
      <SEO
        title="PDF Compressor - AUQAB Tools"
        description="Reduce PDF file size online."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>🗜️ PDF Compressor</h1>
          <p className="tool-description">
            Upload a PDF and download a compressed version.
          </p>
          
          <input type="file" accept="application/pdf" onChange={handleFile} className="file-input" />
          
          {file && (
            <p className="original-info">
              Original size: {(originalSize / 1024).toFixed(1)} KB
            </p>
          )}
          
          <button
            className="generate"
            onClick={compressPDF}
            disabled={!file || compressing}
            style={{ marginTop: 15 }}
          >
            {compressing ? "⏳ Compressing..." : "🗜️ Compress PDF"}
          </button>
          
          {compressedSize > 0 && (
            <p className="compressed-info">
              Compressed size: {(compressedSize / 1024).toFixed(1)} KB
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default PDFCompressor;
