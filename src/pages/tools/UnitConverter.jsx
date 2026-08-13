import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const categories = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meter (m)", toBase: 1 },
      kilometer: { name: "Kilometer (km)", toBase: 1000 },
      centimeter: { name: "Centimeter (cm)", toBase: 0.01 },
      millimeter: { name: "Millimeter (mm)", toBase: 0.001 },
      mile: { name: "Mile (mi)", toBase: 1609.34 },
      yard: { name: "Yard (yd)", toBase: 0.9144 },
      foot: { name: "Foot (ft)", toBase: 0.3048 },
      inch: { name: "Inch (in)", toBase: 0.0254 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilogram (kg)", toBase: 1 },
      gram: { name: "Gram (g)", toBase: 0.001 },
      milligram: { name: "Milligram (mg)", toBase: 0.000001 },
      pound: { name: "Pound (lb)", toBase: 0.453592 },
      ounce: { name: "Ounce (oz)", toBase: 0.0283495 },
      ton: { name: "Ton (t)", toBase: 1000 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius (°C)", special: true },
      fahrenheit: { name: "Fahrenheit (°F)", special: true },
      kelvin: { name: "Kelvin (K)", special: true },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liter (L)", toBase: 1 },
      milliliter: { name: "Milliliter (mL)", toBase: 0.001 },
      gallon: { name: "US Gallon", toBase: 3.78541 },
      quart: { name: "US Quart", toBase: 0.946353 },
      pint: { name: "US Pint", toBase: 0.473176 },
      cup: { name: "US Cup", toBase: 0.236588 },
    },
  },
  speed: {
    name: "Speed",
    units: {
      ms: { name: "m/s", toBase: 1 },
      kmh: { name: "km/h", toBase: 0.277778 },
      mph: { name: "mph", toBase: 0.44704 },
      knot: { name: "Knot", toBase: 0.514444 },
    },
  },
  area: {
    name: "Area",
    units: {
      sqmeter: { name: "m²", toBase: 1 },
      sqkilometer: { name: "km²", toBase: 1000000 },
      sqfoot: { name: "ft²", toBase: 0.092903 },
      acre: { name: "Acre", toBase: 4046.86 },
      hectare: { name: "Hectare", toBase: 10000 },
    },
  },
};

function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("centimeter");
  const [result, setResult] = useState("");
  const [formula, setFormula] = useState("");

  const units = categories[category]?.units || {};
  const unitKeys = Object.keys(units);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const keys = Object.keys(categories[cat].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  };

  function convertTemperature(val, from, to) {
    let celsius;
    if (from === "celsius") celsius = val;
    else if (from === "fahrenheit") celsius = (val - 32) * (5 / 9);
    else if (from === "kelvin") celsius = val - 273.15;

    if (to === "celsius") return celsius;
    else if (to === "fahrenheit") return celsius * (9 / 5) + 32;
    else if (to === "kelvin") return celsius + 273.15;
    return val;
  }

  function convert(val, from, to) {
    if (from === to) return val;
    if (units[from]?.special || units[to]?.special) {
      return convertTemperature(val, from, to);
    }
    const baseValue = val * units[from].toBase;
    return baseValue / units[to].toBase;
  }

  useEffect(() => {
    if (value === "" || value === null) {
      setResult("");
      setFormula("");
      return;
    }
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    const converted = convert(numValue, fromUnit, toUnit);
    const formatted = converted % 1 !== 0 ? converted.toFixed(6).replace(/0+$/, "").replace(/\.$/, "") : converted.toString();
    setResult(formatted);

    const fromName = units[fromUnit]?.name?.split(" (")[0] || "";
    const toName = units[toUnit]?.name?.split(" (")[0] || "";
    const oneToTarget = convert(1, fromUnit, toUnit);
    setFormula(`1 ${fromName} = ${oneToTarget.toFixed(6).replace(/0+$/, "").replace(/\.$/, "")} ${toName}`);

    trackEvent("unit_convert", { tool: "unit_converter", category });
  }, [value, fromUnit, toUnit, category, units]);

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    showToast("Result copied!");
  };

  return (
    <>
      <SEO
        title="Unit Converter - AUQAB Tools"
        description="Convert length, weight, temperature, volume, speed and area units instantly. Free online multi-unit converter."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Unit Converter</h1>
          <p className="tool-description">
            Convert between multiple units of measurement instantly. Choose a category, enter a value.
          </p>

          <div className="category-select">
            <label>Category</label>
            <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
              {Object.entries(categories).map(([key, cat]) => (
                <option key={key} value={key}>{cat.name}</option>
              ))}
            </select>
          </div>

          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="converter-input"
          />

          <div className="converter-row">
            <div className="unit-select">
              <label>From</label>
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                {unitKeys.map((key) => (
                  <option key={key} value={key}>{units[key].name}</option>
                ))}
              </select>
            </div>

            <button
              className="swap-btn"
              onClick={() => {
                setFromUnit(toUnit);
                setToUnit(fromUnit);
              }}
            >
              Swap
            </button>

            <div className="unit-select">
              <label>To</label>
              <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                {unitKeys.map((key) => (
                  <option key={key} value={key}>{units[key].name}</option>
                ))}
              </select>
            </div>
          </div>

          {result !== "" && (
            <div className="converter-result">
              <h2>
                {value} {units[fromUnit]?.name?.split(" (")[0]} =
              </h2>
              <h1 className="result-value">
                {result} <span>{units[toUnit]?.name?.split(" (")[0]}</span>
              </h1>
              <p className="formula">{formula}</p>
              <button className="open-tool-btn" onClick={copyResult}>Copy Result</button>
            </div>
          )}

          <div className="info-section">
            <h2>Available Categories</h2>
            <ul>
              <li>Length — meter, kilometer, mile, inch, etc.</li>
              <li>Weight — kilogram, gram, pound, ounce, etc.</li>
              <li>Temperature — Celsius, Fahrenheit, Kelvin</li>
              <li>Volume — liter, gallon, quart, cup, etc.</li>
              <li>Speed — m/s, km/h, mph, knot</li>
              <li>Area — m², km², ft², acre, hectare</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default UnitConverter;
