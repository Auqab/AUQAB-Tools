import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function QRBusinessCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;

  const downloadQR = () => {
    const canvas = document.querySelector(".qr-card canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "business-card-qr.png";
    link.click();
    showToast("QR code downloaded!");
    trackEvent("qr_card_download", { tool: "qr_business_card" });
  };

  return (
    <>
      <SEO
        title="QR Business Card - AUQAB Tools"
        description="Create a QR code for your contact info."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>QR Business Card</h1>
          <p className="tool-description">Enter your details and generate a vCard QR.</p>

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="url-input"
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="url-input"
            style={{ marginTop: 10 }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="url-input"
            style={{ marginTop: 10 }}
          />

          {name && (
            <div className="qr-card" style={{ margin: "20px 0" }}>
              <QRCodeCanvas value={vcard} size={200} />
              <br />
              <button className="download-btn" onClick={downloadQR}>
                Download QR
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default QRBusinessCard;
