import styles from '../assets/styles/recipeCard.module.css';
import { Link } from 'react-router-dom';

export function RecipeCard({ recipe }) {
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    return (
        <Link to={`/recipe/${recipe.id}`} className={styles.foodCard}>
            
            {/* food image */}
            <h1 className={styles.foodTitle}>{recipe.name}</h1>
            <img
                src={recipe.image}
                className={styles.recipeThumbnail}
                alt={recipe.name} 
                loading='lazy'
                />
            <p className={styles.time}>Cooking time: {totalTime} mins</p>
            <p className={styles.cuisine}>{recipe.cuisine}</p>
            <p className={styles.difficulty}>{recipe.difficulty}</p>
            <Link to={`/recipe/${recipe.id}`} className={styles.fullRecipeBtn}>See Full Recipe</Link>
        </Link>
    )
}

export default RecipeCard;