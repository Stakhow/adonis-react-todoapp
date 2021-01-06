import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ApiService from "../../apiService";
import Cookie from 'js-cookie';
import * as Constants from '../../constants';

const apiService = new ApiService();
const initialState = {
  user: null,
  isAuth: false,
  error: null,
  loading: false,
  entities: [],
};

export const register = createAsyncThunk(
  'auth/register',
  async payload => {
    const res = await apiService.register(payload);

    return res.data;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async payload => {
    const res = await apiService.login(payload);

    return res.data;
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async () => {
    const res = await apiService.getUser();

    return res.data;
  },
  {
    condition: () => !!Cookie.get(Constants.APP_ACCESS_TOKEN),
  }
);

export const logout = createAsyncThunk('users/logout',
  async () => {
    const res = await apiService.logout();

    return res.data
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, {payload}) => ({...state, ...payload, isAuth: true, error: false, loading: false, ...{success: {message : 'You are registered successfully'} }}),
    [register.pending]: (state, {error}) => ({...state, error, loading: true}),
    [register.rejected]: (state, {error}) => ({...state, isAuth: false, error, loading: false}),

    [login.fulfilled]: (state, {payload}) => ({...state, ...payload, isAuth: true, error: false, loading: false}),
    [login.pending]: (state, {error}) => ({...state, error, loading: true}),
    [login.rejected]: (state, {error}) => ({...state, isAuth: false, error, loading: false}),

    [fetchUser.fulfilled]: (state, {payload}) => ({...state, user: payload, isAuth: true, error: false, loading: false}),
    [fetchUser.pending]: state => ({...state, loading: true}),
    [fetchUser.rejected]: (state, {error}) => ({...state, loading: false, error}),

    [logout.fulfilled]: (state, {payload}) => ({...state, loading: false, error: false, isAuth: false}),
    [logout.pending]: state => ({...state, loading: true}),
    [logout.rejected]: (state, {error}) => ({...state, loading: false, error, isAuth: false})
  }
});

export default authSlice;
