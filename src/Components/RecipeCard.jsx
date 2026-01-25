import styles from '../assets/styles/recipeCard.module.css';

export function RecipeCard({ recipe }) {
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    return (
        <div className={styles.foodCard}>
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
            <button className={styles.fullRecipeBtn}>See Full Recipe</button>
        </div>
    )
}

export default RecipeCard;