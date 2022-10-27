const token = localStorage.getItem('jwt');

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        /* ---------- Eсли ошибка, отклоняем промис ----------- */
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _getToken = () => {
        localStorage.getItem('jwt');
    }

    /* ---------- Загрузка информации о пользователе с сервера ----------- */
    getUserInfo() {
        console.log(this._headers);
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            },
        }).then(this._parseResponse);
    }

    /* ---------- Загрузка карточек с сервера ----------- */
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            }
        }).then(this._parseResponse);
    }

    /* ---------- Редактирование профиля ----------- */
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._parseResponse);
    }

    /* ---------- Добавление новой карточки ----------- */
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        }).then(this._parseResponse);
    }

    /* ---------- Удаление карточки ----------- */
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            }
        }).then(this._parseResponse);
    }

    /* ---------- Постановка и снятие лайка ----------- */
    setLike(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            }
        }).then(this._parseResponse);
    }

    deleteLike(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            }
        }).then(this._parseResponse);
    }

    /* ---------- Обновление аватара пользователя ----------- */
    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._getToken()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        }).then(this._parseResponse);
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nata.nomoredomains.icu',
    headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
});

export default api;