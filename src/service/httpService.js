import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `${Cookies.get('user')}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = 'http://localhost:3000/';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};