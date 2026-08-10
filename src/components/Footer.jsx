import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>AUQAB Tools</h3>
        <p>Free online utilities for everyone.</p>
      </div>
      <div>
        <h4>Tools</h4>
        <Link to="/tools">All Tools</Link>
        <Link to="/tools/qr-generator">QR Generator</Link>
        <Link to="/tools/password-generator">Password Generator</Link>
        <Link to="/tools/json-formatter">JSON Formatter</Link>
      </div>
      <div>
        <h4>Company</h4>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <h4>Legal</h4>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/cookies">Cookies</Link>
      </div>
      <div className="footer-bottom">
        <p>© 2026 AUQAB Tools. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
