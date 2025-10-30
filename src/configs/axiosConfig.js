import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common['Authorization'] = getToken() ? `Bearer ${getToken()}` : '';

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Sessão expirada ou não autorizada.');
    }
    return Promise.reject(error);
  }
);

export default axios;
