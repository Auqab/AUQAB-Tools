import SEO from "../components/SEO";

function Cookies() {
  return (
    <>
      <SEO
        title="Cookie Policy - AUQAB Tools"
        description="Learn how AUQAB Tools uses cookies and similar technologies to improve your experience."
      />

      <section className="tool-page">
        <div className="password-card policy-page">
          <h1>🍪 Cookie Policy</h1>
          <p className="last-updated">Last updated: 2025</p>

          <div className="policy-section">
            <h2>What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website.
              They help websites remember your preferences and understand how you use the site.
            </p>
          </div>

          <div className="policy-section">
            <h2>How we use cookies</h2>
            <p>We may use cookies for:</p>
            <ul>
              <li>Improving website performance and speed</li>
              <li>Understanding visitor behaviour and usage patterns</li>
              <li>Providing a smoother user experience</li>
              <li>Supporting advertising services (e.g. Google AdSense)</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Third‑party cookies</h2>
            <p>
              Third‑party services, including advertising and analytics providers,
              may place cookies on your device to display relevant ads and measure their effectiveness.
            </p>
          </div>

          <div className="policy-section">
            <h2>Managing cookies</h2>
            <p>
              You can disable cookies through your browser settings.
              Note that some features of the website may not function properly if cookies are blocked.
            </p>
          </div>

          <div className="policy-section">
            <h2>Contact</h2>
            <p>
              If you have any questions about this Cookie Policy, please{' '}
              <a href="/contact">contact us</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cookies;
