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
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
