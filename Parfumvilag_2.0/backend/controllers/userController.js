// backend/controllers/userController.js
const User = require('../models/user');

exports.getUserById = (req, res) => {
  User.getUserById(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Adatbázis-hiba!' });
    if (results.length === 0) return res.status(404).json({ error: 'Felhasználó nem található!' });
    res.status(200).json(results[0]);
  });
};

exports.updateUser = (req, res) => {
  User.updateUser(req.user.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: 'Adatbázis-hiba!' });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Felhasználó nem található!' });
    res.status(200).json({ success: true });
  });
};