import axios from 'axios';
import Cookies from 'js-cookie';

// Set up Axios instance
const baseURL = 'http://localhost:3000';
const instance = axios.create({ baseURL, withCredentials: true });

// Add interceptor to automatically add authorization header
instance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance  };