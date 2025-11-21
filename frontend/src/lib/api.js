import axios from 'axios';

const api = axios.create({
  baseURL: '/api',           // uses vite proxy to backend
  withCredentials: true,     // include cookies if backend uses them
  headers: { 'Content-Type': 'application/json' }
});

export default api;