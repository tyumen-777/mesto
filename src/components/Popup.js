export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleOverlayClose = this._handleOverlayClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup__opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target !== this._popup) return;  {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close())
    this._popup.addEventListener('mousedown' , (evt) => this._handleOverlayClose(evt))
  }
}

