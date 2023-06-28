import icons from '../image/icons.svg'
console.log(icons)
function controller() {

    //render spinner load
    const renderSpinner = function (pareneElement) {
        const markup = `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `
        recipeContainer.insertAdjacentHTML('afterbegin', markup)
    }

    const recipeContainer = document.querySelector('.recipe')

    var fetchApi = 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    
    //1. loading recipes
    renderSpinner(recipeContainer)
    // dùng .then .catch
    const showRecipes = () => {
        console.log('test')
        fetch(fetchApi) 
            .then ((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }
                return response.json()
            })
            .then ((data) => {
                let {recipe} = data.data
                recipe = {
                    id: recipe.id,
                    title: recipe.title,
                    publisher: recipe.publisher,
                    sourceUrl: recipe.source_url,
                    image: recipe.image_url,
                    servings: recipe.servings,
                    cookingTime: recipe.cooking_time,
                    ingredients: recipe.ingredients,
                }
                console.log(recipe)

                // rending recipes

        const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${recipe.title}</span>
            </h1>
          </figure>
  
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
              <span class="recipe__info-text">servings</span>
  
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="recipe__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="${icons}#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>
  
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(ingredient => {
                return `
                <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit }</span>
                  ${ingredient.description}
                </div>
              </li>
                `
            }).join('')}
            </ul>
          </div>
  
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${recipe.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>`
            recipeContainer.innerHTML = ''
            recipeContainer.insertAdjacentHTML('afterbegin', markup)
            })
            .catch((err) => console.log(`Could not get recipes: ${err}`))
    }
    showRecipes()

        // dùng async wait
        // async function fetchRecipes ()  {
        //     try {
        //         const response = await fetch(fetchApi)
        //             if(!response.ok) {
        //                 throw new Error(`HTTP error: ${response.status}`);
        //             }
        //         const data = await response.json();
        //         return data
        //     } catch (error) {
        //         console.error(`Could not get products: ${error}`)
        //     }
        // }

        // const promise = fetchRecipes()
        // promise.then((data) => console.log(data))
        
     };


     controller()
