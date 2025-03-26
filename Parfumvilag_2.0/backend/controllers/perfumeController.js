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
  console.log("Beérkező paraméterek:", { brand, note, gender });
  const offset = (page - 1) * per_page;
  const params = [];
  const conditions = [];

  // JOIN-ok dinamikus hozzáadása
  let joinClause = `
    LEFT JOIN perfume_notes pn ON p.id = pn.perfume_id
    LEFT JOIN notes n ON pn.note_id = n.id
    LEFT JOIN stores s ON p.id = s.perfume_id
  `;

  if (note) {
    joinClause = `
      INNER JOIN perfume_notes pn ON p.id = pn.perfume_id
      INNER JOIN notes n ON pn.note_id = n.id
      LEFT JOIN stores s ON p.id = s.perfume_id
      
    `;
  }

  // SQL lekérdezés összeállítása
  let sql = `
    SELECT 
      p.*,
      MIN(s.price) AS price
    FROM perfumes p
    LEFT JOIN brands b ON p.brand_id = b.id
    ${joinClause}
    WHERE 1=1
  `;

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
    params.push(gender); // gender értéke 'male', 'female' vagy 'unisex' kell legyen
  }

  // Feltételek összefűzése
  if (conditions.length > 0) {
    sql += " AND " + conditions.join(" AND ");
  }
  sql += " GROUP BY p.id"; // Fontos: csoportosítás a MIN() függvényhez
  // Rendezés hozzáadása
  switch (sort) {
    case "name-asc":
      sql += " ORDER BY p.name ASC";
      break;
    case "name-desc":
      sql += " ORDER BY p.name DESC";
      break;
    case "price-asc":
      sql += " ORDER BY price ASC";
      break;
    case "price-desc":
      sql += " ORDER BY price DESC";
      break;
  }

  // Lapozás hozzáadása
  sql += " LIMIT ? OFFSET ?";
  params.push(parseInt(per_page, 10), offset); // per_page és offset számokként

  // COUNT lekérdezés
  const countSql = `
    SELECT COUNT(*) AS total 
    FROM (
      SELECT p.id
      FROM perfumes p
      LEFT JOIN brands b ON p.brand_id = b.id
      ${joinClause}
      WHERE 1=1
      ${conditions.length > 0 ? " AND " + conditions.join(" AND ") : ""}
      GROUP BY p.id
    ) AS subquery`;

  // COUNT paraméterek (LIMIT/OFFSET nélkül)
  const countParams = [...params.slice(0, -2)];

  // Naplózáson alapuló hibakeresés

  console.log("Generált SQL:", sql);
  console.log("Paraméterek:", params);
  console.log("COUNT SQL:", countSql);
  console.log("COUNT Paraméterek:", countParams);

  // Adatbázis lekérdezések futtatása
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("SQL Hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba!" });
    }

    db.query(countSql, countParams, (countErr, countResults) => {
      if (countErr) {
        console.error("COUNT SQL Hiba:", countErr);
        return res.status(500).json({ error: "Adatbázis hiba!" });
      }

      const totalCount = countResults[0]?.total || 0;
      const totalPages = Math.ceil(totalCount / per_page);

      res.status(200).json({
        perfumes: results,
        totalPages,
        currentPage: parseInt(page, 10),
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
  const perfumeId = parseInt(req.params.id);

  // 1. Lekérdezés: Parfüm alapadatok + illatjegyek
  const perfumeSql = `
    SELECT 
      p.*, 
      b.name AS brand_name,
      GROUP_CONCAT(DISTINCT n.name) AS notes
    FROM perfumes p
    LEFT JOIN brands b ON p.brand_id = b.id
    LEFT JOIN perfume_notes pn ON p.id = pn.perfume_id
    LEFT JOIN notes n ON pn.note_id = n.id
    WHERE p.id = ?
    GROUP BY p.id
  `;

  // 2. Lekérdezés: Üzletek
  const storesSql = `
    SELECT 
      store_name, 
      url, 
      price, 
      currency 
    FROM stores 
    WHERE perfume_id = ?
  `;

  // Első lekérdezés futtatása
  db.query(perfumeSql, [perfumeId], (err, perfumeResult) => {
    if (err) {
      console.error("SQL Hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba!" });
    }

    if (perfumeResult.length === 0) {
      return res.status(404).json({ error: "Parfüm nem található!" });
    }

    // Második lekérdezés futtatása
    db.query(storesSql, [perfumeId], (storeErr, storeResult) => {
      if (storeErr) {
        console.error("SQL Hiba (üzletek):", storeErr);
        return res.status(500).json({ error: "Adatbázis hiba!" });
      }

      // Adatok összeállítása
      const perfumeData = {
        ...perfumeResult[0],
        notes: perfumeResult[0].notes ? perfumeResult[0].notes.split(",") : [],
        stores: storeResult, // Üzletek külön tömbben
      };

      res.status(200).json(perfumeData);
    });
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
