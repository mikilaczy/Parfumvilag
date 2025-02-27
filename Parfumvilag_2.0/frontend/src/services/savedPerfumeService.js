import axios from 'axios';

const getAllSavedPerfumes = async () => {
  try {
    const response = await axios.get('/api/saved-perfumes');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getSavedPerfumeById = async (id) => {
  try {
    const response = await axios.get(`/api/saved-perfumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createSavedPerfume = async (savedPerfume) => {
  try {
    const response = await axios.post('/api/saved-perfumes', savedPerfume, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteSavedPerfume = async (id) => {
  try {
    const response = await axios.delete(`/api/saved-perfumes/${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getAllSavedPerfumes, getSavedPerfumeById, createSavedPerfume, deleteSavedPerfume };