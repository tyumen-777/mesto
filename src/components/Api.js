export default class Api {
  constructor({address, headers}) {
    this._address = address
    //this._token = token
    this._headers = headers
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers
    }).then(this._checkResponse)
  } // Получаем массив карточек с сервера

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse)
  } // Получаем информацию о пользователе с сервера

  editUserInfo(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse)
  }

  editUserAvatar(url) {
    console.log(url)
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    }).then(this._checkResponse)
  }

  likeCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse)
  }

  dislikeCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }

  removeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }
}
