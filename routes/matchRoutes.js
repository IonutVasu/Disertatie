const express = require("express");
const router = express.Router();
const User = require("../models/User");
const SportRequest = require("../models/SportRequest");

// Endpoint pentru a găsi utilizatori cu aceleași opțiuni sportive
router.post("/matchingUsers", async (req, res) => {
  const { sport, location, playersNeeded, difficultyLevel, date, userId } =
    req.body;
  console.log("Received request with parameters:", req.body);

  try {
    // Găsim cererile sportive care se potrivesc cu cerințele
    const sportRequests = await SportRequest.find({
      sport: sport,
      location: location,
      playersNeeded: parseInt(playersNeeded, 10),
      difficultyLevel: difficultyLevel,
      date: date,
      user: { $ne: userId }, // Exclude utilizatorul curent
    }).populate("user");

    console.log("Matching sport requests found:", sportRequests);

    // Extragem utilizatorii din cererile sportive potrivite
    const matchingUsers = sportRequests.map((request) => request.user);

    console.log("Matching users found:", matchingUsers);

    res.json({ matchingUsers: matchingUsers });
  } catch (err) {
    console.error("Error finding matching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
