const db = require('../db');
const bcrypt = require('bcryptjs');

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

const getUserById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

const createUser = (user, callback) => {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) throw err;
    user.password = hash;
    db.query('INSERT INTO users SET ?', user, callback);
  });
};

const updateUser = (id, user, callback) => {
  if (user.password) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      db.query('UPDATE users SET ? WHERE id = ?', [user, id], callback);
    });
  } else {
    db.query('UPDATE users SET ? WHERE id = ?', [user, id], callback);
  }
};

const deleteUser = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], callback);
};

const getUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
};