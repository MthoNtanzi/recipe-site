import { useEffect, useState } from "react";
import styles from '../assets/styles/home.module.css'
import RecipeCard from "../Components/RecipeCard";
import { fetchAllRecipes, getAllTags, searchRecipes } from "../services/api";

const HomePage =()=> {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                setLoading(true)
                const recipesData = await fetchAllRecipes();
                setRecipes(recipesData);
                setFilteredRecipes(recipesData);

                const tags = await getAllTags();
                setAvailableTags(tags);
            } catch (err) {
                setError(err.message);
                console.error("Error loading recipes", err);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, []);

    const tagClick = (tag) =>{
        setSelectedTag(tag);
        setSearchQuery("");

        if(tag === 'all'){
            setFilteredRecipes(recipes);
        }else{
            const filtered = recipes.filter(recipe =>{
                return recipe.tags && recipe.tags.includes(tag)
            });
            setFilteredRecipes(filtered);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        if(searchQuery.trim() === ''){
            setFilteredRecipes(recipes);
            setSelectedTag('all');
            return
        }
        
        setSearchLoading(true);
        try{
            const data = await searchRecipes(searchQuery);
            setFilteredRecipes(data);
            setSelectedTag('all');
        }catch(error){
            console.error("Search error:", error);
            setError(error.message);
        }finally{
            setSearchLoading(false)
        }
    }

    if (loading) {
        return <div className={styles.loading}><span className={styles.loader}></span>Loading recipes...</div>;
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
                    value={searchQuery}
                    className={styles.searchInput}
                    onChange={(e)=> setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </header>

            {/* Recipes */}
            {
                searchLoading ? <div className={styles.loading}><span class="loader"></span>Loading recipes...</div> :
                
            
            <div className={styles.recipes}>
                <div className={styles.tags}>
                    <button className={styles.foodTags} onClick={()=>tagClick('Beef')}>Beef</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Chicken')}>Chicken</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Pasta')}>Pasta</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Pizza')}>Pizza</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Asian')}>Asian</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Salad')}>Salad</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('all')}>All</button>
                </div>
                {/* Recipe Cards Go here */}
                <div className={styles.foodCardContainer}>
                    {
                        filteredRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} /> 

                        ))
                    }
                </div>

                
            </div>}
        </main>
    )
}



export default HomePage;