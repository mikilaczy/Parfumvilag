const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) return res.status(401).json({ error: 'Nincs hitelesítési token!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token érvénytelen!' });
  }
};

module.exports = authMiddleware;