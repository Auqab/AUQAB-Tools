import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function TextToSlug() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");
  const [separator, setSeparator] = useState("-");
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    const slugified = text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // إزالة علامات التشكيل
      .toLowerCase()
      .trim()
      .replace(/\s+/g, separator) // مسافات إلى فاصل
      .replace(/[^\w-]+/g, "") // إزالة الأحرف غير المرغوبة
      .replace(new RegExp(`${separator}+`, "g"), separator); // فاصل مكرر
    setSlug(slugified);
    trackEvent("slug_generate", { tool: "text_to_slug" });
  };

  const copySlug = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <SEO
        title="Text to Slug Converter - AUQAB Tools"
        description="Convert any text into a URL-friendly slug. Choose separator and copy instantly."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔗 Text to Slug</h1>
          <p className="tool-description">
            Create clean, readable slugs for URLs, filenames, or IDs.
          </p>

          <textarea
            rows="4"
            placeholder="Enter text to slugify..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="slug-options">
            <div className="option-group">
              <label>Separator</label>
              <select value={separator} onChange={(e) => setSeparator(e.target.value)}>
                <option value="-">Dash (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Dot (.)</option>
              </select>
            </div>
            <button className="generate" onClick={generateSlug}>
              ⚡ Generate Slug
            </button>
          </div>

          {slug && (
            <div className="slug-result">
              <div className="uuid-row">
                <code>{slug}</code>
                <button className="copy-btn-mini" onClick={copySlug}>
                  {copied ? "✅" : "📋"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default TextToSlug;
