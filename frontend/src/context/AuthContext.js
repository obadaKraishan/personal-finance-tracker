import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const savedUser = JSON.parse(localStorage.getItem('user')); // Save the user info
      setUser(savedUser); // Set user state from localStorage
    }
  }, [token]);

  const handleLogin = async (userData) => {
    const data = await login(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); // Save user info in localStorage
  };

  const handleRegister = async (userData) => {
    const data = await register(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); // Save user info in localStorage
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user info from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
