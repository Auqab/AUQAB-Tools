import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auqab_favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("auqab_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (toolId) => favorites.includes(toolId);

  const toggleFavorite = (toolId) => {
    setFavorites((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
