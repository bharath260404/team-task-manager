import axios from 'axios';

const api = axios.create({
  // This tells the app: "Use the Railway link if it exists, otherwise use localhost."
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api', 
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;