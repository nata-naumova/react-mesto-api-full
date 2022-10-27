export const BASE_URL = "https://api.mesto.nata.nomoredomains.icu";

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = ({ password, email }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((response) => checkResponse(response));
};

export const authorize = ({ password, email }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((response) => checkResponse(response));
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then((response) => checkResponse(response));
}
