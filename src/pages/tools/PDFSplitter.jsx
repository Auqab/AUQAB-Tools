import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function PDFSplitter() {
  const [file, setFile] = useState(null);
  const [ranges, setRanges] = useState("1-3,5");
  const [splitting, setSplitting] = useState(false);

  const handleFile = (e) => setFile(e.target.files[0]);

  const splitPDF = async () => {
    if (!file) return;
    setSplitting(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const totalPages = srcPdf.getPageCount();

      const parts = ranges.split(",").map((r) => r.trim());
      const selectedPages = [];
      parts.forEach((part) => {
        const rangeMatch = part.match(/^(\d+)-(\d+)$/);
        if (rangeMatch) {
          const start = parseInt(rangeMatch[1], 10);
          const end = parseInt(rangeMatch[2], 10);
          for (let i = start; i <= end && i <= totalPages; i++) selectedPages.push(i - 1);
        } else {
          const num = parseInt(part, 10);
          if (num <= totalPages) selectedPages.push(num - 1);
        }
      });

      if (selectedPages.length === 0) {
        showToast("No valid pages selected.", "error");
        setSplitting(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, selectedPages);
      copiedPages.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "split.pdf";
      link.click();
      URL.revokeObjectURL(link.href);
      showToast("PDF split successfully!");
      trackEvent("pdf_split", { tool: "pdf_splitter" });
    } catch {
      showToast("Split failed. Check the file and page ranges.", "error");
    }
    setSplitting(false);
  };

  return (
    <>
      <SEO
        title="PDF Splitter - AUQAB Tools"
        description="Extract pages from a PDF file."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>PDF Splitter</h1>
          <p className="tool-description">
            Upload a PDF and specify page ranges to extract.
          </p>

          <input type="file" accept="application/pdf" onChange={handleFile} className="file-input" />

          <input
            type="text"
            placeholder="e.g. 1-3,5,7-9"
            value={ranges}
            onChange={(e) => setRanges(e.target.value)}
            className="url-input"
            style={{ margin: "15px 0" }}
          />

          <button
            className="generate"
            onClick={splitPDF}
            disabled={!file || splitting}
          >
            {splitting ? "Splitting..." : "Split PDF"}
          </button>
        </div>
      </section>
    </>
  );
}

export default PDFSplitter;
