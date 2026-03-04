import { useEffect, useState } from "react";
import styles from '../assets/styles/home.module.css'
import RecipeCard from "../Components/RecipeCard";
import { Loader } from "../Components/Loader";
import { Error } from "../Components/Error";
import RecipeNotFound from "../Components/RecipeNotFound";
import { fetchAllRecipes, searchRecipes } from "../services/api";

const HomePage =()=> {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                setLoading(true)
                const recipesData = await fetchAllRecipes();
                setRecipes(recipesData);
                setFilteredRecipes(recipesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, []);

    const tagClick = (tag) =>{
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
            return
        }
        
        setSearchLoading(true);
        try{
            const data = await searchRecipes(searchQuery);
            setFilteredRecipes(data);
        }catch(error){
            setError(error.message);
        }finally{
            setSearchLoading(false)
        }
    }

    if (loading) {
        return <Loader />;
    }


    if (error) {
        return <Error error={ error}/>;
    }

    return(
        <main>
            <header className={ `${styles.HeroSection} ${styles.mainHeader}`}>
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
            
                
                
            
            <div className={styles.recipes}>
                <div className={styles.tags}>
                    <button className={styles.foodTags} onClick={()=>tagClick('all')}>All</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Beef')}>Beef</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Chicken')}>Chicken</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Pasta')}>Pasta</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Pizza')}>Pizza</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Asian')}>Asian</button>
                    <button className={styles.foodTags} onClick={()=>tagClick('Salad')}>Salad</button>
                </div>
                {/* Recipe Cards Go here */}
                {searchLoading ? <Loader/> :
                <div className={styles.foodCardContainer}>
                    {
                                filteredRecipes.length === 0 ? (<RecipeNotFound recipe={searchQuery}/>):(
                        filteredRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} /> 

                        ))
                        )
                    }
                </div>}

                
            </div>
        </main>
    )
}



export default HomePage;