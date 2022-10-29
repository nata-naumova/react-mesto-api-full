export class Auth {
    constructor(config) {
        this.baseURL = config.baseURL
    }
    //registration
    register(email, password) {
        return fetch(`${this.baseURL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                if (res.status !== 400) {
                    return res.json();
                } else {
                    throw new Error('Некорректно заполнено одно из полей');
                }
            })
            .then((res) => {
                return res;
            })
    };
    //authorisation
    authorize(email, password) {
        return fetch(`${this.baseURL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
                if (res.status === 400) {
                    throw new Error('Не передано одно из полей');
                }
                if (res.status === 401) {
                    throw new Error('Пользователь с email не найден');
                }
            })
    };
    //get access as a loggedIn user
    getData(token) {
        return fetch(`${this.baseURL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
                if (res.status === 400) {
                    throw new Error('Токен не передан или передан не в том формате');
                }
                if (res.status === 401) {
                    throw new Error('Переданный токен некорректен');
                }
            })
            .then((data) => {
                return data;
            })
    };
}

export const auth = new Auth({
    baseURL: 'https://api.mesto.nata.nomoredomains.icu',
})