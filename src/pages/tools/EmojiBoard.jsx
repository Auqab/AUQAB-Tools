import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const emojis = ["😀","😂","😍","🥺","😎","🔥","🎉","💯","✅","❤️","👍","🙏","🤔","😢","😡","🥳","🎂","🍕","⚽","🚀","🌈","⭐","🌸","💻","📱"];

function EmojiBoard() {
  const [copiedEmoji, setCopiedEmoji] = useState(null);

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
    showToast("Emoji copied!");
    trackEvent("emoji_copy", { tool: "emoji_board" });
    setTimeout(() => setCopiedEmoji(null), 1500);
  };

  return (
    <>
      <SEO
        title="Emoji Copy Board - AUQAB Tools"
        description="Click to copy emojis instantly."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Emoji Copy Board</h1>
          <p className="tool-description">Click any emoji to copy it to your clipboard.</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 15, justifyContent: "center", fontSize: 36 }}>
            {emojis.map((e) => (
              <span
                key={e}
                onClick={() => copyEmoji(e)}
                style={{
                  cursor: "pointer",
                  transition: "0.2s",
                  transform: copiedEmoji === e ? "scale(1.3)" : "scale(1)",
                }}
              >
                {e}
              </span>
            ))}
          </div>

          {copiedEmoji && (
            <p style={{ marginTop: 15, color: "#22c55e" }}>
              Copied {copiedEmoji}!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default EmojiBoard;
