export class Api {
  constructor(config) {
    this.source = config.source
  }
  //checking if the server's responce is ok
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //get user info
  getUserInfo(token) {
    return fetch(`${this.source}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res))
  }
  //update user info
  setUserInfo({ name, about }, token) {
    return fetch(`${this.source}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => this._checkResponse(res))
  }
  //update user avatar
  setUserAvatar(avatar, token) {
    return fetch(`${this.source}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._checkResponse(res))
  }
  //get cards
  getCards(token) {
    return fetch(`${this.source}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res))
  }
  //add a new card
  postCard({ name: place, link: source }, token) {
    return fetch(`${this.source}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: place,
        link: source
      })
    })
      .then(res => this._checkResponse(res))
  }
  //delete selected card
  deleteCard(cardId, token) {
    return fetch(`${this.source}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkResponse(res))
  }
  //like selected card
  setLike(cardId, token) {
    return fetch(`${this.source}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkResponse(res))
  }
  //remove like on selected card
  deleteLike(cardId, token) {
    return fetch(`${this.source}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkResponse(res))
  }
  //check out whether current card is liked, then put or delete it
  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this.setLike(cardId, token);
    } else {
      return this.deleteLike(cardId, token);
    }
  }
}

export const api = new Api({
  source: 'https://api.mesto.nata.nomoredomains.icu',
})