export default class Api {
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

    _fetch({ path, method, body = null, token }) {
        const url = this._baseUrl + path
        return fetch(url, {
            method,
            headers: {
                ...this._headers,
                authorization: 'Bearer ' + token
            },
            body
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
    /* ---------- Загрузка информации о пользователе с сервера ----------- */
    getUserInfo(token) {
        return this._fetch({ path: 'users/me', method: 'GET', token })
    }

    /* ---------- Загрузка карточек с сервера ----------- */
    getInitialCards(token) {
        return this._fetch({ path: 'cards', method: 'GET', token })
    }

    /* ---------- Редактирование профиля ----------- */
    editUserInfo(data, token) {
        const body = JSON.stringify({
            name: data.name,
            about: data.about
        })
        return this._fetch({ path: 'users/me', method: 'PATCH', body, token })
    }

    /* ---------- Добавление новой карточки ----------- */
    addCard(data, token) {
        const body = JSON.stringify({
            name: data.name,
            link: data.link
        })
        return this._fetch({ path: 'cards', method: 'POST', body, token })
    }

    /* ---------- Удаление карточки ----------- */
    deleteCard(cardId, token) {
        return this._fetch({ path: `cards/${cardId}`, method: 'DELETE', token })
    }

    /* ---------- Постановка и снятие лайка ----------- */
    setLike(card, token) {
        return this._fetch({ path: `cards/likes/${card._id}`, method: 'PUT', token })
    }

    deleteLike(card, token) {
        return this._fetch({ path: `cards/likes/${card._id}`, method: 'DELETE', token })
    }

    /* ---------- Обновление аватара пользователя ----------- */
    editAvatar(data, token) {
        const body = JSON.stringify({
            avatar: data.avatar
        })
        return this._fetch({ path: 'users/me/avatar', method: 'PATCH', body, token })
    }
}
