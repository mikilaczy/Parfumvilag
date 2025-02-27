const db = require('../db');

const getAllSearchLogs = (callback) => {
  db.query('SELECT * FROM search_logs', callback);
};

const getSearchLogById = (id, callback) => {
  db.query('SELECT * FROM search_logs WHERE id = ?', [id], callback);
};

const createSearchLog = (searchLog, callback) => {
  db.query('INSERT INTO search_logs SET ?', searchLog, callback);
};

module.exports = {
  getAllSearchLogs,
  getSearchLogById,
  createSearchLog
};