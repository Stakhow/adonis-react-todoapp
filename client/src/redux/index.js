import {combineReducers} from "redux";
import todosSlice from "./todos";
import authSlice from "./auth";
import {getDefaultMiddleware, configureStore} from "@reduxjs/toolkit";



const reducer = combineReducers({
  todos: todosSlice.reducer,
  auth: authSlice.reducer,
});

const middleware = [...getDefaultMiddleware()];

export default configureStore({reducer, middleware});
