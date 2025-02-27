import axios from 'axios';

const getAllPerfumes = async (searchTerm = '') => {
  try {
    const response = await axios.get(`/api/perfumes?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getPerfumeById = async (id) => {
  try {
    const response = await axios.get(`/api/perfumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createPerfume = async (perfume) => {
  try {
    const response = await axios.post('/api/perfumes', perfume);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updatePerfume = async (id, perfume) => {
  try {
    const response = await axios.put(`/api/perfumes/${id}`, perfume);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deletePerfume = async (id) => {
  try {
    const response = await axios.delete(`/api/perfumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getAllPerfumes, getPerfumeById, createPerfume, updatePerfume, deletePerfume };