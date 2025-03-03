// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      User.getUserById(req.user.id, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updatedUser = await new Promise((resolve, reject) => {
      User.updateUser(req.user.id, req.body, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;