import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function SQLFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatSQL = async () => {
    try {
      const { format } = await import("sql-formatter");
      const formatted = format(input);
      setOutput(formatted);
      trackEvent("sql_format", { tool: "sql_formatter" });
    } catch {
      setOutput("Invalid SQL syntax.");
    }
  };

  return (
    <>
      <SEO title="SQL Formatter - AUQAB Tools" description="Format and beautify SQL queries online." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🗄️ SQL Formatter</h1>
          <p className="tool-description">Paste unformatted SQL and get a beautifully indented version.</p>

          <textarea rows="8" placeholder="SELECT * FROM ..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="generate" style={{ margin: "15px 0" }} onClick={formatSQL}>✨ Format SQL</button>

          {output && (
            <div>
              <textarea rows="8" readOnly value={output} />
              <button className="generate" onClick={() => { navigator.clipboard.writeText(output); trackEvent("sql_copy", { tool: "sql_formatter" }); }}>
                📋 Copy
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SQLFormatterPage;
