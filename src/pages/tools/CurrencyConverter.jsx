import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

const EXCHANGE_API = "https://api.exchangerate-api.com/v4/latest/USD";

function CurrencyConverter() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(EXCHANGE_API)
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setLoading(false);
        trackEvent("currency_rates_loaded", { tool: "currency_converter" });
      })
      .catch(() => {
        setLoading(false);
        showToast("Failed to load exchange rates", "error");
      });
  }, []);

  const convert = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;
    const baseAmount = amount / rates[fromCurrency];
    const converted = baseAmount * rates[toCurrency];
    setResult(converted.toFixed(2));
    showToast("Conversion complete!");
    trackEvent("currency_convert", { tool: "currency_converter" });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currencies = Object.keys(rates);

  return (
    <>
      <SEO
        title="Currency Converter - AUQAB Tools"
        description="Convert between currencies using live exchange rates."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Currency Converter</h1>
          <p className="tool-description">
            Live exchange rates. Select currencies and amount.
          </p>

          {loading ? (
            <p>Loading rates...</p>
          ) : (
            <div className="currency-form">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />

              <div className="converter-row">
                <div className="unit-select">
                  <label>From</label>
                  <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <button className="swap-btn" onClick={swapCurrencies}>Swap</button>
                <div className="unit-select">
                  <label>To</label>
                  <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="generate" style={{ marginTop: 20 }} onClick={convert}>
                Convert
              </button>

              {result && (
                <div className="converter-result" style={{ marginTop: 20 }}>
                  <h2>
                    {amount} {fromCurrency} = {result} {toCurrency}
                  </h2>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CurrencyConverter;
