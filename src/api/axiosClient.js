import axios from 'axios';
import tokenApi from './tokenApi';
import cookie from 'react-cookies';
import { history } from '../utils/history';
import routes from '../utils/routes';
import { useAppDispatch } from '../app/hook';
import { authActions } from '../components/Layout/Login/authSlice';

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: 'https://notepad-online-server.vercel.app/api/v1/',
  // baseURL: 'http://localhost:3001/api/v1/',
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const whiteList = ['login', 'register', 'refreshToken', 'note'];
    let flag = false;

    whiteList.forEach((item) => {
      if (config.url.indexOf(item) >= 0) flag = true;
    });

    console.log(config.url);

    if (flag) {
      return config;
    }

    try {
      if (!(document.cookie.indexOf('accessToken') >= 0)) {
        const refreshToken = localStorage.getItem('refreshToken') || '';
        const res = await tokenApi.generate({ refreshToken });
        if (res.code === 200) {
          localStorage.setItem('refreshToken', refreshToken);
          document.cookie = `accessToken=${res.elements.accessToken};max-age=1800;samesite`;
        } else {
          localStorage.removeItem('refreshToken');
          document.cookie = '';
          history.push(`/${routes.LOGIN}`);
          const dispatch = useAppDispatch();
          dispatch(authActions.logout());
        }
      }
    } catch (err) {
      return Promise.reject(err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
