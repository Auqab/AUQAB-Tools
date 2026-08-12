import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div>
        <h3>AUQAB Tools</h3>
        <p>{t.footerTagline}</p>
      </div>

      <div>
        <h4>{t.tools}</h4>
        <Link to="/tools">{t.allTools}</Link>
        <Link to="/tools/qr-generator">{t.qrGenerator}</Link>
        <Link to="/tools/password-generator">{t.passwordGenerator}</Link>
        <Link to="/tools/json-formatter">{t.jsonFormatter}</Link>
      </div>

      <div>
        <h4>{t.company}</h4>
        <Link to="/about">{t.about}</Link>
        <Link to="/services">{t.services}</Link>
        <Link to="/pricing">{t.pricing}</Link>
        <Link to="/contact">{t.contact}</Link>
        <Link to="/changelog">{t.changelog}</Link>
      </div>

      <div>
        <h4>{t.legal}</h4>
        <Link to="/privacy">{t.privacy}</Link>
        <Link to="/terms">{t.terms}</Link>
        <Link to="/cookies">{t.cookies}</Link>
      </div>

      <div className="footer-bottom">
        <p>{t.rights}</p>
      </div>
    </footer>
  );
}

export default Footer;
