import { useState } from "react";
import ToolCard from "../components/ToolCard";
import toolsData from "../tools/toolsData";

function Tools() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(toolsData.map((tool) => tool.category))];

  const filteredTools = toolsData.filter((tool) => {
    const matchSearch = (tool.title || "").toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || tool.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <section className="tools-section-new">
      <div className="tools-header-new">
        <h1 className="tools-title">All Tools</h1>
        <p className="tools-subtitle">{toolsData.length} free online tools available</p>
      </div>

      <div className="tools-search-wrapper">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="tools-search-input"
        />
      </div>

      <div className="tools-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="tools-count">Showing {filteredTools.length} tools</p>

      <div className="cards">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <p className="tools-empty">No tools found. Try a different search or category.</p>
      )}
    </section>
  );
}

export default Tools;
