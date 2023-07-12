import icons from '../../image/icons.svg'
import View from "./View"
console.log('view', icons)

class AddRecipeView extends View {

_parentElement = document.querySelector('.upload')
_message = 'Recipe was sucessfully upload'

_window = document.querySelector('.add-recipe-window')
_overlay = document.querySelector('.overlay')
_addButton = document.querySelector('.nav__btn--add-recipe')
_closeButton = document.querySelector('.btn--close-modal')

constructor() {
    super()
    this._addHandlerShowWindow()
    this._addHandlerHideWwindow()
}

_toggleWindow = function() {
    this._window.classList.toggle('hidden')
    this._overlay.classList.toggle('hidden')
}


_addHandlerShowWindow = function() {
    this._addButton.addEventListener('click', this._toggleWindow.bind(this))
}

_addHandlerHideWwindow = function() {
    this._closeButton.addEventListener('click', this._toggleWindow.bind(this))
    this._overlay.addEventListener('click', this._toggleWindow.bind(this))

}

addHandlerUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', function(e) {
        e.preventDefault()
        const dataArray = [... new FormData(this)]
        const data = Object.fromEntries(dataArray)
        console.log(data)
        handler(data)
    })
}
_generatedMarkup() {

}
}

export default new AddRecipeView()