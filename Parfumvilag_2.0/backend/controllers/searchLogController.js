const SearchLog = require('../models/SearchLog');

exports.getAllSearchLogs = (req, res) => {
  SearchLog.getAllSearchLogs((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getSearchLogById = (req, res) => {
  SearchLog.getSearchLogById(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Search Log not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createSearchLog = (req, res) => {
  const searchLog = {
    search_term: req.body.search_term,
    user_id: req.user.id,
    created_at: new Date()
  };
  SearchLog.createSearchLog(searchLog, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...searchLog });
    }
  });
};