import SEO from "../components/SEO";

function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service - AUQAB Tools"
        description="Read the terms of service for using AUQAB Tools. Free tools provided as-is, use responsibly."
      />

      <section className="tool-page">
        <div className="password-card policy-page">
          <h1>📜 Terms of Service</h1>
          <p className="last-updated">Last updated: 2025</p>

          <div className="policy-section">
            <h2>Acceptance of Terms</h2>
            <p>
              By using AUQAB Tools, you agree to these terms. If you do not agree,
              please discontinue use of the website.
            </p>
          </div>

          <div className="policy-section">
            <h2>Use of Tools</h2>
            <ul>
              <li>All tools are provided <strong>free of charge</strong> for personal and commercial use.</li>
              <li>You agree to use the tools responsibly and legally. Do not use them for spam, malicious, or unlawful purposes.</li>
              <li>We do our best to ensure accuracy, but results are provided "as-is" without guarantees.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Intellectual Property</h2>
            <p>
              The AUQAB Tools name, logo, and website design are owned by us.
              You may not copy or reproduce them without permission.
            </p>
          </div>

          <div className="policy-section">
            <h2>Limitation of Liability</h2>
            <p>
              AUQAB Tools shall not be held liable for any damages arising from the use
              or inability to use our tools. Use them at your own discretion.
            </p>
          </div>

          <div className="policy-section">
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time.
              Continued use after changes means you accept the new terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Terms;
