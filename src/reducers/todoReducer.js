const defaultState = {
    todoList: [],
    loading: false,
}

export default (state = defaultState, action) => {

    switch (action.type) {
        case 'GET_TODO_LIST_PENDING':
            return {
                ...state
            }
        case 'GET_TODO_LIST_FULFILLED':
            return {
                ...state,
                todoList: action.payload
            }
        case 'GET_TODO_LIST_REJECTED':
            return {
                ...state
            }

        case 'SAVE_OR_UPDATE_TODO_PENDING':
            return {
                ...state
            }
        case 'SAVE_OR_UPDATE_TODO_FULFILLED':
            if (action.payload.key === "") {
                let modifiedTodoList = [...state.todoList, { ...action.payload, "key": (state.todoList.length + 1).toString() }];
                localStorage.setItem("todos", JSON.stringify(modifiedTodoList));
                return {
                    ...state,
                    todoList: modifiedTodoList
                }
            } else {
                let modifiedTodoList = state.todoList.map(todo => {
                    if (todo.key === action.payload.key)
                        return todo = action.payload
                    else
                        return todo = todo;
                });
                localStorage.setItem("todos", JSON.stringify(modifiedTodoList));
                return {
                    ...state,
                    todoList: modifiedTodoList
                }
            }

        case 'SAVE_OR_UPDATE_TODO_REJECTED':
            return {
                ...state
            }

        case 'DELETE_TODO_PENDING':
            return {
                ...state
            }
        case 'DELETE_TODO_FULFILLED':
            let modifiedTodoList = state.todoList.filter(todo => {
                return todo.key !== action.payload.key
            });
            localStorage.setItem("todos", JSON.stringify(modifiedTodoList));
            return {
                ...state,
                todoList: modifiedTodoList
            }
        case 'DELETE_TODO_REJECTED':
            return {
                ...state
            }

        default:
            return state;
    }
}