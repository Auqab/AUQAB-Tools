import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function PDFMerger() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);

  const handleFiles = (e) => {
    setFiles([...e.target.files]);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "merged.pdf";
      link.click();
      URL.revokeObjectURL(link.href);
      showToast("PDFs merged successfully!");
      trackEvent("pdf_merge", { tool: "pdf_merger" });
    } catch {
      showToast("Merge failed. Ensure files are valid PDFs.", "error");
    }
    setMerging(false);
  };

  return (
    <>
      <SEO
        title="PDF Merger - AUQAB Tools"
        description="Combine multiple PDF files into one."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>PDF Merger</h1>
          <p className="tool-description">Select two or more PDF files and merge them into a single document.</p>

          <input type="file" accept="application/pdf" multiple onChange={handleFiles} className="file-input" />

          {files.length > 0 && (
            <div className="pdf-list">
              <h3>Files ({files.length})</h3>
              {Array.from(files).map((f, i) => (
                <div key={i} className="uuid-row">
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          )}

          <button
            className="generate"
            onClick={mergePDFs}
            disabled={files.length < 2 || merging}
            style={{ marginTop: 15 }}
          >
            {merging ? "Merging..." : "Merge PDFs"}
          </button>
        </div>
      </section>
    </>
  );
}

export default PDFMerger;
