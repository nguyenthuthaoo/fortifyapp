import * as model from './model.js'
import recipeView from './view/recipeView.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';
    
    //1. loading recipes   
    // dùng .then .catch
    const controlRecipe = async function () {
        try {
            const id = window.location.hash.slice(1);
            console.log(id)
            
            if(!id) return;
            recipeView.renderSpinner()
    
            // 1. load the recipe
            await model.loadRecipe(id)
    
            // 2. rendering recipe
            recipeView.render(model.state.recipe)

        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
       
    }
    window.addEventListener('hashchange', controlRecipe)
    window.addEventListener('load', controlRecipe)
    // dùng hashchange để lắng nghe sự thay đổi khi #url thay đổi
    // dùng load để lắng nghe sự thay đổi khi load lại trang
    // ['hashchange', 'load'].forEach(e=> window.addEventListener(e, controlRecipe))

        

