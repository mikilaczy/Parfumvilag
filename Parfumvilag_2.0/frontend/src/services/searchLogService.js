import axios from 'axios';

const getAllSearchLogs = async () => {
  try {
    const response = await axios.get('/api/search-logs');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getSearchLogById = async (id) => {
  try {
    const response = await axios.get(`/api/search-logs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createSearchLog = async (searchLog) => {
  try {
    const response = await axios.post('/api/search-logs', searchLog, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getAllSearchLogs, getSearchLogById, createSearchLog };