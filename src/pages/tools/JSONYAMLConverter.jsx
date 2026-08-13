import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function JSONYAMLConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("json2yaml");

  const convert = async () => {
    try {
      const yaml = await import("js-yaml");
      let result = "";
      if (mode === "json2yaml") {
        const obj = JSON.parse(input);
        result = yaml.dump(obj);
      } else {
        const obj = yaml.load(input);
        result = JSON.stringify(obj, null, 2);
      }
      setOutput(result);
      showToast("Conversion successful!");
      trackEvent("convert_json_yaml", { tool: "json_yaml_converter", mode });
    } catch {
      setOutput("Invalid input.");
      showToast("Invalid input", "error");
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="JSON ↔ YAML Converter - AUQAB Tools"
        description="Convert between JSON and YAML formats."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>JSON ↔ YAML Converter</h1>
          <p className="tool-description">Switch between JSON and YAML instantly.</p>

          <div className="diff-mode">
            <label>
              <input
                type="radio"
                value="json2yaml"
                checked={mode === "json2yaml"}
                onChange={() => setMode("json2yaml")}
              />
              JSON to YAML
            </label>
            <label>
              <input
                type="radio"
                value="yaml2json"
                checked={mode === "yaml2json"}
                onChange={() => setMode("yaml2json")}
              />
              YAML to JSON
            </label>
          </div>

          <textarea
            rows="8"
            placeholder={mode === "json2yaml" ? '{"key": "value"}' : "key: value"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="generate" style={{ margin: "15px 0" }} onClick={convert}>
            Convert
          </button>

          {output && (
            <div>
              <textarea rows="8" readOnly value={output} />
              <button className="generate" style={{ marginTop: 10 }} onClick={copyOutput}>
                Copy Result
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default JSONYAMLConverter;
