import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector)
    this._submitForm = submitForm

  }

  _getInputValues() {
    this._popupForm = this._popup.querySelectorAll('.popup__input')
    this._inputValues = {};
    this._popupForm.forEach(item => {
      this._inputValues[item.name] = item.value
    })
    return this._inputValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submitForm(this._getInputValues())
    })
  }

  closePopup() {
    super.closePopup()

  }
}
