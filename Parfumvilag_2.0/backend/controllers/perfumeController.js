const Perfume = require('../models/perfume');

exports.getAllPerfumes = (req, res) => {
  Perfume.getAllPerfumes((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getPerfumeById = (req, res) => {
  Perfume.getPerfumeById(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Perfume not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createPerfume = (req, res) => {
  Perfume.createPerfume(req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
};

exports.updatePerfume = (req, res) => {
  Perfume.updatePerfume(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Perfume not found' });
    } else {
      Perfume.getPerfumeById(req.params.id, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json(results[0]);
        }
      });
    }
  });
};

exports.deletePerfume = (req, res) => {
  Perfume.deletePerfume(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Perfume not found' });
    } else {
      res.status(200).json({ message: 'Perfume deleted successfully' });
    }
  });
};