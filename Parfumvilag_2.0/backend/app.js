const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Importáljuk az útvonalakat
const authRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const featuredPerfumeRoutes = require('./routes/featuredPerfumeRoutes');
const noteRoutes = require('./routes/noteRoutes');
const perfumeRoutes = require('./routes/perfumeRoutes');
const perfumeNoteRoutes = require('./routes/perfumeNoteRoutes');
const reviewRoutes = require('./routes/reviewController');
const savedPerfumeRoutes = require('./routes/savedPerfumeRoutes');
const searchLogRoutes = require('./routes/searchLogRoutes');
const storeRoutes = require('./routes/storeRoutes');

// Használjuk az útvonalakat
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/featured-perfumes', featuredPerfumeRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/perfumes', perfumeRoutes);
app.use('/api/perfume-notes', perfumeNoteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/saved-perfumes', savedPerfumeRoutes);
app.use('/api/search-logs', searchLogRoutes);
app.use('/api/stores', storeRoutes);

// Kapcsolódunk a MySQL-hez a db.js segítségével
const db = require('./db');

// Adatbázis tesztelése
db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('Error testing MySQL connection:', err.stack);
    return;
  }
  console.log('MySQL connection successful:', results[0].solution);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));