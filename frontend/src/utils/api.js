class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.json()
        .then((error) => {
            error.errorCode = res.status;
            return Promise.reject(error);
        })
    }
    _getHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    /* ---------- Загрузка информации о пользователе с сервера ----------- */
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._parseResponse);
    }

    /* ---------- Загрузка карточек с сервера ----------- */
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._parseResponse);
    }

    /* ---------- Редактирование профиля ----------- */
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._parseResponse);
    }

    /* ---------- Добавление новой карточки ----------- */
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._parseResponse);
    }

    /* ---------- Удаление карточки ----------- */
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._parseResponse);
    }

    /* ---------- Постановка и снятие лайка ----------- */
    setLike(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
        })
            .then(this._parseResponse);
    }

    deleteLike(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._parseResponse);
    }

    /* ---------- Обновление аватара пользователя ----------- */
    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._parseResponse);
    }
}
const api = new Api({
    //baseUrl: 'http://localhost:3000',
    baseUrl: 'https://api.mesto.nata.nomoredomains.icu',
    headers: {
        //authorization: '3e8431a3-54b0-494c-b0b7-18b456b2213e',
        'Content-Type': 'application/json'
    }
});

export default api;