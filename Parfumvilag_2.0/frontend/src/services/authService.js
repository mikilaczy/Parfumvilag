import axios from 'axios';

export const register = async (name, email, password) => {
  try {
    const response = await axios.post('/api/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};