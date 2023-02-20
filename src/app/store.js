import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/Layout/Login/authSlice';
import homeReducer from '../components/Layout/Home/HomeSlice';
import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
