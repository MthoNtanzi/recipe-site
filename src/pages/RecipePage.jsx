import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../assets/styles/recipePage.module.css'
import { fetchRecipeById } from '../services/api';
import { Loader } from '../Components/Loader';
import { Error } from '../Components/Error';

import { useBookmarks } from '../hooks/useBookmark'

import cookSVG from '../assets/img/cook.svg';
import foodSVG from '../assets/img/food.svg';
import knifeSVG from '../assets/img/knife.svg';
import peopleSVG from '../assets/img/people.svg';
import starSVG from '../assets/img/star.svg';
import saladSVG from '../assets/img/salad.svg';

export const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const handleShare = async () => {
    const shareData = {
    title: recipe.name,
    text: `Check out this recipe for ${recipe.name}!`,
    url: window.location.href,
  };

  if (navigator.share && navigator.canShare(shareData)) {
    // Mobile + supported desktop browsers → native share sheet
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== "AbortError") console.error(err); // user cancelled = AbortError, ignore it
    }
  } else {
    // Fallback → copy link to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard failed:", err);
    }
  }
};

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                setLoading(true);
                const recipeData = await fetchRecipeById(id);
                setRecipe(recipeData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            loadRecipe();
        }
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <Error error={error} />;
    const bookmarked = isBookmarked(recipe.id);

    return (
        <div className={styles.recipeBody}>
            <header className={styles.recipeHeader}>
                <p>Let's Cook</p>
                <h1 className={styles.foodTitle}>{recipe.name}</h1>
                
                <div className={styles.floatIsland}>
                    {/* share button and bookmark button */}
                    <button onClick={handleShare} className={styles.islandBtn}>
                        {
                            copied
                            ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0a6120"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0a6120"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm508.5-291.5Q720-743 720-760t-11.5-28.5Q697-800 680-800t-28.5 11.5Q640-777 640-760t11.5 28.5Q663-720 680-720t28.5-11.5ZM680-200ZM200-480Zm480-280Z" /></svg>
                        }
                    </button>
                    <button
                        onClick={() => toggleBookmark(recipe)}
                        className={`${styles.islandBtn} ${bookmarked ? styles.bookmarked : ""}`}
                        aria-label={bookmarked ? "Remove from favourites" : "Add to favourites"}
                    >
                        <span className="material-symbols-outlined">
                            {bookmarked
                                ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0a6120"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0a6120"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
                            }
                        </span>
                    </button>
                </div>
            </header>
            <div className={styles.RecipeBody}>
                <div className={styles.recipeInfo}>
                    <div className={styles.foodInfo}>
                        {/*food svg */}
                        <img src={foodSVG}
                            className={styles.icon}/>
                            <div className={styles.labelContainer}>
                                <p className={styles.label}>Cuisine</p>
                                <p className={styles.labelDesc}>{recipe.cuisine}</p>
                            </div>
                    </div>
                    <div className={styles.foodInfo}>
                        {/* prep svg */}
                        <img src={knifeSVG}
                            className={styles.icon}/>
                            <div className={styles.labelContainer}>
                                <p className={styles.label}>Prep time</p>
                                <p className={styles.labelDesc}>{recipe.prepTimeMinutes}</p>
                            </div>
                    </div>
                    <div className={styles.foodInfo}>
                        {/* cook svg */}
                        <img src={cookSVG}
                            className={styles.icon}/>
                            <div className={styles.labelContainer}>
                                <p className={styles.label}>Cook time</p>
                                <p className={styles.labelDesc}>{recipe.cookTimeMinutes}</p>
                            </div>
                    </div>
                    <div className={styles.foodInfo}>
                        {/* people svg */}
                        <img src={peopleSVG}
                            className={styles.icon}/>
                            <div className={styles.labelContainer}>
                                <p className={styles.label}>Serving</p>
                                <p className={styles.labelDesc}>{recipe.servings}</p>
                            </div>
                    </div>
                    <div className={styles.foodInfo}>
                        {/* Difficulty */}
                        <img src={starSVG}
                            className={styles.icon}/>
                            <div className={styles.labelContainer}>
                                <p className={styles.label}>Difficulty</p>
                                <p className={styles.labelDesc}>{recipe.difficulty}</p>
                            </div>
                    </div>
                </div>
                <div className={styles.ingredientsAndImage}>
                    <div className={styles.recipeIngredients}>
                        <h2>Ingredients</h2>
                        <ul className={styles.ingredientsList}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <img src={recipe.image} className={styles.recipeImage}/>
                </div>
                <div className={styles.cookingInstruction}>
                    <h2>Cooking <span className={styles.instructionSpan}>Instructions</span><img className={styles.saladImg} src={saladSVG}/></h2>
                    <ul className={styles.instructionsList}>
                        {recipe.instructions.map((step, index) => (
                            <li className={styles.instructionStep} key={index}><span className={styles.stepCount}>{index+1}</span> {step}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}