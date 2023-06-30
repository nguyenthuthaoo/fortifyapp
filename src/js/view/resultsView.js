import icons from '../../image/icons.svg'
import View from "./View";

class ResultsView extends View {
_parentElement = document.querySelector('.results')
_errorMessage = 'No recipes found for your query! Please try again ;)'
_message = 'Start by searching for a recipe or an ingredient. Have fun!'


_generatedMarkup() {
    return `
    ${this._data.map(this._generatedMarkupPreview).join('')}
    `
}

_generatedMarkupPreview (result) {
    return `
    <li class="preview">
              <a class="preview__link preview__link--active" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.image}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${result.title}</h4>
                  <p class="preview__publisher">${result.publisher}</p>
                  <div class="preview__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                </div>
              </a>
    </li>
    `
}
}

export default new ResultsView()