import axiosClient from '../../../api/axiosClient';
import userApi from '../../../api/userApi';
import { fork, put, take, call } from 'redux-saga/effects';
import { authActions } from './authSlice';
import tokenApi from '../../../api/tokenApi';
import { history } from '../../../utils/history';
import routes from '../../../utils/routes';
import { toast } from 'react-toastify';
import cookie from 'react-cookies';

function* handleLogin(payload) {
  try {
    const toastId = toast.loading('Please wait...');
    const resLogin = yield call(userApi.login, payload);
    if (resLogin.code === 200) {
      localStorage.setItem('refreshToken', resLogin.elements.refreshToken);
      const expires = new Date();
      expires.setTime(expires.getTime() + 1800 * 1000);

      cookie.save('accessToken', resLogin.elements.accessToken, {
        maxAge: 1800,
      });

      const resUserData = yield call(userApi.getMe);
      if (resUserData.code === 200) {
        yield put(authActions.loginSuccess(resUserData.elements.user));
        toast.update(toastId, {
          render: 'Login Success, redirect to home in 3s...',
          type: 'success',
          isLoading: false,
          draggable: true,
          closeOnClick: true,
          autoClose: 3000,
        });
        setTimeout(() => {
          history.push('/');
        }, 3000);
      } else {
        localStorage.removeItem('refreshToken');
        toast.update(toastId, {
          render: resUserData.message,
          type: 'error',
          isLoading: false,
          draggable: true,
          closeOnClick: true,
          autoClose: 3000,
        });
      }
    } else {
      yield put(authActions.loginFailed(resLogin.message));
      toast.update(toastId, {
        render: resLogin.message,
        type: 'error',
        isLoading: false,
        draggable: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  } catch (err) {
    yield put(authActions.loginFailed('Error when login'));
  }
}

function* handleLogout() {
  yield tokenApi.delete({
    refreshToken: axiosClient.getLocalRefreshToken(),
  });
}

function* watchLoggingFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('refreshToken'));
    if (!isLoggedIn) {
      const action = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    } else {
      const resUserData = yield call(userApi.getMe);
      if (resUserData.code === 200) {
        yield put(authActions.loginSuccess(resUserData.elements.user));
        if (history.location.pathname === `/${routes.LOGIN}`)
          yield put(history.push('/'));
        yield take(authActions.logout.type);
        yield call(handleLogout);
      } else {
        localStorage.removeItem('refreshToken');
        yield put(authActions.logout());
      }
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoggingFlow);
}
