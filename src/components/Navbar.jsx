import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navRef = useRef();
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="header" ref={navRef}>
      <div className="logo">
        <span>AUQAB</span>
        <small>Tools</small>
      </div>

      <div className="nav-controls">
        <button onClick={toggleTheme} className="theme-btn-nav" title="Toggle theme">
          {theme === "dark" ? t.lightMode : t.darkMode}
        </button>
        <button onClick={toggleLang} className="lang-btn-nav">
          {lang === "en" ? "AR" : "EN"}
        </button>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          <span className="dots">&#8942;</span>
        </button>
      </div>

      <nav className={`nav ${open ? "active" : ""}`}>
        <Link to="/" className={isActive("/")} onClick={() => setOpen(false)}>{t.home}</Link>
        <Link to="/tools" className={isActive("/tools")} onClick={() => setOpen(false)}>{t.tools}</Link>
        <Link to="/games" className={isActive("/games")} onClick={() => setOpen(false)}>{t.games}</Link>
        <Link to="/backgrounds" className={isActive("/backgrounds")} onClick={() => setOpen(false)}>{t.backgrounds}</Link>
        <Link to="/about" className={isActive("/about")} onClick={() => setOpen(false)}>{t.about}</Link>
        <Link to="/premium" className={isActive("/premium")} onClick={() => setOpen(false)}>{t.premium}</Link>
        <Link to="/services" className={isActive("/services")} onClick={() => setOpen(false)}>{t.services}</Link>
        <Link to="/pricing" className={isActive("/pricing")} onClick={() => setOpen(false)}>{t.pricing}</Link>
        <Link to="/request-service" className={isActive("/request-service")} onClick={() => setOpen(false)}>{t.requestService}</Link>
        <Link to="/favorites" className={isActive("/favorites")} onClick={() => setOpen(false)}>{t.favorites}</Link>
      </nav>
    </header>
  );
}

export default Navbar;
