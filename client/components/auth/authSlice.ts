import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      loading: false,
      error: false,
    },
    register: {
      success: false,
      isFetching: false,
      loading: false,
      error: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login = {
        ...state.login,
        isFetching: true,
      };
    },
    loginSuccess: (state, action) => {
      state.login = {
        ...state.login,
        isFetching: true,
        currentUser: action.payload,
        error: false,
      };
    },
    loginFailure: (state) => {
      state.login = {
        ...state.login,
        isFetching: false,
        error: true,
      };
    },
    registerStart: (state) => {
      state.register = {
        ...state.register,
        isFetching: true,
      };
    },
    registerSuccess: (state) => {
      state.register = {
        ...state.register,
        isFetching: false,
        success: true,
        error: false,
      };
    },
    registerFailure: (state) => {
      state.register = {
        ...state.register,
        isFetching: false,
        error: true,
        success: false,
      };
    },
    logoutStart: (state) => {
      state.login = {
        ...state.login,
        isFetching: true,
      };
    },
    logoutSuccess: (state) => {
      state.login = {
        ...state.login,
        currentUser: null,
        isFetching: false,
        error: false,
      };
    },
    logoutFailure: (state) => {
      state.login = {
        ...state.login,
        isFetching: false,
        error: true,
      };
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
