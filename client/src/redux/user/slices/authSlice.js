import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  isAuth: false,
  role: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.isAuth = action.payload.isAuth;
      state.role = action.payload.role;
      state.error = null;
    },
    logout: (state) => {
      state.id = null;
      state.isAuth = false;
      state.role = null;
      state.error = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    authenticationError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, authenticationError, setRole } = authSlice.actions;

export default authSlice.reducer;
