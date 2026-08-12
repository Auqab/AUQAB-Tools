import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef();
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // منطق إخفاء/إظهار الشريط عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        // سحب لأسفل -> إخفاء
        setHidden(true);
        setOpen(false);
      } else {
        // سحب لأعلى أو في القمة -> إظهار
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق القائمة عند النقر خارجها
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
    <header className={`header ${hidden ? "nav-hidden" : ""}`} ref={navRef}>
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
