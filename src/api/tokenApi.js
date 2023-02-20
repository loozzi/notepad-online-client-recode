import axiosClient from './axiosClient';

const baseURL = 'refreshToken';

const tokenApi = {
  generate: async ({ refreshToken }) => {
    const res = await axiosClient.post(baseURL, {
      refreshToken: refreshToken,
    });

    console.log(res);
    return res;
  },
  delete: async ({ refreshToken }) => {
    await axiosClient.delete(baseURL, {
      refreshToken: refreshToken,
    });
  },
};

export default tokenApi;
