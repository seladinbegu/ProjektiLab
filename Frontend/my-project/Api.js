// src/services/api.js

import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:5132/api', // Your API base URL
    withCredentials: true, // Ensures cookies are sent with requests
});

// Intercept requests to add the AuthToken from cookies
api.interceptors.request.use(config => {
  const token = Cookies.get('AuthToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
