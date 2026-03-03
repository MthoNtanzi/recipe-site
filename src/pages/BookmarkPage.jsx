import { useBookmarks } from "../hooks/useBookmarks";
import { Link } from "react-router-dom";

export const BookmarksPage = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return <p>No saved recipes yet.</p>;
  }

  return (
    <div>
      <h1>Saved Recipes</h1>
      {bookmarks.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          <button onClick={() => toggleBookmark(recipe)}>Remove</button>
        </div>
      ))}
    </div>
  );
};