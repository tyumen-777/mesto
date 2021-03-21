const openImagePopup = document.querySelector('.opened-image')
const imageLink = document.querySelector('.popup__image')
const titleLink = document.querySelector('.popup__phototitle')

const handlePopupOpen = (popupEl) => {
  popupEl.classList.add('popup__opened');
  document.addEventListener('keydown', closeEsc)
} // Функция открытия попапа

export class Card {
  constructor(item, cardSelector) {
    this._name = item.name
    this._link = item.link
    this._cardSelector = cardSelector
    this._alt = item.name
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

    this._setEventListeners()
    return this._element
  }
  _setEventListeners () {
    this._element.querySelector('.elements__button-delete').addEventListener('click', this._removeCard)
    this._element.querySelector('.elements__button-like').addEventListener('click', this._likeButton)
    this._imgElement.addEventListener('click', this._openImage)
  }

  _removeCard = () => {
    this._element.remove();

}
  _likeButton = () => {
    this._element.querySelector('.elements__button-like').classList.toggle('elements__button-like-active')

  }
  _openImage = () => {
    imageLink.src = this._link;
    imageLink.alt = this._alt;
    titleLink.textContent = this._name;
    handlePopupOpen(openImagePopup);
    // closeEsc();
  }
}


function closeEsc(evt) {
  if (evt.key === "Escape") {
    openImagePopup.classList.remove('popup__opened');
  }} // Функция закрытия попапа по нажатию на клавишу ESC
