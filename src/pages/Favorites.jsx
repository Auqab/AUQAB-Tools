import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import toolsData from "../tools/toolsData";
import ToolCard from "../components/ToolCard";
import SEO from "../components/SEO";

function Favorites() {
  const { favorites } = useFavorites();
  const favoriteTools = toolsData.filter((tool) => favorites.includes(tool.id));

  return (
    <>
      <SEO title="My Favorites - AUQAB Tools" description="Your favorite tools for quick access." />
      <section className="tool-page">
        <div className="password-card">
          <h1>⭐ My Favorites</h1>
          <p className="tool-description">
            Your most-used tools in one place.
          </p>

          {favoriteTools.length > 0 ? (
            <div className="cards">
              {favoriteTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          ) : (
            <p style={{ color: "#94a3b8" }}>
              No favorites yet. Click the ☆ on any tool to add it here.
            </p>
          )}

          <div className="center-btn" style={{ marginTop: 30 }}>
            <Link to="/tools" className="open-tool">
              ← Back to All Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Favorites;
