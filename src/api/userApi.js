import axiosClient from './axiosClient';
import Cookies from 'js-cookie';

const baseUrl = 'user/';

const userApi = {
  login({ username, password }) {
    const url = baseUrl + 'login';
    return axiosClient.post(url, { username, password });
  },
  register({ username, email, password }) {
    const url = baseUrl + 'register';
    return axiosClient.post(url, {
      username: username,
      password: password,
      email: email,
    });
  },
  changePassword({ oldPassword, newPassword }) {
    const url = baseUrl + 'password';
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.put(
      url,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        params: {
          accessToken: accessToken,
        },
      }
    );
  },
  changeAvatar({ newAvatar }) {
    const url = baseUrl + 'avatar';
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.put(url, {
      newAvatar: newAvatar,
    });
  },
  changeEmail({ newEmail }) {
    const url = baseUrl + 'email';
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.put(
      url,
      {
        newEmail: newEmail,
      },
      {
        params: {
          accessToken: accessToken,
        },
      }
    );
  },
  deleteUser({ id }) {
    const url = baseUrl;
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.delete(url, {
      params: {
        id: id,
        accessToken: accessToken,
      },
    });
  },
  getAll({ page, limit }) {
    const url = baseUrl + 'all';
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        accessToken: accessToken,
      },
    });
  },
  getMe() {
    const url = baseUrl + 'me';
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.get(url, {
      params: {
        accessToken: accessToken,
      },
    });
  },
  getOne({ username }) {
    const url = baseUrl;
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.get(url, {
      params: {
        username: username,
        accessToken: accessToken,
      },
    });
  },
};

export default userApi;
