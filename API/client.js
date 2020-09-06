const globals = require('../consts')

let email = 'aricci95@gmail.com'
let token = '$2a$10$XJiyb8kTHeKFqgYKrwoOI.U2zo.zkbfPy460YAiJc8nDxauIEq.Du'

let headers = {
    'content-type': 'application/json',
    'email': email,
    'token': token,
}

export function getTables() {
    const requestOptions = {
        method: 'GET',
        headers,
    };

    const url = globals.API_HOST + '/tables';

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function getTable(id) {
    const requestOptions = {
        method: 'GET',
        headers,
    };

    const url = globals.API_HOST + '/tables/' + id;

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}


export function getFoods() {
    const requestOptions = {
        method: 'GET',
        headers,
    };

    const url = globals.API_HOST + '/foods';

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function searchFoods(label) {
    const requestOptions = {
        method: 'GET',
        headers,
    };

    const url = globals.API_HOST + '/foods/search?label=' + label;

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function addFood(table, food) {
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(food),
    };

    const url = globals.API_HOST + '/tables/' + table._id;

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function submitFood(table) {
    const requestOptions = {
        method: 'POST',
        headers,
    };

    const url = globals.API_HOST + '/tables/' + table._id + '/submit';

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function getPreparations(filter = '') {
    const requestOptions = {
        method: 'GET',
        headers,
    };

    let url = globals.API_HOST + '/preparations';

    if (filter) {
        url = url + '?filter=' + filter
    }

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function submitPreparations(table) {
    let foodIds = []

    for (var index in table.foods) {
        foodIds.push(table.foods[index].id)
    } 

    const requestOptions = {
        method: 'PUT',
        headers,
        body: JSON.stringify({
            foodIds: foodIds,
            status: globals.PREPARATION_STATUS_DONE,
        }),
    };

    const url = globals.API_HOST + '/preparations/' + table._id;

    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}
