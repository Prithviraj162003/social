import axios from 'axios';

// Use environment variable for backend API URL, fallback to localhost for dev
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL + '/api'
    : 'http://localhost:5000/api',
});

// Attach JWT token from localStorage to every request if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

