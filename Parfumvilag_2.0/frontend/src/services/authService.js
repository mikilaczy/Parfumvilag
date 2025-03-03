// frontend/services/authService.js
import axios from 'axios';

export const register = async (name, email, password) => {
  try {
    const response = await axios.post('/api/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Registration failed';
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};