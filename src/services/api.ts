
import axios from 'axios';

// Get backend URL from environment variable, with a default fallback
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add withCredentials to handle CORS with cookies if needed
  withCredentials: true,
});

// Add request interceptor to attach auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

export default api;
