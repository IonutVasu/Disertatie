const express = require("express");
const app = express();

require("./db");
console.log("Aplicația a pornit");

const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use(userRoutes);

const sportRouter = require("./routes/sportRequestRoutes");
// app.use(sportRouter);
// Utilizarea rutei pentru sporturi cu un prefix specific
app.use("/sports", sportRouter);

const matchRouter = require("./routes/matchRoutes");
app.use("/match", matchRouter);

const chatRoutes = require("./routes/chatRoutes");
app.use("/chat", chatRoutes);

// Ruta de bază
app.get("/", (req, res) => {
  res.send("Serverul funcționează!");
});

app.get("/test", (req, res) => {
  res.send("Ruta de test funcționează!");
});

// Pornirea serverului
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}...`);
});
