export const BASE_URL = "https://api.mesto.nata.nomoredomains.icu";

function parseResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            //authorization: `Bearer ${localStorage.getItem('jwt')}`,
            //"Accept": 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((res) => parseResponse(res));
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            //"Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((res) => parseResponse(res));
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then((res) => parseResponse(res));
}
