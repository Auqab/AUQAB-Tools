import { useState } from "react";
import SEO from "../components/SEO";

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
  };

  const copy = () => navigator.clipboard.writeText(quote);

  return (
    <>
      <SEO title="Random Quote Generator - AUQAB Tools" description="Get a random inspirational quote." />
      <section className="tool-page">
        <div className="password-card">
          <h1>💬 Random Quote</h1>
          <button className="generate" onClick={generate} style={{ marginBottom: 15 }}>✨ Generate Quote</button>
          {quote && (
            <>
              <div className="converter-result"><p style={{ fontSize: 20 }}>{quote}</p></div>
              <button className="generate" style={{ marginTop: 10 }} onClick={copy}>📋 Copy</button>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default RandomQuoteGenerator;
