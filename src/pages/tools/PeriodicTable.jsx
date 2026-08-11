import { useState } from "react";
import SEO from "../../components/SEO";

const elements = [
  { symbol: "H", name: "Hydrogen", number: 1 }, { symbol: "He", name: "Helium", number: 2 },
  { symbol: "Li", name: "Lithium", number: 3 }, { symbol: "Be", name: "Beryllium", number: 4 },
  { symbol: "B", name: "Boron", number: 5 }, { symbol: "C", name: "Carbon", number: 6 },
  { symbol: "N", name: "Nitrogen", number: 7 }, { symbol: "O", name: "Oxygen", number: 8 },
  { symbol: "F", name: "Fluorine", number: 9 }, { symbol: "Ne", name: "Neon", number: 10 },
  // يمكن إضافة المزيد...
];

function PeriodicTable() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <SEO title="Periodic Table - AUQAB Tools" description="Interactive periodic table of elements." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🧪 Periodic Table</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {elements.map((el) => (
              <div key={el.symbol} onClick={() => setSelected(el)}
                   style={{ padding: 10, background: "rgba(255,255,255,0.1)", borderRadius: 10, cursor: "pointer", minWidth: 60, textAlign: "center" }}>
                <strong>{el.symbol}</strong><br />{el.number}
              </div>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: 20 }}>
              <h3>{selected.name} ({selected.symbol})</h3>
              <p>Atomic number: {selected.number}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PeriodicTable;
