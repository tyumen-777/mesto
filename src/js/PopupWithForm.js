import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector)
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelectorAll('.popup__field');
    this._popupSubmitButton = this._popup.querySelector('.popup__button-save');
    this._defaultSubmitButtonText = this._popupSubmitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._popupForm.forEach(input => {
      this._inputValues[input.name] = input.value
    })
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submitForm(this._getInputValues())
      this.close()
    })
  }
  open() {
    super.open();
  }

  close() {
    this._popup.querySelector('.popup__input').reset()
    super.close()
  }

 renderLoading(isLoading, initialMessage='Сохранение...') {
if (isLoading) {
  this._popupSubmitButton.textContent = initialMessage
} else {
  this._popupSubmitButton.textContent = this._defaultSubmitButtonText
}
 }

}
