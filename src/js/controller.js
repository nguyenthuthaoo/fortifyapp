import * as model from './model.js'
import { MODAL_CLOSE_SEC } from './config.js'
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js'
import panigationView from './view/panigationView.js'
import bookmarksView from './view/bookmarksView.js'
import resultsView from './view/resultsView.js'
import addRecipeView from './view/addRecipeView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';
import View from './view/View.js'
    
// if(module.hot) {
//     module.hot.accept()
// }
    //1. loading recipes   
    // dùng .then .catch
    const controlRecipe = async function () {
        try {
            const id = window.location.hash.slice(1);
            console.log(id)
            
            if(!id) return;
            recipeView.renderSpinner()
    
            // 0. UPDATE results view to mark selected search results
            resultsView.update(model.getSearchResultsPage())
            
            // 3. update bookmark view
            bookmarksView.update(model.state.bookmarks)

            // 1. load the recipe
            await model.loadRecipe(id)
            
            // 2. rendering recipe
            recipeView.render(model.state.recipe)
            
        } catch (error) {
            console.error(`Could not get products: ${error}`);
            // show error message
            recipeView.renderError()
        }
       
    }

    const controlSearchResults = async function() {
        try {
            // render spinner of search results
            resultsView.renderSpinner()

            // get search query
            const query = searchView.getQuery()
            if(!query) return

            // load search results
            await model.loadSearchResults(query)

            // render results
            // resultsView.render(model.state.search.results)
            resultsView.render(model.getSearchResultsPage())
            
            // panigation view
            panigationView.render(model.state.search)

        } catch (error) {
            console.log(error)
        }
    }

    const controlPanigation = function (gotoPage) {
        // render new results
            resultsView.render(model.getSearchResultsPage(gotoPage))
            
            // panigation new view page
            panigationView.render(model.state.search)
    }

    const controlServings = function (newServings) {
        // update the recipe servings (in state)
        model.updateServings(newServings)

        // update the recipe view 
        // recipeView.render(model.state.recipe)
        recipeView.update(model.state.recipe)
    }

    const controlAddBookmarks = function() {
        // add/delete bookmarks
        if(!model.state.recipe.bookmarked) {
            model.addBookmarks(model.state.recipe)
        } else {
            model.deleteBookmarks(model.state.recipe.id)
        }
        
        // update recipe view
        console.log(model.state.recipe)
        recipeView.update(model.state.recipe)

        //render bookmarks
        bookmarksView.render(model.state.bookmarks)
    }

    const controlBookmarks = function() {
        bookmarksView.render(model.state.bookmarks)
    }

    // upload the new recipe data
    const controlAddRecipe = async function(newRecipe) {
        try {
            //loading snipper
            addRecipeView.renderSpinner()

            await model.uploadRecipe(newRecipe)
            console.log(model.state.recipe)

            // render recipe
            recipeView.render(model.state.recipe)

            // success message
            addRecipeView.renderMesssage()

            //render bookmark view
            bookmarksView.render(model.state.bookmarks)

            // change id in URL
            window.history.pushState(null, '', `#${model.state.recipe.id}`)
            
            
            //close form window
            setTimeout(() =>{
                addRecipeView._toggleWindow()
            },MODAL_CLOSE_SEC * 1000  )
        } catch (error) {
            addRecipeView.renderError(error.message)
        }
    }


    const init = () => {
        recipeView.addHandlerBookmarks(controlBookmarks)
        recipeView.addHandlerRender(controlRecipe)
        recipeView.addHandlerUpdateServings(controlServings)
        recipeView.addHandlerAddBookmarks(controlAddBookmarks)
        searchView.addHandlerSearch(controlSearchResults)
        panigationView.addHandlerClick(controlPanigation)
        addRecipeView.addHandlerUploadRecipe(controlAddRecipe)

    }

    init()
    // window.addEventListener('hashchange', controlRecipe)
    // window.addEventListener('load', controlRecipe)
    // dùng hashchange để lắng nghe sự thay đổi khi #url thay đổi
    // dùng load để lắng nghe sự thay đổi khi load lại trang
    // ['hashchange', 'load'].forEach(e=> window.addEventListener(e, controlRecipe))

        
const deleteBookmarks = function() {
    localStorage.clear('bookmarks')
}

// deleteBookmarks()
