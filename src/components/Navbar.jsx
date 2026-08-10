import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navRef = useRef();

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

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={open ? "nav active" : "nav"}>
        <Link to="/" className={isActive("/")} onClick={() => setOpen(false)}>Home</Link>
        <Link to="/tools" className={isActive("/tools")} onClick={() => setOpen(false)}>Tools</Link>
        <Link to="/about" className={isActive("/about")} onClick={() => setOpen(false)}>About</Link>
        <Link to="/premium" className={isActive("/premium")} onClick={() => setOpen(false)}>Premium</Link>
        <Link to="/services" className={isActive("/services")} onClick={() => setOpen(false)}>Services</Link>
        <Link to="/pricing" className={isActive("/pricing")} onClick={() => setOpen(false)}>Pricing</Link>
        <Link to="/request-service" className={isActive("/request-service")} onClick={() => setOpen(false)}>Request Service</Link>
      </nav>
    </header>
  );
}

export default Navbar;
