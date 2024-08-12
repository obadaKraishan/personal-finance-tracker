import React, { createContext, useState } from 'react';
import { login, register } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = async (userData) => {
    const data = await login(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const handleRegister = async (userData) => {
    const data = await register(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
