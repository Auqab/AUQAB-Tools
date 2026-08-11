import { useState } from "react";
import SEO from "../../components/SEO";

function AgeCalculator() {
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState("");

  const calc = () => {
    if (!birth) return;
    const today = new Date();
    const dob = new Date(birth);
    let years = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) years--;
    setAge(years);
  };

  return (
    <>
      <SEO title="Age Calculator - AUQAB Tools" description="Calculate your exact age." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🎂 Age Calculator</h1>
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="url-input" />
          <button className="generate" style={{ margin: "15px 0" }} onClick={calc}>Calculate Age</button>
          {age !== "" && <h2 style={{ color: "#38bdf8" }}>You are {age} years old</h2>}
        </div>
      </section>
    </>
  );
}

export default AgeCalculator;
