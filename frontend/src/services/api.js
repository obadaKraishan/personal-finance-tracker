// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Update this to match your backend server address
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
