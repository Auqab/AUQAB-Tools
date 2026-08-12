import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Welcome to AUQAB Markdown Previewer

**Bold text** and *italic text*.

- List item 1
- List item 2

[AUQAB Tools](https://auqab.tools)`);

  const [html, setHtml] = useState("");

  const handleChange = async (e) => {
    const value = e.target.value;
    setMarkdown(value);
    const { marked } = await import("marked");
    setHtml(marked(value));
    trackEvent("markdown_preview", { tool: "markdown_previewer" });
  };

  // تهيئة أولية
  useState(() => {
    (async () => {
      const { marked } = await import("marked");
      setHtml(marked(markdown));
    })();
  }, []);

  const copyHtml = () => {
    navigator.clipboard.writeText(html);
    trackEvent("markdown_copy", { tool: "markdown_previewer" });
  };

  return (
    <>
      <SEO title="Free Markdown Previewer - AUQAB Tools" description="Write Markdown and see the live preview instantly." />
      <section className="tool-page">
        <div className="password-card">
          <h1>📝 Markdown Previewer</h1>
          <p className="tool-description">Write Markdown on the left and see the HTML preview on the right.</p>

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
            <button className="generate" onClick={copyHtml}>📋 Copy HTML</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarkdownPreviewer;
