const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(bodyParser.json());

// Importáljuk az útvonalakat
const authRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const featuredPerfumeRoutes = require('./routes/featuredPerfumeRoutes');
const noteRoutes = require('./routes/noteRoutes');
const perfumeRoutes = require('./routes/perfumeRoutes');
const perfumeNoteRoutes = require('./routes/perfumeNoteRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const savedPerfumeRoutes = require('./routes/savedPerfumeRoutes');
const searchLogRoutes = require('./routes/searchLogRoutes');
const storeRoutes = require('./routes/storeRoutes');
const userRoutes = require('./routes/userRoutes');
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
app.use('/api/users', userRoutes);

// Kapcsolódunk a MySQL-hez a db.js segítségével
const db = require('./db');

app.get('/api/featured-perfumes', (req, res) => {
  const featuredPerfumes = [
    { id: 1, name: "Chanel No. 5", brand: "Chanel", gender: "female", description: "Időtlen klasszikus, ikonikus virágos-aldehides illat.", scents: ["Virágos", "Aldehides"], price: 45000, image_url: "https://fimgs.net/himg/o.97897.jpg" },
    { id: 2, name: "Sauvage", brand: "Dior", gender: "male", description: "Friss, erőteljes, nyers és nemes összetevőkkel.", scents: ["Fás", "Fűszeres", "Friss"], price: 38000, image_url: "https://cdn.notinoimg.com/detail_main_mq/dior/3348901250153_01/sauvage___200828.jpg" },
    { id: 3, name: "Black Opium", brand: "Yves Saint Laurent", gender: "female", description: "Erőteljes és érzéki illat, kávé és vanília jegyekkel.", scents: ["Orientális", "Fűszeres", "Édes"], price: 44000, image_url: "https://cdn.shopify.com/s/files/1/0259/7733/products/black-opium-le-parfum-90ml_grande.png?v=1679625919" },
    // ... több parfüm
  ];
  res.json(featuredPerfumes);
});




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