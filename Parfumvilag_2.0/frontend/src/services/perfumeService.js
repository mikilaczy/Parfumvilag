import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getAllPerfumes = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/perfumes/all`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Hiba a parfümök lekérésekor!";
  }
};

export const getFeaturedPerfumes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/perfumes/featured`);
    console.log("API válasz (getFeaturedPerfumes):", response.data); // Ellenőrzés
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      "Nem sikerült betölteni a kiemelt parfümök listáját!";
    console.error("Hiba a getFeaturedPerfumes-ben:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getPerfumeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/perfumes/${id}`);
    console.log("API válasz (getPerfumeById):", response.data); // Ellenőrzés
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Parfüm nem található!";
    console.error("Hiba a getPerfumeById-ben:", errorMessage);
    throw new Error(errorMessage);
  }
};
