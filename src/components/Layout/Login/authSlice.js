import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, actions) {
      state.logging = true;
    },
    loginSuccess(state, actions) {
      state.logging = false;
      state.currentUser = actions.payload;
      state.isLoggedIn = true;
    },
    loginFailed(state, actions) {
      state.logging = false;
      state.isLoggedIn = false;
    },
    logout(state) {
      state.logging = false;
      state.currentUser = undefined;
      state.isLoggedIn = false;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
export const selectCurrentUser = (state) => state.auth.currentUser;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
