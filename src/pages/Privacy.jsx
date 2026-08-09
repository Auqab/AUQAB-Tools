import SEO from "../components/SEO";

function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - AUQAB Tools"
        description="Learn how AUQAB Tools protects your privacy. We process data locally in your browser — your files are never uploaded."
      />

      <section className="tool-page">
        <div className="password-card policy-page">
          <h1>🔒 Privacy Policy</h1>
          <p className="last-updated">Last updated: 2025</p>

          <div className="policy-section">
            <h2>Our Commitment</h2>
            <p>
              At AUQAB Tools, your privacy is our priority. Most of our tools
              process data <strong>locally in your browser</strong>. Your files,
              images, and text never leave your device.
            </p>
          </div>

          <div className="policy-section">
            <h2>Data Collection</h2>
            <ul>
              <li>We do <strong>not</strong> collect, store, or share your uploaded files or generated data.</li>
              <li>We may use anonymous analytics to understand general usage patterns and improve our tools.</li>
              <li>Third-party services (such as advertising or analytics providers) may collect non-personal data according to their own policies.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Cookies</h2>
            <p>
              We may use essential cookies or similar technologies for functionality,
              analytics, or advertising. You can manage your preferences at any time.
              See our <a href="/cookies">Cookie Policy</a> for details.
            </p>
          </div>

          <div className="policy-section">
            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. We are not responsible
              for the privacy practices of those websites.
            </p>
          </div>

          <div className="policy-section">
            <h2>Changes</h2>
            <p>
              We may update this policy occasionally. Continued use of the site
              means you accept the latest version.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Privacy;
