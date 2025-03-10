const express = require('express');
const router = express.Router();
const PerfumeController = require('../controllers/perfumeController');

// Összes parfüm
router.get('/all', PerfumeController.getAllPerfumes);

// Kiemelt parfümök
router.get('/featured', PerfumeController.getFeaturedPerfumes);

module.exports = router;