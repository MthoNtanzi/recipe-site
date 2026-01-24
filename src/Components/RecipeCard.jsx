import styles from '../assets/styles/recipeCard.module.css';
import foodImg from '../assets/img/food_example.jpg'

export function RecipeCard() {
    return (
        <div className={styles.foodCard}>
            {/* food image */}
            <h1 className={styles.foodTitle}>Meal Name</h1>
            <img
                src={foodImg}
                className={styles.recipeThumbnail}
                alt="Food Item" />
            <p>Cooking Time: 20mins</p>
            <button className={styles.fullRecipeBtn}>See Full Recipe</button>
        </div>
    )
}

export default RecipeCard;