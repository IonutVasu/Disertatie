const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/SportifyDB"; // înlocuiește cu URL-ul tău de MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectat cu succes la MongoDB!"))
  .catch((err) => console.error("Nu s-a putut conecta la MongoDB:", err));

module.exports = mongoose;
