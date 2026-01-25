import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../assets/styles/recipePage.module.css'
import { fetchRecipeById } from '../services/api';

export const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                setLoading(true);
                const recipeData = await fetchRecipeById(id);
                setRecipe(recipeData);
            } catch (error) {
                setError(error.message);
                console.error(`Error loading recipe`, error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            loadRecipe();
        }
    }, [id]);

    if (loading) return <div className={styles.loading}>Loading recipe...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!recipe) return <div className={styles.notFound}>Recipe not found</div>;

    return (
        <div className={styles.recipeBody}>
            <header>
                <p>Let's Cook</p>
                <p className={styles.foodTitle}>{recipe.name}</p>
            </header>
            <div className={styles.recipeInfo}>
                <span className={styles.cuisine}>Cuisine: {recipe.cuisine}</span>
                <span className={styles.time}>Prep time: {recipe.prepTimeMinutes}</span>
                <span className={styles.time}>Cook time: {recipe.cookTimeMinutes}</span>
                <span className={styles.difficulty}>Difficulty: {recipe.difficulty}</span>
            </div>
        </div>
    );
}