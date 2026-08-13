import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Welcome to AUQAB Markdown Previewer

**Bold text** and *italic text*.

- List item 1
- List item 2

[AUQAB Tools](https://auqab.tools)`);

  const [html, setHtml] = useState("");

  // تحميل marked بشكل ديناميكي
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { marked } = await import("marked");
      if (isMounted) {
        setHtml(marked(markdown));
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setMarkdown(value);
    try {
      const { marked } = await import("marked");
      setHtml(marked(value));
      trackEvent("markdown_preview", { tool: "markdown_previewer" });
    } catch {
      showToast("Failed to render markdown", "error");
    }
  };

  const copyHtml = () => {
    if (!html) return;
    navigator.clipboard.writeText(html);
    showToast("HTML copied!");
    trackEvent("markdown_copy", { tool: "markdown_previewer" });
  };

  return (
    <>
      <SEO
        title="Free Markdown Previewer - AUQAB Tools"
        description="Write Markdown and see the live preview instantly. Free online Markdown editor."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>Markdown Previewer</h1>
          <p className="tool-description">
            Write Markdown on the left and see the HTML preview on the right.
          </p>

          <div className="markdown-container">
            <textarea
              className="markdown-input"
              value={markdown}
              onChange={handleChange}
              spellCheck="false"
            />
            <div
              className="markdown-preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          <div className="markdown-actions">
            <button className="generate" onClick={copyHtml}>
              Copy HTML
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarkdownPreviewer;
