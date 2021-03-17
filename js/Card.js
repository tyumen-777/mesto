export class Card {
  constructor(item, cardSelector) {
    this._name = item.title
    this._link = item.link
    this._cardSelector = cardSelector
  }
  _getTemplate () {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
  generateCard () {
    this._element = this._getTemplate()
    //this._photoElement = this._element.querySelector('.elements__photo')
    this._element.querySelector('.elements__paragraph').textContent = this._name; // Добавляем название
    this._element.querySelector('.elements__photo').src = this._link; // Добавляем ссылку
    this._element.querySelector('.elements__photo').alt = this._name; // Добавляем alt

    this._setEventListeners()
    return this._element
  }
  _setEventListeners () {
    this._element.querySelector('.elements__button-delete').addEventListener('click', this._removeCard)
    this._element.querySelector('.elements__button-like').addEventListener('click', this._likeButton)
    this._element.querySelector('.elements__photo').addEventListener('click', this._openImage)
  }

  _removeCard = () => {
    this._element.remove();
}
  _likeButton = () => {
    this._element.querySelector('.elements__button-like').classList.toggle('elements__button-like-active')
  }

  _openImage = () => {
    imageLink.src = this._link
    titleLink.textContent = this._name
    handlePopupOpen(openImagePopup)
  }
}
