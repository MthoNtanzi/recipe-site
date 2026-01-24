import { useState } from "react";
import styles from '../assets/styles/home.module.css'
import foodImg from '../assets/img/food_example.jpg'
import {
    fetchAllRecipes,
    searchRecipes,
    fetchRecipesByTag,
    fetchRecipesByMealType
} from "../services/api";

const HomePage =()=> {
    return(
        <main>
            <header className={styles.HeroSection}>
                <h1>Savoury Recipes</h1>
                <p>Discover amazing recipes from around the world</p>

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
                    {Array.from({ length: 10 }).map((_, index) => (
                        <RecipeCard key={index} />
                    ))}

                </div>

                
            </div>
        </main>
    )
}

function RecipeCard() {
    return (
        <div className={styles.foodCard}>
            {/* food image */}
            <h1 className={styles.foodTitle}>Meal Name</h1>
            <img
                src={foodImg}
                className={styles.recipeThumbnail}
                alt="Food Item" />
            <p>Cooking Time: 20mins</p>
        </div>
    )
}

export default HomePage;