
import axios from 'axios';

// Use the provided base URL
const BACKEND_URL = 'https://openai-chat-backend-6wz1.onrender.com';

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
