import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";
import { LoremIpsum } from "lorem-ipsum";

const generator = new LoremIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 },
});

function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    const text = generator.generateParagraphs(paragraphs);
    setOutput(text);
    showToast("Lorem Ipsum generated!");
    trackEvent("lorem_generate", { tool: "lorem_generator" });
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="Lorem Ipsum Generator - AUQAB Tools"
        description="Generate placeholder text for your designs and prototypes."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>Lorem Ipsum Generator</h1>
          <p className="tool-description">
            Generate classic dummy text in paragraphs. Useful for mockups and layouts.
          </p>

          <div className="lorem-controls">
            <div className="setting">
              <label>
                Paragraphs: <strong>{paragraphs}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
              />
            </div>
            <button className="generate" onClick={generate}>
              Generate Lorem Ipsum
            </button>
          </div>

          {output && (
            <div className="lorem-output">
              <textarea readOnly rows="12" value={output} />
              <button className="generate" onClick={copyOutput} style={{ marginTop: 10 }}>
                Copy Text
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default LoremIpsumGenerator;
