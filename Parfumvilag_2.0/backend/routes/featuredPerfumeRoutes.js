const express = require('express');
const router = express.Router();
const featuredPerfumeController = require('../controllers/featuredPerfumeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', featuredPerfumeController.getAllFeaturedPerfumes);
router.get('/:id', featuredPerfumeController.getFeaturedPerfumeById);
router.post('/', authMiddleware, featuredPerfumeController.createFeaturedPerfume);
router.put('/:id', authMiddleware, featuredPerfumeController.updateFeaturedPerfume);
router.delete('/:id', authMiddleware, featuredPerfumeController.deleteFeaturedPerfume);

module.exports = router;