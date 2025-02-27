const express = require('express');
const router = express.Router();
const searchLogController = require('../controllers/searchLogController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', searchLogController.getAllSearchLogs);
router.get('/:id', searchLogController.getSearchLogById);
router.post('/', authMiddleware, searchLogController.createSearchLog);

module.exports = router;