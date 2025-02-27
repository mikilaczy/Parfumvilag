const db = require('../db');

const getAllReviews = (callback) => {
  db.query('SELECT * FROM reviews', callback);
};

const getReviewById = (id, callback) => {
  db.query('SELECT * FROM reviews WHERE id = ?', [id], callback);
};

const createReview = (review, callback) => {
  db.query('INSERT INTO reviews SET ?', review, callback);
};

const updateReview = (id, review, callback) => {
  db.query('UPDATE reviews SET ? WHERE id = ?', [review, id], callback);
};

const deleteReview = (id, callback) => {
  db.query('DELETE FROM reviews WHERE id = ?', [id], callback);
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};