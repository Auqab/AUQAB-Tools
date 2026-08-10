import { useState } from "react";
import SEO from "../components/SEO";

function PasswordMemeInfo() {
  const [pwd, setPwd] = useState("");
  const [meme, setMeme] = useState("");

  const generateMeme = () => {
    if (!pwd) return;
    const len = pwd.length;
    let msg = "";
    if (len < 6) msg = "Even a goldfish would remember that. 🐠";
    else if (len < 10) msg = "Decent... but a cat walking on a keyboard could do better. 🐱";
    else msg = "This is the kind of password that makes hackers cry. 😭";
    setMeme(msg);
  };

  return (
    <>
      <SEO title="Password Meme Info - AUQAB Tools" description="Funny feedback on your password length." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🔐 Password Meme Info</h1>
          <input type="password" placeholder="Enter password..." value={pwd} onChange={(e) => setPwd(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={generateMeme}>🎭 Generate Meme</button>
          {meme && <div className="converter-result"><p style={{ fontSize: 20 }}>{meme}</p></div>}
        </div>
      </section>
    </>
  );
}

export default PasswordMemeInfo;
