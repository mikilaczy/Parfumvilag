// backend/controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // bcrypt importálása
require('dotenv').config();

// Regisztráció
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Ellenőrizzük az email-t
    User.getUserByEmail(email, (err, results) => {
      if (err) throw new Error('Adatbázis-hiba');
      if (results.length > 0) throw new Error('Ez az email már foglalt!');
    });

    // Felhasználó létrehozása
    User.createUser({ name, email, password }, (err, results) => {
      if (err) throw err;
      
      const token = jwt.sign({ id: results.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ user: { id: results.insertId, name, email }, token });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Bejelentkezés
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Felhasználó lekérése email alapján
    User.getUserByEmail(email, (err, results) => {
      if (err) throw new Error('Adatbázis-hiba');
      if (results.length === 0) throw new Error('Felhasználó nem található!');

      const user = results[0];
      // Jelszó ellenőrzés
      bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) throw new Error('Jelszó-hiba');
        if (!isMatch) throw new Error('Hibás jelszó!');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
      });
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};