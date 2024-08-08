const sportService = require("../services/sportService");

async function createSport(req, res) {
  try {
    const sport = await sportService.createSport(req.body);
    res.status(201).json(sport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllSports(req, res) {
  try {
    const sports = await sportService.getAllSports();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSportById(req, res) {
  try {
    const sport = await sportService.getSportById(req.params.id);
    if (sport) {
      res.json(sport);
    } else {
      res.status(404).json({ message: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateSport(req, res) {
  try {
    const updatedSport = await sportService.updateSport(
      req.params.id,
      req.body
    );
    if (updatedSport) {
      res.json(updatedSport);
    } else {
      res.status(404).json({ message: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteSport(req, res) {
  try {
    const sport = await sportService.deleteSport(req.params.id);
    if (sport) {
      res.json({ message: "Sport deleted" });
    } else {
      res.status(404).json({ message: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createSport,
  getAllSports,
  getSportById,
  updateSport,
  deleteSport,
};
