// src/services/authService.js
import api from './api';

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData); // Ensure this path is correct
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/api/auth/login', userData); // Ensure this path is correct
  return response.data;
};
