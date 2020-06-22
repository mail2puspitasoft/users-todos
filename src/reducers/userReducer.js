const defaultState = {
    userList: [],
    loading: false,
}

export default (state = defaultState, action) => {

    switch (action.type) {
        case 'GET_USER_LIST_PENDING':
            return {
                ...state
            }
        case 'GET_USER_LIST_FULFILLED':
            return {
                ...state,
                userList: action.payload
            }
        case 'GET_USER_LIST_REJECTED':
            return {
                ...state
            }

        case 'SAVE_OR_UPDATE_USER_PENDING':
            return {
                ...state
            }
        case 'SAVE_OR_UPDATE_USER_FULFILLED':
            if (action.payload.key === "") {
                let updatedUserList = [...state.userList, { ...action.payload, "key": (state.userList.length + 1).toString() }];
                localStorage.setItem("users", JSON.stringify(updatedUserList));
                return {
                    ...state,
                    userList: updatedUserList
                }
            } else {
                let updatedUserList = state.userList.map(user => {
                    if (user.key === action.payload.key)
                        return user = action.payload
                    else
                        return user = user;
                })
                localStorage.setItem("users", JSON.stringify(updatedUserList));
                return {
                    ...state,
                    userList: updatedUserList
                }
            }

        case 'SAVE_OR_UPDATE_USER_REJECTED':
            return {
                ...state
            }

        case 'DELETE_USER_PENDING':
            return {
                ...state
            }
        case 'DELETE_USER_FULFILLED':
            let updatedUserList = state.userList.filter(user => {
                return user.key !== action.payload.key
            })
            localStorage.setItem("users", JSON.stringify(updatedUserList));
            return {
                ...state,
                userList: updatedUserList
            }
        case 'DELETE_USER_REJECTED':
            return {
                ...state
            }

        default:
            return state;
    }
}