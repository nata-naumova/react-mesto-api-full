export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _fetch({ path, method, body=null, token }) {
        const url = this._baseUrl + path;
        return fetch(url, {
            method,
            headers: {
                ...this._headers,
                authorization: 'Bearer ' + token,
            },
            body
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    /* ---------- Загрузка информации о пользователе с сервера ----------- */
    getUserInfo(token) {
        return fetch({
            path: 'users/me',
            method: 'GET',
            token
        })
    }

    /* ---------- Загрузка карточек с сервера ----------- */
    getInitialCards(token) {
        return fetch({
            path: 'cards',
            method: 'GET',
            token
        })
    }

    /* ---------- Редактирование профиля ----------- */
    editUserInfo(data, token) {
        return fetch({
            path: 'users/me',
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
            token
        })
    }

    /* ---------- Добавление новой карточки ----------- */
    addCard(data, token) {
        return fetch({
            path: 'cards',
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            token
        })
    }

    /* ---------- Удаление карточки ----------- */
    deleteCard(cardId, token) {
        return fetch({
            path: `cards/${cardId}`,
            method: 'DELETE',
            token
        })
    }

    /* ---------- Постановка и снятие лайка ----------- */
    setLike(card, method, token) {
        return fetch({
            path: `cards/likes/${card._id}`,
            method,
            token
        })
    }

    deleteLike(card, token) {
        return fetch({
            path: `cards/likes/${card._id}`,
            method: 'DELETE',
            token
        })
    }

    /* ---------- Обновление аватара пользователя ----------- */
    editAvatar(data, token) {
        return fetch({
            path: 'users/me/avatar',
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar
            }),
            token
        })
    }
}
