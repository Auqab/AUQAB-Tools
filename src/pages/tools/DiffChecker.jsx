import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";
import { diffLines, diffWords } from "diff";

function DiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState(null);
  const [mode, setMode] = useState("lines"); // lines | words

  const handleCompare = () => {
    let diff;
    if (mode === "lines") {
      diff = diffLines(text1, text2);
    } else {
      diff = diffWords(text1, text2);
    }

    setDiffResult(diff);
    trackEvent("diff_compare", { tool: "diff_checker", mode });
  };

  const clearAll = () => {
    setText1("");
    setText2("");
    setDiffResult(null);
  };

  const renderDiff = (diff) => {
    return diff.map((part, idx) => {
      const color = part.added
        ? "#22c55e"
        : part.removed
        ? "#ef4444"
        : "transparent";
      return (
        <span
          key={idx}
          style={{
            backgroundColor: color,
            color: part.added || part.removed ? "white" : "inherit",
            padding: "1px 3px",
            borderRadius: "3px",
          }}
        >
          {part.value}
        </span>
      );
    });
  };

  return (
    <>
      <SEO
        title="Free Diff Checker - AUQAB Tools"
        description="Compare two texts and see the differences line by line or word by word."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>🔍 Diff Checker</h1>
          <p className="tool-description">
            Compare two texts side by side and highlight the differences.
          </p>

          <div className="diff-mode">
            <label>
              <input
                type="radio"
                value="lines"
                checked={mode === "lines"}
                onChange={() => setMode("lines")}
              />
              Lines
            </label>
            <label>
              <input
                type="radio"
                value="words"
                checked={mode === "words"}
                onChange={() => setMode("words")}
              />
              Words
            </label>
          </div>

          <div className="diff-inputs">
            <textarea
              placeholder="Original text..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            />
            <textarea
              placeholder="Changed text..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            />
          </div>

          <div className="diff-actions">
            <button className="generate" onClick={handleCompare}>
              ⚡ Compare
            </button>
            <button className="clear-btn" onClick={clearAll}>
              ✕ Clear
            </button>
          </div>

          {diffResult && (
            <div className="diff-result">
              <h3>Differences:</h3>
              <div className="diff-output">{renderDiff(diffResult)}</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default DiffChecker;
