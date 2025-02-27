import axios from 'axios';

const getAllFeaturedPerfumes = async () => {
  try {
    const response = await axios.get('/api/featured-perfumes');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getFeaturedPerfumeById = async (id) => {
  try {
    const response = await axios.get(`/api/featured-perfumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createFeaturedPerfume = async (featuredPerfume) => {
  try {
    const response = await axios.post('/api/featured-perfumes', featuredPerfume);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateFeaturedPerfume = async (id, featuredPerfume) => {
  try {
    const response = await axios.put(`/api/featured-perfumes/${id}`, featuredPerfume);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteFeaturedPerfume = async (id) => {
  try {
    const response = await axios.delete(`/api/featured-perfumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getAllFeaturedPerfumes, getFeaturedPerfumeById, createFeaturedPerfume, updateFeaturedPerfume, deleteFeaturedPerfume };