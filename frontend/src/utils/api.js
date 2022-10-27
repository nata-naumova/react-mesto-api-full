class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options._headers;
    }
    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        /* ---------- Eсли ошибка, отклоняем промис ----------- */
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _getToken = () => {
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
            headers: this._getToken(),
        }).then(this._parseResponse);
    }

    /* ---------- Загрузка карточек с сервера ----------- */
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._getToken(),
        }).then(this._parseResponse);
    }

    /* ---------- Редактирование профиля ----------- */
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getToken(),
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
            headers: this._getToken(),
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
            headers: this._getToken(),
        }).then(this._parseResponse);
    }

    /* ---------- Постановка и снятие лайка ----------- */
    setLike(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: this._getToken(),
        }).then(this._parseResponse);
    }

    deleteLike(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: this._getToken(),
        }).then(this._parseResponse);
    }

    /* ---------- Обновление аватара пользователя ----------- */
    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getToken(),
            body: JSON.stringify({
                avatar: data.avatar,
            })
        }).then(this._parseResponse);
    }
}

const api = new Api({
    baseUrl: 'https://api.mesto.nata.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;