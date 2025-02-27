const express = require('express');
const router = express.Router();
const savedPerfumeController = require('../controllers/savedPerfumeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', savedPerfumeController.getAllSavedPerfumes);
router.get('/:id', savedPerfumeController.getSavedPerfumeById);
router.post('/', authMiddleware, savedPerfumeController.createSavedPerfume);
router.delete('/:id', authMiddleware, savedPerfumeController.deleteSavedPerfume);

module.exports = router;