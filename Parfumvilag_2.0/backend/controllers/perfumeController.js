// backend/controllers/perfumeController.js
const Perfume = require('../models/Perfume');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Összes parfüm
exports.getAllPerfumes = (req, res) => {
  Perfume.getAllPerfumes((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Adatbázis-hiba!' });
      return;
    }
    res.status(200).json(results);
  });
};

// Kiemelt parfümök
exports.getFeaturedPerfumes = (req, res) => {
  Perfume.getFeaturedPerfumes((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Adatbázis-hiba!' });
      return;
    }
    res.status(200).json(results);
  });
};

// Parfüm azonosító alapján
exports.getPerfumeById = (req, res) => {
  const perfumeId = req.params.id;
  Perfume.getPerfumeById(perfumeId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Adatbázis-hiba!' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Nincs ilyen parfüm!' });
      return;
    }
    // Ellenőrzés: a 'notes' mező kelljen a visszatérési adatban
    const perfumeData = results[0];
    perfumeData.notes = perfumeData.notes || []; // Ha tömbként van
    res.status(200).json(perfumeData);
  });
};

// Parfüm létrehozása (védett útvonal)
exports.createPerfume = (req, res) => {
  Perfume.createPerfume(req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Adatbázis-hiba!' });
      return;
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

// Parfüm frissítése (védett útvonal)
exports.updatePerfume = (req, res) => {
  Perfume.updatePerfume(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Adatbázis-hiba!' });
      return;
    }
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Nincs ilyen parfüm!' });
    Perfume.getPerfumeById(req.params.id, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Adatbázis-hiba!' });
        return;
      }
      res.status(200).json(results[0]);
    });
  });
};

// Parfüm törlése (védett útvonal)
exports.deletePerfume = (req, res) => {
  Perfume.deletePerfume(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Adatbázis-hiba!' });
      return;
    }
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Nincs ilyen parfüm!' });
    res.status(200).json({ message: 'Parfüm sikeresen törölve!' });
  });
};