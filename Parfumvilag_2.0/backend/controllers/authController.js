const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Ellenőrizzük, hogy az email már nem létezik
    User.getUserByEmail(email, (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ error: 'Ez az email már foglalt!' });
      }
    });

    // Felhasználó létrehozása
    User.createUser({ name, email, password }, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const user = { id: results.insertId, name, email };
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.status(201).json({ user, token });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  User.getUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Felhasználó nem található!' });
    
    const user = results[0];
    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) return res.status(500).json({ error: bcryptErr.message });
      if (!isMatch) return res.status(401).json({ error: 'Hibás jelszó!' });
      
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
    });
  });
};