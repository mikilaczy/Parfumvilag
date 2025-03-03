const User = require('../models/user');

exports.getUserById = (req, res) => {
  User.getUserById(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Felhasználó nem található!' });
    
    const user = results[0];
    res.status(200).json(user);
  });
};

exports.updateUser = (req, res) => {
  User.updateUser(req.user.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Felhasználó nem található!' });
    
    User.getUserById(req.user.id, (getUserErr, getUserResults) => {
      if (getUserErr) return res.status(500).json({ error: getUserErr.message });
      const updatedUser = getUserResults[0];
      res.status(200).json(updatedUser);
    });
  });
};