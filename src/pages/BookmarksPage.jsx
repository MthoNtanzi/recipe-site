import { useBookmarks } from "../hooks/useBookmarks";
import RecipeCard from "../Components/RecipeCard";
import styles from "../assets/styles/bookmarksPage.module.css";

export const BookmarksPage = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className={styles.empty}>
        <span className="material-symbols-outlined">favorite</span>
        <h2>No saved recipes yet</h2>
        <p>Tap the heart on any recipe to save it here</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Saved Recipes</h1>
        <p>{bookmarks.length} {bookmarks.length === 1 ? "recipe" : "recipes"} saved</p>
      </header>

      <div className={styles.grid}>
        {bookmarks.map((recipe) => (
          <div key={recipe.id} className={styles.cardWrapper}>
            <RecipeCard recipe={recipe} />
            <button
              className={styles.removeBtn}
              onClick={() => toggleBookmark(recipe)}
              aria-label="Remove from favourites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
              </svg>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};