const recipeApi = `https://dummyjson.com/recipes`;

export const fetchAllRecipes = async () => {
    try {
        const response = await fetch(recipeApi);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result.recipes;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}

// fetch single recipe
export const fetchRecipeById = async (id) => {
    try{
        const response = await fetch(`${recipeApi}/${id}`);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        return await response.json();
    }catch(error){
        console.error(`Error fetching recipe ${id}: `, error);
        throw error;
    }
}

// search recipes
export const searchRecipes = async (query) => {
    try {
        const response = await fetch(`${recipeApi}/search?q=${query}`);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error(`Error searching recipes: ${error}`);
        throw error
    }
}

export const fetchRecipesByTag = async (tag) => {
    try {
        const response = await fetch(`${recipeApi}/tag/${tag}`);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error(`Error fetching ${tag} recipes: ${error}`);
        throw error;
    }
}
