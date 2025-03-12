import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getAllPerfumes = async (searchTerm = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/perfumes/all`, {
      params: { search: searchTerm }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Nem sikerült betölteni a parfümek listáját!';
  }
};

export const getFeaturedPerfumes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/perfumes/featured`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Nem sikerült betölteni a kiemelt parfümök listáját!';
  }
};

export const getPerfumeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/perfumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Parfüm nem található!';
  }
};