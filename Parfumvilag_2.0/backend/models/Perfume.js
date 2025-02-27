const db = require('../db');

const getAllPerfumes = (callback) => {
  db.query('SELECT * FROM perfumes', callback);
};

const getPerfumeById = (id, callback) => {
  db.query('SELECT * FROM perfumes WHERE id = ?', [id], callback);
};

const createPerfume = (perfume, callback) => {
  db.query('INSERT INTO perfumes SET ?', perfume, callback);
};

const updatePerfume = (id, perfume, callback) => {
  db.query('UPDATE perfumes SET ? WHERE id = ?', [perfume, id], callback);
};

const deletePerfume = (id, callback) => {
  db.query('DELETE FROM perfumes WHERE id = ?', [id], callback);
};

module.exports = {
  getAllPerfumes,
  getPerfumeById,
  createPerfume,
  updatePerfume,
  deletePerfume
};