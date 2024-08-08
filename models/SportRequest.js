const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  sport: {
    type: String,
    required: true,
    enum: ["Fotbal", "Volei", "Tenis"], // Enumerație pentru tipurile de sport
  },
  location: {
    type: String,
    required: true,
  },
  playersNeeded: {
    type: Number,
    required: true,
  },
  description: {
    type: String, // Descrierea nu este obligatorie, așa că lăsăm `required: false`
  },
  difficultyLevel: {
    type: String,
    required: true,
    enum: ["Incepator", "Mediu", "Avansat"], // Nivelurile de dificultate
  },
  date: {
    type: String, // Păstrăm data ca șir de caractere pentru simplitate
    required: true,
  },
  user: {
    // Adăugarea câmpului pentru ID-ul utilizatorului
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("SportRequest", sportSchema);
