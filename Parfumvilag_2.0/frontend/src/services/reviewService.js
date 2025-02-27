import axios from 'axios';

const getAllReviews = async () => {
  try {
    const response = await axios.get('/api/reviews');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getReviewById = async (id) => {
  try {
    const response = await axios.get(`/api/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createReview = async (perfumeId, review) => {
  try {
    const response = await axios.post(`/api/reviews/${perfumeId}`, review, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateReview = async (id, review) => {
  try {
    const response = await axios.put(`/api/reviews/${id}`, review, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`/api/reviews/${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error)  {
    throw error.response.data;
  }
};

export { getAllReviews, getReviewById, createReview, updateReview, deleteReview };