export function getTodoList() {
    return {
        type: 'GET_TODO_LIST_FULFILLED',
        payload: JSON.parse(localStorage.getItem('todos'))
    }
}

export function saveOrUpdateTodo(todo) {
    return {
        type: 'SAVE_OR_UPDATE_TODO_FULFILLED',
        payload: todo
    }
}

export function deleteTodo(todo) {
    return {
        type: 'DELETE_TODO_FULFILLED',
        payload: todo
    }
}