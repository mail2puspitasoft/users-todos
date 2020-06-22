import { combineReducers, createStore, applyMiddleware } from 'redux';
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import todoReducer from './reducers/todoReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    todoReducer,
    userReducer
})

const store = createStore(rootReducer, applyMiddleware(promise, thunk, logger));

export default store;