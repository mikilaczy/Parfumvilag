// backend/controllers/perfumeController.js
const Perfume = require("../models/Perfume");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");
require("dotenv").config();

// Összes parfüm
// backend/controllers/perfumeController.js
// backend/controllers/perfumeController.js
exports.getAllPerfumes = (req, res) => {
  const {
    query = "",
    brand = "",
    note = "",
    gender = "",
    sort = "name-asc",
    page = 1,
    per_page = 24,
  } = req.query;
  const offset = (page - 1) * per_page;

  // 1. SQL lekérdezés dinamikus összeállítása
  let sql = `
    SELECT DISTINCT p.* 
    FROM perfumes p
    LEFT JOIN brands b ON p.brand_id = b.id
    LEFT JOIN perfume_notes pn ON p.id = pn.perfume_id
    LEFT JOIN notes n ON pn.note_id = n.id
    WHERE 1=1
  `;

  const params = [];
  const conditions = [];

  // Feltételek hozzáadása
  if (query) {
    conditions.push("(p.name LIKE ? OR b.name LIKE ?)");
    params.push(`%${query}%`, `%${query}%`);
  }
  if (brand) {
    conditions.push("b.name = ?");
    params.push(brand);
  }
  if (note) {
    conditions.push("n.name = ?");
    params.push(note);
  }
  if (gender) {
    conditions.push("p.gender = ?");
    params.push(gender);
  }

  // Feltételek összefűzése
  if (conditions.length > 0) {
    sql += " AND " + conditions.join(" AND ");
  }

  // Rendezés
  switch (sort) {
    case "name-asc":
      sql += " ORDER BY p.name ASC";
      break;
    case "name-desc":
      sql += " ORDER BY p.name DESC";
      break;
    case "price-asc":
      sql += " ORDER BY p.price ASC";
      break;
    case "price-desc":
      sql += " ORDER BY p.price DESC";
      break;
  }

  // Lapozás hozzáadása
  sql += " LIMIT ? OFFSET ?";
  params.push(parseInt(per_page), offset);

  // 2. COUNT lekérdezés javítva
  const countSql = `
    SELECT COUNT(DISTINCT p.id) AS total
    FROM perfumes p
    LEFT JOIN brands b ON p.brand_id = b.id
    LEFT JOIN perfume_notes pn ON p.id = pn.perfume_id
    LEFT JOIN notes n ON pn.note_id = n.id
    WHERE 1=1
    ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
  `;

  // 3. Adatbázis lekérdezések futtatása
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: "Database error!" });
    }

    db.query(countSql, params.slice(0, -2), (countErr, countResults) => {
      // LIMIT/OFFSET eltávolítva
      if (countErr) {
        console.error("Count SQL Error:", countErr);
        return res.status(500).json({ error: "Database error!" });
      }

      const totalCount = countResults[0]?.total || 0;
      const totalPages = Math.ceil(totalCount / per_page);

      res.status(200).json({
        perfumes: results,
        totalPages,
        currentPage: parseInt(page),
      });
    });
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
