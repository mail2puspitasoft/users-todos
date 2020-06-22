export function getUserList() {
    return {
        type: 'GET_USER_LIST_FULFILLED',
        payload: JSON.parse(localStorage.getItem('users'))
    }
}

export function saveOrUpdateUser(user) {
    return {
        type: 'SAVE_OR_UPDATE_USER_FULFILLED',
        payload: user
    }
}

export function deleteUser(user) {
    return {
        type: 'DELETE_USER_FULFILLED',
        payload: user
    }
}