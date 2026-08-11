import SEO from "../components/SEO";

const updates = [
  {
    date: "August 2026",
    title: "Major Platform Update",
    items: [
      "Added 70+ new tools across all categories (AI, PDF, Security, Media, Developer, Fun)",
      "Smart Search Bar on home page for instant tool discovery",
      "Favorites system with star button and dedicated page",
      "Multi-language support (English & Arabic) with toggle",
      "Toast notifications for copy and action feedback",
      "NProgress page loading bar for smooth navigation",
      "Back to Top button for easy scrolling",
      "PWA support – install as app on mobile devices",
      "Privacy Vault – encrypted local secret storage",
      "Improved design with glass-morphism and animated particles"
    ]
  },
  {
    date: "Early 2026",
    title: "Initial Release",
    items: [
      "Core tools launched: QR Generator, Password Generator, Image Compressor, Unit Converter, JSON Formatter, Base64 Tool, and more",
      "Home, Tools, About, Contact, and legal pages",
      "SEO optimization with meta tags and sitemap"
    ]
  }
];

function Changelog() {
  return (
    <>
      <SEO
        title="Changelog - AUQAB Tools"
        description="See the latest updates and improvements to AUQAB Tools."
      />

      <section className="tool-page">
        <div className="password-card" style={{ textAlign: "left" }}>
          <h1>📋 Changelog</h1>
          <p className="tool-description">Stay up to date with the latest features and improvements.</p>

          {updates.map((update, idx) => (
            <div key={idx} style={{ marginBottom: 30 }}>
              <h2 style={{ color: "#38bdf8", marginBottom: 5 }}>{update.title}</h2>
              <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 10 }}>{update.date}</p>
              <ul style={{ color: "#cbd5e1", lineHeight: 1.8, paddingLeft: 20 }}>
                {update.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Changelog;
