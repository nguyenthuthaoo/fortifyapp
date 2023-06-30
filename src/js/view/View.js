import icons from '../../image/icons.svg'


// dùng _ để khai báo method or biến global
// dùng # để khai báo biến cục bộ

export default class View {
    _data

    render(data) {
      if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
        this._data = data
        const markup = this._generatedMarkup()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    } 

    _clear () {
        this._parentElement.innerHTML = ''
    }

    //render spinner load
    renderSpinner() {
        const markup = `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `
        //insertAdjacentHTML: chèn node vào vị trí xác định
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderError(message = this._errorMessage) {
      const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `
      this._clear()
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMesssage(message = this._message) {
      const markup = `
      <div class="recipe">
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `
    }
}
