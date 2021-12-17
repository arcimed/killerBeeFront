import axios from 'axios';    

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${'BFJFDLSJFLKJLKJLKGJSL'}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = 'https://example.io/api/';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};