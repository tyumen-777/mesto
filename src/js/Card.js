
export default class Card {
  constructor(item, cardSelector, {handleCardClick}) {
    this._name = item.name


    this._link = item.link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick

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
    this._imgElement = this._element.querySelector('.elements__photo')
    this._element.querySelector('.elements__paragraph').textContent = this._name; // Добавляем название
    this._imgElement.src = this._link; // Добавляем ссылку
    this._imgElement.alt = this._name; // Добавляем alt
    this._handleLike = this._element.querySelector('.elements__button-like') // Значок лайка

      this._setEventListeners()
    return this._element
  }
  _setEventListeners () {
    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._removeCard()
    })
    this._handleLike.addEventListener('click',() => {
      this._likeButton()
    } )
    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

   _removeCard  () {
    this._element.remove();

  }
  _likeButton () {
    this._handleLike.classList.toggle('elements__button-like-active')

  }
}


