import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function NotFound() {
  return (
    <>
      <SEO title="404 - Page Not Found" />
      <section className="tool-page" style={{ textAlign: "center", marginTop: 80 }}>
        <div className="password-card">
          <h1 style={{ fontSize: 72 }}>404</h1>
          <p style={{ fontSize: 24 }}>Oops! Page not found.</p>
          <p style={{ color: "#94a3b8", marginBottom: 30 }}>The tool you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="generate" style={{ display: "inline-block" }}>🏠 Go Home</Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;
