import {apiConfig} from "./data";

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl
    this._token = apiConfig.headers.authorization;
    this._headers = apiConfig.headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json(): Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._checkResponse);
  }

  editProfileInfo({ userName, occupation }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: occupation
      })
    })
      .then(this._checkResponse);
  }

  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    })
      .then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse);
  }

  _sendLikeRequest(cardId, method) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: `${this._token}`
      },
    })
      .then(this._checkResponse);
  }

  changeLikeStatus(cardId, isLiked) {
    return isLiked ? this._sendLikeRequest(cardId, 'PUT')
      : this._sendLikeRequest(cardId, 'DELETE')
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      },
    })
      .then(this._checkResponse);
  }

}

export const api = new Api(apiConfig);
