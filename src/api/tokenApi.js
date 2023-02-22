import axiosClient from './axiosClient';

const baseURL = 'refreshToken';

const tokenApi = {
  generate: async ({ refreshToken }) => {
    const res = await axiosClient.post(baseURL, {
      params: {
        refreshToken: refreshToken,
      },
    });

    console.log(res);
    return res;
  },
  delete: async ({ refreshToken }) => {
    await axiosClient.delete(baseURL, {
      params: {
        refreshToken: refreshToken,
      },
    });
  },
};

export default tokenApi;
