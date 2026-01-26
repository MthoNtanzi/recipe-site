import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../assets/styles/recipePage.module.css'
import { fetchRecipeById } from '../services/api';

import cookSVG from '../assets/img/cook.svg';
import foodSVG from '../assets/img/food.svg';
import knifeSVG from '../assets/img/knife.svg';
import starSVG from '../assets/img/star.svg';

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
            <header className={styles.recipeHeader}>
                <p>Let's Cook</p>
                <h1 className={styles.foodTitle}>{recipe.name}</h1>
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
                                <p className={styles.label}>Prep time:</p>
                                <p className={styles.labelDesc}>{recipe.prepTimeMinutes}</p>
                            </div>
                    </div>
                    <div className={styles.foodInfo}>
                        {/* cook svg */}
                        <img src={cookSVG}
                            className={styles.icon}/>
                            <div className={styles.labelContainer}>
                                <p className={styles.label}>Cook time: </p>
                                <p className={styles.labelDesc}>{recipe.cookTimeMinutes}</p>
                            </div>
                    </div>
                    <div className={styles.foodInfo}>
                        {/* Difficulty */}
                        <img src={starSVG}
                            className={styles.icon}/>
                            <div>
                                <p className={styles.label}>Difficulty</p>
                                <p className={styles.labelDesc}>{recipe.difficulty}</p>
                            </div>
                    </div>
                </div>
                <div className={styles.recipeIngredients}>
                    
                </div>
            </div>
        </div>
    );
}