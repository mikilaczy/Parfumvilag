import axios from 'axios';

const getUser = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/users/me', {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

const updateUser = async (userData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put('/api/users/me', userData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export { getUser, updateUser };