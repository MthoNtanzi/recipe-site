import { useEffect, useState } from "react";
import styles from '../assets/styles/home.module.css'
import RecipeCard from "../Components/RecipeCard";
import { fetchAllRecipes } from "../services/api";

const HomePage =()=> {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                setLoading(true)
                const recipesData = await fetchAllRecipes();
                setRecipes(recipesData);
                } catch (err) {
                setError(err.message);
                console.error("Error loading recipes", err);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, []);

    if (loading) {
        return <div className={styles.loading}><span class="loader"></span>Loading recipes...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    return(
        <main>
            <header className={styles.HeroSection}>
                <h1>Savoury Recipes</h1>
                <p>Discover {recipes.length} amazing recipes from around the world</p>

                <input type="text" 
                    placeholder="Search recipe"
                    className="search-input"
                />
            </header>

            {/* Recipes */}
            <div className={styles.recipes}>
                <div className={styles.categories}>
                    <button className={styles.foodCategories}>Beef</button>
                    <button className={styles.foodCategories}>Chicken</button>
                    <button className={styles.foodCategories}>Pasta</button>
                    <button className={styles.foodCategories}>Pizza</button>
                </div>
                {/* Recipe Cards Go here */}
                <div className={styles.foodCardContainer}>
                    {
                        recipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} /> 

                        ))
                    }
                </div>

                
            </div>
        </main>
    )
}



export default HomePage;