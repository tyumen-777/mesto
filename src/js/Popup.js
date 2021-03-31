export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleOverlayClose = this._handleOverlayClose.bind(this)
  }

  openPopup() {
    this._popup.classList.add('popup__opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  closePopup() {
    this._popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup()
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target !== this._popup) return;  {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.closePopup())
    this._popup.addEventListener('mousedown' , (evt) => this._handleOverlayClose(evt))
  }
}

