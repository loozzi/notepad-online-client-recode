import axios from 'axios';
import tokenApi from './tokenApi';
import cookie from 'react-cookies';

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: 'https://vast-erin-tuna-suit.cyclic.app/api/v1/',
  // baseURL: 'http://localhost:3001/api/v1/',
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const whiteList = ['login', 'register', 'refreshToken'];
    let flag = false;

    whiteList.forEach((item) => {
      if (config.url.indexOf(item) >= 0) flag = true;
    });

    if (flag) {
      return config;
    }

    try {
      if (!(document.cookie.indexOf('accessToken') >= 0)) {
        const refreshToken = localStorage.getItem('refreshToken') || '';
        const res = await tokenApi.generate({ refreshToken });
        if (res.code === 200) {
          // document.cookie = `accessToken=${res.elements.accessToken};max-age=1800;domain=.vast-erin-tuna-suit.cyclic.app;path=/`;
          cookie.save('accessToken', res.elements.accessToken, {
            maxAge: 1800,
            domain: '.vast-erin-tuna-suit.cyclic',
            path: '/',
          });
        } else {
          localStorage.removeItem('refreshToken');
          document.cookie = '';
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
