// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.status = 'authenticated';
    },
    logout: (state) => {
      state.token = null;
      state.status = 'idle';
    },
  },
});

export const { loginSuccess,logout } = authSlice.actions;

export default authSlice.reducer;
