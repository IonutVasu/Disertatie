const express = require("express");
const router = express.Router();
const SportRequest = require("../models/SportRequest"); // Asumând că ai modelul într-un fișier separat
const User = require("../models/User");

// Endpoint pentru crearea unei noi cereri sportive
router.post("/newSportRequest", async (req, res) => {
  try {
    // Crearea unei noi instanțe a modelului SportRequest cu datele primite
    const newSportRequest = new SportRequest({
      sport: req.body.sport,
      location: req.body.location,
      playersNeeded: req.body.playersNeeded,
      description: req.body.description,
      difficultyLevel: req.body.difficultyLevel,
      date: req.body.date,
      user: req.body.user, // Presupunând că ID-ul utilizatorului este trimis în corpul cererii
    });

    // Salvarea cererii în baza de date
    await newSportRequest.save();

    // Trimiterea unui răspuns de succes înapoi la client
    res.status(201).json({
      message: "SportRequest created successfully!",
      sportRequest: newSportRequest,
    });
  } catch (error) {
    // Trimiterea unui răspuns de eroare dacă ceva nu funcționează
    res
      .status(400)
      .json({ message: "Error creating SportRequest", error: error.message });
  }
});

router.get("/availableSports", async (req, res) => {
  try {
    // Accesarea enumerațiilor definite pentru 'sport' în schema SportRequest
    const sportsEnum = SportRequest.schema.path("sport").enumValues;

    // Trimiterea unui răspuns de succes înapoi la client cu sporturile disponibile
    res.status(200).json({
      message: "Available sports fetched successfully!",
      availableSports: sportsEnum,
    });
  } catch (error) {
    // Trimiterea unui răspuns de eroare dacă ceva nu funcționează
    res.status(400).json({
      message: "Error fetching available sports",
      error: error.message,
    });
  }
});

router.post("/findMatches", async (req, res) => {
  const {
    sport,
    location,
    playersNeeded,
    difficultyLevel,
    date,
    userId,
    partnerPreferences,
  } = req.body;

  try {
    // Găsește toate cererile sportive
    const allRequests = await SportRequest.find().populate("user").exec();

    // Filtrează cererile care se potrivesc criteriilor specificate și nu sunt făcute de utilizatorul curent
    const matches = allRequests.filter((request) => {
      request.sport === sport &&
        request.location === location &&
        request.playersNeeded === playersNeeded &&
        request.difficultyLevel === difficultyLevel &&
        request.date === date &&
        request.user._id.toString() !== userId;
    });

    if (matches.length > 0) {
      res.status(200).json({ message: "Matches found successfully", matches });
    } else {
      res.status(404).json({ message: "No matches found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding matches", error: error.message });
  }
});
// Ruta pentru a obține toate cererile sportive
router.get("/allSportRequests", async (req, res) => {
  try {
    const sportRequests = await SportRequest.find().populate("user");
    console.log("Sport requests fetched successfully: ", sportRequests);
    res.status(200).json({ sportRequests });
  } catch (error) {
    console.error("Error fetching sport requests: ", error);
    res
      .status(500)
      .json({ message: "Error fetching sport requests", error: error.message });
  }
});

module.exports = router;
