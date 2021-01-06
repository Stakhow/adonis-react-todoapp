import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ApiService from "../../apiService";

const apiService = new ApiService();
const initialState = {
  todosList: [],
  total: 0,
  loading: false,
  error: null,
};

export const createTodo = createAsyncThunk(
  'todos/create',
  async payload => {
    const todo = await apiService.createTodo(payload);

    return todo.data;
  }
);

export const fetchTodos = createAsyncThunk(
  'todos/fetch',
  async () => {
    const todos = await apiService.getTodos();

    return todos.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async id => {
    const todos = await apiService.deleteTodo(id);

    return todos.data;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/update',
  async data => {
    const todos = await apiService.updateTodo(data);

    return todos.data;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,

  extraReducers: {
    [createTodo.fulfilled]: ( state, {payload}) => {
      state.todosList.unshift(payload);
      state.loading = false;
    },
    // [createTodo.pending]: state => ({...state}),
    [createTodo.rejected]: (state, {error}) => ({...state, error, loading: false}),

    [fetchTodos.fulfilled]: (state, {payload}) => {
      state.todosList.push(...payload);
      state.total += payload.length;
      state.loading = false;
      return state;
    },
    [fetchTodos.pending]: state => ({...state, loading: true}),
    [fetchTodos.rejected]: (state, {error}) => ({...state, error, loading: false}),

    [deleteTodo.fulfilled]: (state, {payload}) => {
      state.todosList = state.todosList.filter( i => i.id !== parseInt(payload, 10));
      state.loading = false;
      return state;
    },
    [deleteTodo.pending]: state => ({...state}),
    [deleteTodo.rejected]: (state, {error}) => ({...state, error, loading: false}),

    [updateTodo.fulfilled]: (state, {payload}) => {
      state.todosList = state.todosList.map( i => i.id === payload.todo.id ? payload.todo : i);
      state.loading = false;
      return state;
    },
    // [updateTodo.pending]: state => ({...state, loading: true}),
    [updateTodo.rejected]: (state, {error}) => ({...state, error, loading: false}),


  }
});

export default todosSlice;
