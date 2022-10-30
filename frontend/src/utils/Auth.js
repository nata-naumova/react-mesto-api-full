//export const BASE_URL = "https://api.mesto.nata.nomoredomains.icu";
export const BASE_URL = "http://localhost:3000";

const getJson = (response) => {
    if (response.ok) {
        return response.json();
    }
    return console.log('Ошибка на сервере: ' + response.status + ' - ' + response.statusText);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
    .then(getJson)
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
    .then(getJson)
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(getJson)
    /*.then(data => data)*/
} 