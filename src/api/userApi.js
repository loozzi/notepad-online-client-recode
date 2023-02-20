import axiosClient from './axiosClient';

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
    return axiosClient.put(url, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  },
  changeAvatar({ newAvatar }) {
    const url = baseUrl + 'avatar';
    return axiosClient.put(url, {
      newAvatar: newAvatar,
    });
  },
  changeEmail({ newEmail }) {
    const url = baseUrl + 'email';
    return axiosClient.put(url, {
      newEmail: newEmail,
    });
  },
  deleteUser({ id }) {
    const url = baseUrl;
    return axiosClient.delete(url, {
      params: {
        id: id,
      },
    });
  },
  getAll({ page, limit }) {
    const url = baseUrl + 'all';
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
      },
    });
  },
  getMe() {
    const url = baseUrl + 'me';
    return axiosClient.get(url);
  },
  getOne({ username }) {
    const url = baseUrl;
    return axiosClient.get(url, {
      params: {
        username: username,
      },
    });
  },
};

export default userApi;
