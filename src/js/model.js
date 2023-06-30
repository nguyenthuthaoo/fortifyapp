import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helper";
console.log('api',API_URL)
export const state = {
  recipe: {},
  search: {
    query: {},
    results: []
  }
};
export const loadRecipe = async function (id) {
    try {
      const data = await getJSON(`${API_URL}/${id}`)
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
      // catch error rồi ném qua bên controler
        console.error(`${error} @@@@`);
        throw error
    }
  }

  export const loadSearchResults = async (query) => {
    try {
      state.search.query = query;

      const data = await getJSON(`${API_URL}?search=${query}`)
      console.log('data search',data);

      state.search.results = data.data.recipes.map((recipe) =>{
        return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
        }
      })
      
    } catch (error) {
      console.error(`${error} @@@@`);
      throw error
    }
  }

