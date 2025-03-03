// frontend/src/services/authService.js
import axios from 'axios';

export const register = async (name, email, password) => {
  try {
    // Megadva a konkret backend URL
    const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Regisztráció sikertelen!';
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Bejelentkezés sikertelen!';
  }
};