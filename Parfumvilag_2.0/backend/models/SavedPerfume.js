const db = require('../db');

const getAllSavedPerfumes = (callback) => {
  db.query('SELECT * FROM saved_perfumes', callback);
};

const getSavedPerfumeById = (id, callback) => {
  db.query('SELECT * FROM saved_perfumes WHERE id = ?', [id], callback);
};

const createSavedPerfume = (savedPerfume, callback) => {
  db.query('INSERT INTO saved_perfumes SET ?', savedPerfume, callback);
};

const deleteSavedPerfume = (id, callback) => {
  db.query('DELETE FROM saved_perfumes WHERE id = ?', [id], callback);
};

module.exports = {
  getAllSavedPerfumes,
  getSavedPerfumeById,
  createSavedPerfume,
  deleteSavedPerfume
};