// frontend/src/services/userService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const getUser = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Nem sikerült betölteni a felhasználó adatait!';
  }
};

const updateUser = async (userData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_BASE_URL}/users/me`, userData, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Nem sikerült frissíteni a felhasználói adatokat!';
  }
};

export { getUser, updateUser };