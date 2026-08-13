import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Life is what happens when you're busy making other plans. – John Lennon",
  "Get busy living or get busy dying. – Stephen King",
  "You miss 100% of the shots you don't take. – Wayne Gretzky",
  "In the end, we only regret the chances we didn't take.",
  "Stay hungry, stay foolish. – Steve Jobs",
];

function RandomQuoteGenerator() {
  const [quote, setQuote] = useState("");

  const generate = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
    showToast("New quote generated!");
    trackEvent("quote_generate", { tool: "random_quote_generator" });
  };

  const copy = () => {
    if (!quote) return;
    navigator.clipboard.writeText(quote);
    showToast("Quote copied!");
  };

  return (
    <>
      <SEO
        title="Random Quote Generator - AUQAB Tools"
        description="Get a random inspirational quote."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Random Quote</h1>
          <p className="tool-description">Generate a random inspirational quote.</p>

          <button className="generate" onClick={generate} style={{ marginBottom: 15 }}>
            Generate Quote
          </button>

          {quote && (
            <div className="converter-result">
              <p style={{ fontSize: 20 }}>{quote}</p>
              <button className="open-tool-btn" onClick={copy}>
                Copy Quote
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default RandomQuoteGenerator;
