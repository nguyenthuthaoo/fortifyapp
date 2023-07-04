import * as model from './model.js'
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js'
import panigationView from './view/panigationView.js'
import bookmarksView from './view/bookmarksView.js'
import resultsView from './view/resultsView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';
    
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

    const controlBookmarks = function() {
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


    const init = () => {
        recipeView.addHandlerRender(controlRecipe)
        recipeView.addHandlerUpdateServings(controlServings)
        recipeView.addHandlerAddBookmarks(controlBookmarks)
        searchView.addHandlerSearch(controlSearchResults)
        panigationView.addHandlerClick(controlPanigation)

    }

    init()
    // window.addEventListener('hashchange', controlRecipe)
    // window.addEventListener('load', controlRecipe)
    // dùng hashchange để lắng nghe sự thay đổi khi #url thay đổi
    // dùng load để lắng nghe sự thay đổi khi load lại trang
    // ['hashchange', 'load'].forEach(e=> window.addEventListener(e, controlRecipe))

        

