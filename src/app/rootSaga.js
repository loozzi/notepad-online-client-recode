import authSaga from '../components/Layout/Login/authSaga';
import homeSaga from '../components/Layout/Home/HomeSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  console.log('rootSaga');
  yield all([authSaga(), homeSaga()]);
}
