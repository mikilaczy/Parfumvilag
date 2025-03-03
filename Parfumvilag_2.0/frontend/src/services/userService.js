// frontend/services/userService.js
import axios from 'axios';

const getUser = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('/api/users/me', {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to get user';
  }
};

const updateUser = async (userData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put('/api/users/me', userData, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to update user';
  }
};

export { getUser, updateUser };