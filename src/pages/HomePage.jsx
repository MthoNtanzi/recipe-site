import { useState } from "react";
import styles from '../assets/styles/home.module.css'
import {
    fetchAllRecipes,
    searchRecipes,
    fetchRecipesByTag,
    fetchRecipesByMealType
} from "../services/api";

const HomePage =()=> {
    return(
        <main>
            <header className="HeroSection">
                <h1>Savoury Recipes</h1>
                <p>Discover amazing recipes from around the world</p>

                <input type="text" 
                    placeholder="Search recipe"
                    className="search-input"
                />
            </header>

            {/* Recipes */}
            <div className="recipes">
                <div className="categories">

                </div>
            </div>
        </main>
    )
}

export default HomePage;