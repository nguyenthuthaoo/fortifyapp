import { Fraction } from "fractional";
import icons from "../../image/icons.svg";
import View from "./View";

class PanigationView extends View {
  _parentElement = document.querySelector(".pagination")

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn--inline")
        const gotoPage = Number(btn.dataset.goto)
        handler(gotoPage)
    })
  }

  _generatedMarkup() {
    const currentPage = this._data.page;
    const numberPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(currentPage);
    // page 1, and there are other pages
    if (currentPage === 1 && numberPage > 1) {
      return `
        <button data-goto= ${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
        </button>
      `;
    }

    // last page
    if (currentPage === numberPage && numberPage > 1) {
      return `
        <button data-goto= ${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
              <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }
    // other pages
    if (currentPage < numberPage) {
      return `
      <button data-goto= ${currentPage -1} class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto= ${currentPage + 1} class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
      `;
    }
    // page 1 and no there other pages
    return "only page";
  }
}

export default new PanigationView();
