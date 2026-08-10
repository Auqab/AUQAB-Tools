import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

const emojis = ["😀","😂","😍","🥺","😎","🔥","🎉","💯","✅","❤️","👍","🙏","🤔","😢","😡","🥳","🎂","🍕","⚽","🚀","🌈","⭐","🌸","💻","📱"];

function EmojiBoard() {
  const [copied, setCopied] = useState(null);

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    trackEvent("emoji_copy", { tool: "emoji_board" });
    setTimeout(() => setCopied(null), 1000);
  };

  return (
    <>
      <SEO title="Emoji Copy Board - AUQAB Tools" description="Click to copy emojis instantly." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🎭 Emoji Copy Board</h1>
          <p className="tool-description">Click any emoji to copy it to clipboard.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 15, justifyContent: "center", fontSize: 36 }}>
            {emojis.map((e) => (
              <span key={e} onClick={() => copyEmoji(e)} style={{ cursor: "pointer", transition: "0.2s", transform: copied === e ? "scale(1.3)" : "scale(1)" }}>
                {e}
              </span>
            ))}
          </div>
          {copied && <p style={{ marginTop: 15, color: "#22c55e" }}>Copied {copied}!</p>}
        </div>
      </section>
    </>
  );
}

export default EmojiBoard;
