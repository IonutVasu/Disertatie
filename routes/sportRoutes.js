const express = require("express");
const sportController = require("../controllers/sportController");
const router = express.Router();

router.post("/newSport", sportController.createSport);
router.get("/sports", sportController.getAllSports);
router.get("/sports/:id", sportController.getSportById);
router.put("/editSport/:id", sportController.updateSport);
router.delete("/deleteSport/:id", sportController.deleteSport);

module.exports = router;
