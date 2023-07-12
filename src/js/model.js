import { async } from "regenerator-runtime";
import { API_URL, RESULTS_PER_PAGE, KEY } from "./config";
import {AJAX } from "./helper";
console.log('api',API_URL)

export const state = {
  recipe: {},
  search: {
    query: {},
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1
  },
  bookmarks: []
};

const createObjectRecipe = function(data) {
  const { recipe } = data.data;
  return {
  id: recipe.id,
  title: recipe.title,
  publisher: recipe.publisher,
  sourceUrl: recipe.source_url,
  image: recipe.image_url,
  servings: recipe.servings,
  cookingTime: recipe.cooking_time,
  ingredients: recipe.ingredients,
  ...(recipe.key && {key: recipe.key})
  }
}

export const loadRecipe = async function (id) {
    try {
      const data = await AJAX(`${API_URL}/${id}?key=${KEY}`)
      state.recipe = createObjectRecipe(data)

      if(state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true
      else state.recipe.bookmarked = false

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

      const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
      console.log('data search',data);

      state.search.results = data.data.recipes.map((recipe) =>{
        return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && {key: recipe.key})
        }
      })
      // reset search results for page 1
      state.search.page = 1
      
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

export const storageBookmarks = function() {
  localStorage.setItem('bookmarks' ,JSON.stringify(state.bookmarks))
}

export const addBookmarks = function (recipe) {
  //add bookmarks
  state.bookmarks.push(recipe)

  //mark current recipe as bookmark
  if(state.recipe.id === recipe.id) state.recipe.bookmarked = true
  
  storageBookmarks()
}

export const deleteBookmarks = function(id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id)
  state.bookmarks.splice(index, 1)
  if(id === state.recipe.id) state.recipe.bookmarked = false

  storageBookmarks()
}

const init = function() {
  const storage = localStorage.getItem('bookmarks')
  if(storage) state.bookmarks = JSON.parse(storage)
}

init()
console.log('Storage: ',state.bookmarks)

export const uploadRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(
     entry => entry[0].startsWith('ingredient') && entry[1] !== '')
     .map(ing => {
       const ingArray = ing[1].replaceAll(' ', '').split(',')
       if(ingArray.length !== 3) throw new Error ('Wrong ingredient format! Please use the correct format ;)')

       const [quantity, unit, description] = ingArray
       return {quantity: quantity ? +quantity : null, unit, description}
     })

     const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    }

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
    state.recipe = createObjectRecipe(data)
    addBookmarks(state.recipe)
    console.log(data)
    
  } catch (error) {
    throw error
  }
}

