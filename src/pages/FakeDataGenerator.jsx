import { useState } from "react";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

const generatorsList = [
  "Full Name", "Email", "Phone", "Address", "City", "Country",
  "Company", "Sentence", "Paragraph", "UUID", "Date", "Number (1-1000)",
];

function FakeDataGenerator() {
  const [selected, setSelected] = useState("Full Name");
  const [count, setCount] = useState(5);
  const [results, setResults] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const { faker } = await import("@faker-js/faker");
      const genMap = {
        "Full Name": () => faker.person.fullName(),
        Email: () => faker.internet.email(),
        Phone: () => faker.phone.number(),
        Address: () => faker.location.streetAddress(),
        City: () => faker.location.city(),
        Country: () => faker.location.country(),
        Company: () => faker.company.name(),
        Sentence: () => faker.lorem.sentence(),
        Paragraph: () => faker.lorem.paragraph(),
        UUID: () => faker.string.uuid(),
        Date: () => faker.date.recent().toISOString().split("T")[0],
        "Number (1-1000)": () => faker.number.int({ min: 1, max: 1000 }),
      };

      const items = [];
      for (let i = 0; i < count; i++) {
        items.push(genMap[selected]());
      }
      setResults(items);
      trackEvent("fake_data", { tool: "fake_data_generator" });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <SEO
        title="Fake Data Generator - AUQAB Tools"
        description="Generate realistic fake data for testing."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>👤 Fake Data Generator</h1>
          <p className="tool-description">
            Generate names, emails, addresses, and more for your projects.
          </p>

          <div className="fake-controls">
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
              {generatorsList.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <div className="cron-field">
              <label>Count</label>
              <input type="number" min="1" max="20" value={count} onChange={(e) => setCount(+e.target.value)} />
            </div>
            <button className="generate" onClick={generate} disabled={loading}>
              {loading ? "⏳ Loading..." : "✨ Generate"}
            </button>
          </div>

          {results.length > 0 && (
            <div className="fake-results">
              <div className="uuid-list">
                {results.map((item, i) => (
                  <div key={i} className="uuid-row">
                    <code>{item}</code>
                  </div>
                ))}
              </div>
              <button className="generate" onClick={copyAll}>
                {copied ? "✅ Copied!" : "📋 Copy All"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default FakeDataGenerator;
