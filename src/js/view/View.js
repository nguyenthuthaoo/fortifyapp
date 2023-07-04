import icons from '../../image/icons.svg'


// dùng _ để khai báo method or biến global
// dùng # để khai báo biến cục bộ

export default class View {
    _data

    render(data, render = true) {
      if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
        this._data = data
        const markup = this._generatedMarkup()

        if(!render) return markup
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    } 

    update(data) {
      // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
        
      this._data = data
      const newMarkup = this._generatedMarkup()
      
      const newDOM = document.createRange().createContextualFragment(newMarkup)
      const newElements = Array.from(newDOM.querySelectorAll('*'))
      const curElements = Array.from(this._parentElement.querySelectorAll('*'))

      newElements.forEach((newEl, index) => {
        const curEl = curElements[index]
        // console.log(curEl, newEl.isEqualNode(curEl))

        // update change text
        if(!newEl.isEqualNode(curEl) &&
         newEl.firstChild?.nodeValue.trim() !== '' ) {
          // console.log('Dom:', newEl.firstChild.nodeValue.trim())
          curEl.textContent = newEl.textContent
        }

        // update chaneg attributes
        if(!newEl.isEqualNode(curEl)) {
          // console.log(Array.from(newEl.attributes))
          Array.from(newEl.attributes).forEach(attr => {
            curEl.setAttribute(attr.name, attr.value)
          })
        }

      })
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
