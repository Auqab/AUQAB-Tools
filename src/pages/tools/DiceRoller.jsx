import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function DiceRoller() {
  const [mode, setMode] = useState("dice");
  const [diceType, setDiceType] = useState(6);
  const [diceCount, setDiceCount] = useState(1);
  const [rollResults, setRollResults] = useState([]);
  const [pickerItems, setPickerItems] = useState("");
  const [picked, setPicked] = useState("");

  const rollDice = () => {
    const results = [];
    for (let i = 0; i < diceCount; i++) {
      results.push(Math.floor(Math.random() * diceType) + 1);
    }
    setRollResults(results);
    showToast("Dice rolled!");
    trackEvent("dice_roll", { tool: "dice_roller" });
  };

  const pickRandom = () => {
    const items = pickerItems
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length === 0) return;
    const choice = items[Math.floor(Math.random() * items.length)];
    setPicked(choice);
    showToast("Random item picked!");
    trackEvent("random_pick", { tool: "dice_roller" });
  };

  const copyPicked = () => {
    if (!picked) return;
    navigator.clipboard.writeText(picked);
    showToast("Copied!");
  };

  return (
    <>
      <SEO
        title="Dice Roller & Random Picker - AUQAB Tools"
        description="Roll dice or pick a random item from a list."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Dice Roller & Random Picker</h1>
          <p className="tool-description">
            Roll virtual dice or pick a random winner from your list.
          </p>

          <div className="diff-mode">
            <label>
              <input type="radio" value="dice" checked={mode === "dice"} onChange={() => setMode("dice")} />
              Dice
            </label>
            <label>
              <input type="radio" value="picker" checked={mode === "picker"} onChange={() => setMode("picker")} />
              Picker
            </label>
          </div>

          {mode === "dice" && (
            <div className="dice-panel">
              <div className="random-fields">
                <div className="cron-field">
                  <label>Sides</label>
                  <input type="number" min="2" value={diceType} onChange={(e) => setDiceType(+e.target.value)} />
                </div>
                <div className="cron-field">
                  <label>Count</label>
                  <input type="number" min="1" max="10" value={diceCount} onChange={(e) => setDiceCount(+e.target.value)} />
                </div>
              </div>
              <button className="generate" onClick={rollDice}>Roll Dice</button>
              {rollResults.length > 0 && (
                <div className="dice-results">
                  {rollResults.map((r, i) => (
                    <span key={i} className="dice-face">[{r}]</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {mode === "picker" && (
            <div className="picker-panel">
              <textarea
                rows="5"
                placeholder="Enter items, one per line..."
                value={pickerItems}
                onChange={(e) => setPickerItems(e.target.value)}
              />
              <button className="generate" style={{ margin: "15px 0" }} onClick={pickRandom}>
                Pick Random
              </button>
              {picked && (
                <div className="converter-result">
                  <h2>{picked}</h2>
                  <button className="open-tool-btn" onClick={copyPicked}>Copy</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default DiceRoller;
