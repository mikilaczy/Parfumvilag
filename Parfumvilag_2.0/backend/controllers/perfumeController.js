// backend/controllers/perfumeController.js
const Perfume = require("../models/Perfume");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db"); // Importáld a db-t
require("dotenv").config();

// Összes parfüm
exports.getAllPerfumes = (req, res) => {
  const {
    query = "",
    brands = "",
    perfume_notes = "",
    gender = "",
    sort = "name-asc",
    page = 1,
    per_page = 24,
  } = req.query;

  const offset = (page - 1) * per_page;

  let sql = `
    SELECT p.* 
    FROM perfumes p
    LEFT JOIN brands b ON p.brand_id = b.id
    LEFT JOIN perfume_notes pn ON p.id = pn.perfume_id
    LEFT JOIN notes n ON pn.note_id = n.id
    WHERE 1=1
  `;
  const params = [];

  if (query) {
    sql += ` AND (p.name LIKE ? OR b.name LIKE ?)`;
    params.push(`%${query}%`, `%${query}%`);
  }
  if (brands) {
    sql += ` AND b.name = ?`;
    params.push(brands);
  }
  if (perfume_notes) {
    sql += ` AND n.name = ?`;
    params.push(perfume_notes);
  }
  if (gender) {
    sql += ` AND p.gender = ?`;
    params.push(gender);
  }

  switch (sort) {
    case "name-asc":
      sql += ` ORDER BY p.name ASC`;
      break;
    case "name-desc":
      sql += ` ORDER BY p.name DESC`;
      break;
    case "price-asc":
      sql += ` ORDER BY p.price ASC`;
      break;
    case "price-desc":
      sql += ` ORDER BY p.price DESC`;
      break;
    default:
      break;
  }

  sql += ` LIMIT ? OFFSET ?`;
  params.push(parseInt(per_page), offset);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("SQL Hiba:", err);
      return res.status(500).json({ error: "Adatbázis-hiba!" });
    }

    res.status(200).json(results);
  });
};
// Kiemelt parfümök
exports.getFeaturedPerfumes = (req, res) => {
  Perfume.getFeaturedPerfumes((err, results) => {
    if (err) {
      res.status(500).json({ error: "Adatbázis-hiba!" });
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
      res.status(500).json({ error: "Adatbázis-hiba!" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Nincs ilyen parfüm!" });
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
      res.status(500).json({ error: "Adatbázis-hiba!" });
      return;
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

// Parfüm frissítése (védett útvonal)
exports.updatePerfume = (req, res) => {
  Perfume.updatePerfume(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Adatbázis-hiba!" });
      return;
    }
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Nincs ilyen parfüm!" });
    Perfume.getPerfumeById(req.params.id, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Adatbázis-hiba!" });
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
      res.status(500).json({ error: "Adatbázis-hiba!" });
      return;
    }
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Nincs ilyen parfüm!" });
    res.status(200).json({ message: "Parfüm sikeresen törölve!" });
  });
};
