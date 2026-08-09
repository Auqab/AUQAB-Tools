import { Link } from "react-router-dom";

function ToolCard({ icon, title, description, path, category }) {
  return (
    <article className="tool-card" tabIndex={0}>
      <div className="tool-icon" aria-hidden="true">
        {icon}
      </div>

      <span className="category">{category}</span>

      <h3>{title}</h3>

      <p className="tool-desc">{description}</p>

      <Link to={path} className="open-tool" aria-label={`Open ${title}`}>
        Open Tool
      </Link>
    </article>
  );
}

export default ToolCard;
