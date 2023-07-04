import { async } from "regenerator-runtime";
import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helper";
console.log('api',API_URL)
export const state = {
  recipe: {},
  search: {
    query: {},
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1
  },
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

  export const getSearchResultsPage = (page = state.search.page) => {
    state.search.page = page
    const start = (page -1) *state.search.resultsPerPage
    const end = page *state.search.resultsPerPage
    // slice: tách phần tử mảng vs vtri đầu cuối (0,10) sẽ cắt từ 0 - 9
    return state.search.results.slice(start, end)
  }

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings
    // newQuantity = oldQuantity * newServing / oldServings 
  })
  state.recipe.servings = newServings
}
