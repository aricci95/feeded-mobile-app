const API_HOST = 'https://feeded-app.herokuapp.com'

export function getTables() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'email': 'aricci95@gmail.com',
            'token': '$2a$10$XJiyb8kTHeKFqgYKrwoOI.U2zo.zkbfPy460YAiJc8nDxauIEq.Du',
        },
    };

    const url = API_HOST + '/tables';

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function getTable(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'email': 'aricci95@gmail.com',
            'token': '$2a$10$XJiyb8kTHeKFqgYKrwoOI.U2zo.zkbfPy460YAiJc8nDxauIEq.Du',
        },
    };

    const url = API_HOST + '/tables/' + id;

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}


export function getFoods() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'email': 'aricci95@gmail.com',
            'token': '$2a$10$XJiyb8kTHeKFqgYKrwoOI.U2zo.zkbfPy460YAiJc8nDxauIEq.Du',
        },
    };

    const url = API_HOST + '/foods';

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function searchFoods(label) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'email': 'aricci95@gmail.com',
            'token': '$2a$10$XJiyb8kTHeKFqgYKrwoOI.U2zo.zkbfPy460YAiJc8nDxauIEq.Du',
        },
    };

    const url = API_HOST + '/foods/search?label=' + label;

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}