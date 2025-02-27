const SavedPerfume = require('../models/SavedPerfume');

exports.getAllSavedPerfumes = (req, res) => {
  SavedPerfume.getAllSavedPerfumes((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getSavedPerfumeById = (req, res) => {
  SavedPerfume.getSavedPerfumeById(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Saved Perfume not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createSavedPerfume = (req, res) => {
  const savedPerfume = {
    user_id: req.user.id,
    perfume_id: req.body.perfume_id,
    created_at: new Date()
  };
  SavedPerfume.createSavedPerfume(savedPerfume, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...savedPerfume });
    }
  });
};

exports.deleteSavedPerfume = (req, res) => {
  SavedPerfume.deleteSavedPerfume(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Saved Perfume not found' });
    } else {
      res.status(200).json({ message: 'Saved Perfume deleted successfully' });
    }
  });
};