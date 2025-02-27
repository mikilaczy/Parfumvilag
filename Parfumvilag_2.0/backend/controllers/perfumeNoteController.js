const PerfumeNote = require('../models/PerfumeNote');

exports.getAllPerfumeNotes = (req, res) => {
  PerfumeNote.getAllPerfumeNotes((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getPerfumeNoteById = (req, res) => {
  PerfumeNote.getPerfumeNoteById(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Perfume Note not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createPerfumeNote = (req, res) => {
  PerfumeNote.createPerfumeNote(req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
};

exports.updatePerfumeNote = (req, res) => {
  PerfumeNote.updatePerfumeNote(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Perfume Note not found' });
    } else {
      PerfumeNote.getPerfumeNoteById(req.params.id, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json(results[0]);
        }
      });
    }
  });
};

exports.deletePerfumeNote = (req, res) => {
  PerfumeNote.deletePerfumeNote(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Perfume Note not found' });
    } else {
      res.status(200).json({ message: 'Perfume Note deleted successfully' });
    }
  });
};