import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Ensure this matches your backend server address
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
