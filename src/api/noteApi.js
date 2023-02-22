import axiosClient from './axiosClient';
import Cookies from 'js-cookie';

const baseUrl = 'note/';

const noteApi = {
  get({ permalink, password }) {
    const url = baseUrl;
    return axiosClient.get(url, {
      params: {
        permalink: permalink,
        password: password,
      },
    });
  },
  getAll({ page, limit }) {
    const url = baseUrl + 'all';
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.get(url, {
      params: { page: page, limit: limit, accessToken: accessToken },
    });
  },
  create({ title, body, tags, password }) {
    const url = baseUrl;
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.post(
      url,
      {
        title: title,
        body: body,
        tags: tags,
        password: password,
      },
      {
        params: { accessToken: accessToken },
      }
    );
  },
  edit({ permalink, title, body, tags, password }) {
    const url = baseUrl;
    const accessToken = Cookies.get('accessToken') || '';
    return axiosClient.put(
      url,
      {
        title: title,
        permalink: permalink,
        body: body,
        tags: tags,
        newPassword: password,
      },
      {
        params: {
          accessToken: accessToken,
        },
      }
    );
  },
  delete({ permalink, password }) {
    const accessToken = Cookies.get('accessToken') || '';
    const url = baseUrl; // + `?accessToken=${accessToken}`;
    return axiosClient.delete(url, {
      params: {
        permalink: permalink,
        password: password,
        accessToken: accessToken,
      },
    });
  },
};

export default noteApi;
