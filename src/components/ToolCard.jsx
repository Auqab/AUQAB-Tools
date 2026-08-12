import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

function ToolCard({ id, title, description, path, category }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);

  return (
    <article className="tool-card" tabIndex={0}>
      <button
        className={`fav-btn ${fav ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(id);
        }}
        title={fav ? "Remove from favorites" : "Add to favorites"}
      >
        {fav ? "●" : "○"}
      </button>

      <span className="category">{category}</span>
      <h3 className="tool-title">{title}</h3>
      <p className="tool-desc">{description}</p>

      <Link to={path} className="open-tool-btn" aria-label={`Open ${title}`}>
        Open
      </Link>
    </article>
  );
}

export default ToolCard;
