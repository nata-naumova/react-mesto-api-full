import { optionsApi } from "./optionsApi";

export const register = (password, email) => {
    return fetch(optionsApi.baseUrl + 'signup', {
        method: "POST",
        headers: optionsApi.headers,
        body: JSON.stringify({ password, email }),
    })
        .then((response) => {
            try {
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    console.log('некорректно заполнено одно из полей');
                }
            } catch (e) {
                console.log(e);
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        }
        );
};

export const authorize = (password, email) => {
    return fetch(optionsApi.baseUrl + 'signin', {
        method: "POST",
        headers: optionsApi.headers,
        body: JSON.stringify({ password, email }),
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                console.log('не передано одно из полей');
            } else if (response.status === 401) {
                console.log('401');
            }
        })
        .then((data) => {
            console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            }
        })
        .catch((err) => console.log(err));
};

export const checkToken = (token) => {
    return fetch(optionsApi.baseUrl + 'users/me', {
        method: 'GET',
        headers: {
            ...optionsApi.headers,
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(data => data)
} 