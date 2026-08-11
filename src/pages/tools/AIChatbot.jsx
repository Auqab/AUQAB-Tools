import { useState, useRef, useEffect } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function AIChatbot() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("openai_key") || "");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("openai_key", apiKey);
  }, [apiKey]);

  const sendMessage = async () => {
    if (!input || !apiKey) return;
    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMsgs,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No response.";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
      trackEvent("ai_chatbot", { tool: "ai_chatbot" });
    } catch {
      alert("Error: Check your API key or network.");
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="AI Chatbot - AUQAB Tools" description="Chat with OpenAI GPT." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🤖 AI Chatbot</h1>
          <p className="tool-description">Enter your OpenAI API key to start chatting.</p>
          <input type="password" placeholder="OpenAI API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="url-input" />
          <div style={{ maxHeight: 300, overflowY: "auto", margin: "15px 0", textAlign: "left" }}>
            {messages.map((m, i) => (
              <p key={i}><strong>{m.role}:</strong> {m.content}</p>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." className="url-input" />
            <button className="generate" onClick={sendMessage} disabled={loading || !apiKey}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default AIChatbot;
