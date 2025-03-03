// backend/controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await new Promise((resolve, reject) => {
      User.getUserByEmail(email, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const createdUser = await new Promise((resolve, reject) => {
      User.createUser({ name, email, password }, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    const user = { id: createdUser.insertId, name, email };
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await new Promise((resolve, reject) => {
      User.getUserByEmail(email, (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};