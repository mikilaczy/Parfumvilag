const express = require('express');
const router = express.Router();
const perfumeNoteController = require('../controllers/perfumeNoteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', perfumeNoteController.getAllPerfumeNotes);
router.get('/:id', perfumeNoteController.getPerfumeNoteById);
router.post('/', authMiddleware, perfumeNoteController.createPerfumeNote);
router.put('/:id', authMiddleware, perfumeNoteController.updatePerfumeNote);
router.delete('/:id', authMiddleware, perfumeNoteController.deletePerfumeNote);

module.exports = router;