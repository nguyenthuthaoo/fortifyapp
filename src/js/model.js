import { async } from "regenerator-runtime";

export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
    try {
      const fetchApi = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;

    const response = await fetch(fetchApi);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log('data',state.recipe)
    } catch (error) {
        console.log(error);
    }
  
  }

