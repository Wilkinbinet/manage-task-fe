// src/features/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  token: null // Agrega el estado inicial para el token
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.token = action.payload; // Almacena el token en el estado
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    register: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.token = action.payload.token; // Almacena el token en el estado
      state.error = null;
    },
    registerFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.token = null; // Borra el token al cerrar sesión
    }
  },
});

export const { login, loginSuccess, loginFailed, register, registerSuccess, registerFailed, logout } = authSlice.actions;

export default authSlice.reducer;
