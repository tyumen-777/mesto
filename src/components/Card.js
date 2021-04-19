export default class Card {
  constructor(item, cardSelector, {handleCardClick, likeCardHandler, deleteCardHandler}, userId, cardId) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;
    this._countLikes = item.likes;
    this._userID = userId;
    this._ownerID = item.owner._id;
    this._cardID = cardId;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate()
    this._imgElement = this._element.querySelector('.elements__photo')
    this._element.querySelector('.elements__paragraph').textContent = this._name; // Добавляем название
    this._imgElement.src = this._link; // Добавляем ссылку
    this._imgElement.alt = this._name; // Добавляем alt
    this._handleLike = this._element.querySelector('.elements__button-like') // Значок лайка
    this._deleteIcon = this._element.querySelector('.elements__button-delete') // Значок корзины
    this._likes = this._element.querySelector('.elements__button-like-counter') // Счетчик лайков
    if (this._ownerID !== this._userID) {
      this._deleteIcon.style.display = 'none'
    }

    this.renderLikes()

    this._setEventListeners()
    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      //this._removeCard()
      this._deleteCardHandler()
    })
    this._handleLike.addEventListener('click', () => {
      //this._likeButton()
      this._likeCardHandler()
    })
    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  removeCard() {
    this._element.remove();

  }

  _likeButton() {
    this._handleLike.classList.toggle('elements__button-like-active')

  }

  renderLikes() {
    this._likes.textContent = this._countLikes.length
    this.showLikes(this._userID)
  }

  getIdCard() {
    return this._cardID
  }

  likedCard() {
    return this._countLikes.some(like => {
      return like._id === this._userID
    })
  }

  showLikes() {
    if (this.likedCard(this._userID)) {
      this._handleLike.classList.add('elements__button-like-active')
    } else {
      this._handleLike.classList.remove('elements__button-like-active')
    }
  }

  setLikes(list) {
    this._countLikes = list
  }
}


