import axiosClient from './axiosClient';

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
    return axiosClient.get(url, {
      params: { page: page, limit: limit },
    });
  },
  create({ title, body, tags, password }) {
    const url = baseUrl;
    return axiosClient.post(url, {
      title: title,
      body: body,
      tags: tags,
      password: password,
    });
  },
  edit({ permalink, title, body, tags, password }) {
    const url = baseUrl;
    return axiosClient.put(url, {
      title: title,
      permalink: permalink,
      body: body,
      tags: tags,
      newPassword: password,
    });
  },
  delete({ permalink, password }) {
    const url = baseUrl;
    return axiosClient.delete(url, {
      permalink: permalink,
      password: password,
    });
  },
};

export default noteApi;
