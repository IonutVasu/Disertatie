const Sport = require("../models/Sport");

async function createSport(data) {
  const sport = new Sport(data);
  return await sport.save();
}

async function getAllSports() {
  return await Sport.find();
}

async function getSportById(id) {
  return await Sport.findById(id);
}

async function updateSport(id, data) {
  return await Sport.findByIdAndUpdate(id, data, { new: true });
}

async function deleteSport(id) {
  return await Sport.findByIdAndDelete(id);
}

module.exports = {
  createSport,
  getAllSports,
  getSportById,
  updateSport,
  deleteSport,
};
