const express = require("express");
const router = express.Router();
const PerfumeController = require("../controllers/perfumeController");

router.get("/batch", PerfumeController.getPerfumesByIds);

router.get("/all", PerfumeController.getAllPerfumes);
router.get("/random", PerfumeController.getRandomPerfumes);
router.get("/featured", PerfumeController.getFeaturedPerfumes); // Might need adjustment based on DB
router.get("/:id", PerfumeController.getPerfumeById);

module.exports = router;
