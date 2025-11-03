import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ✅ URL backend Laravel
  withCredentials: true,
});

// ✅ Intercepteur pour ajouter le token à chaque requête si connecté
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
