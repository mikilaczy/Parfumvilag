const FeaturedPerfume = require('../models/FeaturedPerfume');

exports.getAllFeaturedPerfumes = (req, res) => {
  FeaturedPerfume.getAllFeaturedPerfumes((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getFeaturedPerfumeById = (req, res) => {
  FeaturedPerfume.getFeaturedPerfumeById(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Featured Perfume not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createFeaturedPerfume = (req, res) => {
  FeaturedPerfume.createFeaturedPerfume(req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
};

exports.updateFeaturedPerfume = (req, res) => {
  FeaturedPerfume.updateFeaturedPerfume(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Featured Perfume not found' });
    } else {
      FeaturedPerfume.getFeaturedPerfumeById(req.params.id, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json(results[0]);
        }
      });
    }
  });
};

exports.deleteFeaturedPerfume = (req, res) => {
  FeaturedPerfume.deleteFeaturedPerfume(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Featured Perfume not found' });
    } else {
      res.status(200).json({ message: 'Featured Perfume deleted successfully' });
    }
  });
};