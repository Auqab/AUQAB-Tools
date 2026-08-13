import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function InvoiceGenerator() {
  const [client, setClient] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [invoice, setInvoice] = useState("");

  const generate = () => {
    if (!client || !item || !amount) return;
    const date = new Date().toLocaleDateString();
    const text = `INVOICE\nDate: ${date}\nClient: ${client}\nItem: ${item}\nAmount: $${amount}`;
    setInvoice(text);
    showToast("Invoice generated!");
    trackEvent("invoice_generate", { tool: "invoice_generator" });
  };

  const copy = () => {
    if (!invoice) return;
    navigator.clipboard.writeText(invoice);
    showToast("Invoice copied!");
  };

  return (
    <>
      <SEO
        title="Invoice Generator - AUQAB Tools"
        description="Generate simple invoices."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Invoice Generator</h1>
          <p className="tool-description">Fill the form and generate a text invoice.</p>

          <input
            placeholder="Client name"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="url-input"
          />
          <input
            placeholder="Item description"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="url-input"
            style={{ marginTop: 10 }}
          />
          <input
            placeholder="Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="url-input"
            style={{ marginTop: 10 }}
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={generate}>
            Generate Invoice
          </button>

          {invoice && (
            <>
              <textarea rows="8" readOnly value={invoice} />
              <button className="generate" style={{ marginTop: 10 }} onClick={copy}>
                Copy Invoice
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default InvoiceGenerator;
