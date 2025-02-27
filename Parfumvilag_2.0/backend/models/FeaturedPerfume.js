const db = require('../db');

const getAllFeaturedPerfumes = (callback) => {
  db.query('SELECT * FROM featured_perfumes', callback);
};

const getFeaturedPerfumeById = (id, callback) => {
  db.query('SELECT * FROM featured_perfumes WHERE id = ?', [id], callback);
};

const createFeaturedPerfume = (featuredPerfume, callback) => {
  db.query('INSERT INTO featured_perfumes SET ?', featuredPerfume, callback);
};

const updateFeaturedPerfume = (id, featuredPerfume, callback) => {
  db.query('UPDATE featured_perfumes SET ? WHERE id = ?', [featuredPerfume, id], callback);
};

const deleteFeaturedPerfume = (id, callback) => {
  db.query('DELETE FROM featured_perfumes WHERE id = ?', [id], callback);
};

module.exports = {
  getAllFeaturedPerfumes,
  getFeaturedPerfumeById,
  createFeaturedPerfume,
  updateFeaturedPerfume,
  deleteFeaturedPerfume
};