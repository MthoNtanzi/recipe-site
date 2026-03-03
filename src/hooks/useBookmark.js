import { useState, useEffect } from "react";

const STORAGE_KEY = "bookmarkedRecipes";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id) => bookmarks.some((r) => r.id === id);

  const toggleBookmark = (recipe) => {
    setBookmarks((prev) =>
      isBookmarked(recipe.id)
        ? prev.filter((r) => r.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  return { bookmarks, isBookmarked, toggleBookmark };
};