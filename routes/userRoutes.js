const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // presupunând că ai un model Mongoose User
const router = express.Router();

router.post("/addUser", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Verifică datele primite

    // Hashing parola utilizatorului
    const salt = await bcrypt.genSalt(10); // Generează un salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Creează hash-ul parolei

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword, // Folosește parola hash-uită
    });

    // Salvarea noului utilizator în baza de date
    const savedUser = await newUser.save();

    // Trimiterea răspunsului
    res.status(201).send({
      user: savedUser,
      message: "Utilizator înregistrat cu succes!",
      userId: savedUser._id, // Trimite înapoi ID-ul utilizatorului
    });
  } catch (error) {
    console.log("Error: ", error); // Log pentru eroare
    res.status(400).send({ error: error.message });
  }
});
// const bcrypt = require('bcryptjs')
// router.post("/addUser", async (req, res) => {
//   try {
//     console.log("Serverul a fost apelat pentru ruta /addUser"); // Mesajul de logare
//     console.log("Received data:", req.body); // Afișează datele primite în consolă

//     const newUser = new User({
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password, // Stocăm parola fără hashing pentru simplificare
//     });

//     // Salvarea noului utilizator în baza de date
//     await newUser.save();

//     // Trimiterea răspunsului
//     res
//       .status(201)
//       .send({ user: newUser, message: "Utilizator înregistrat cu succes!" });
//   } catch (error) {
//     console.log("Error: ", error); // Log pentru eroare
//     res.status(400).send({ error: error.message });
//   }
// });

// Ruta pentru ștergerea unui utilizator
router.delete("/Deleteuser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "Utilizatorul nu a fost găsit." });
    }

    await User.deleteOne({ _id: userId });
    res.send({ message: "Utilizator șters cu succes." });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

// Ruta de logare
router.post("/login", async (req, res) => {
  try {
    // Caută utilizatorul după email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "Utilizatorul nu a fost găsit." });
    }

    // Verifică parola
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Parolă incorectă." });
    }

    // Dacă parola este corectă, trimite un răspuns de succes
    res.status(200).send({
      success: true,
      user: user.username,
      message: "Logare reușită!",
      userId: user._id,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: error.message });
  }
});
// router.post("/login", async (req, res) => {
//   // Găsirea utilizatorului după email sau username
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(400).send("Email sau parolă incorectă");
//   }

//   // Verificarea parolei
//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) {
//     return res.status(400).send("Email sau parolă incorectă");
//   }

//   // // Crearea tokenului JWT
//   // const token = jwt.sign(
//   //   { userId: user._id },
//   //   process.env.JWT_SECRET,
//   //   { expiresIn: "2h" } // sau orice alt interval de timp dorit
//   // );

//   // Trimiterea tokenului ca răspuns
//   res.send({ token: token, message: "Autentificare reușită" });
// });
// Ruta pentru editarea profilului unui utilizator
router.put("/user/edit/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Utilizatorul nu a fost găsit." });
    }

    if (updates.username) user.username = updates.username;
    if (updates.description) user.profileInfo.description = updates.description;
    if (updates.age) user.profileInfo.age = updates.age;
    if (updates.gender) {
      if (!["Bărbat", "Femeie"].includes(updates.gender)) {
        return res.status(400).send({ message: "Gen invalid." });
      }
      user.profileInfo.gender = updates.gender;
    }
    if (updates.photo) user.profileInfo.photo = updates.photo;

    await user.save();
    res.send({ user, message: "Profilul a fost actualizat cu succes." });
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/updateUser/:id", async (req, res) => {
  try {
    // Prepară obiectul de actualizare cu căi complete pentru profileInfo
    const updateData = {
      username: req.body.username, // Actualizare directă, câmp la nivelul rădăcină
      "profileInfo.description": req.body.description,
      "profileInfo.age": req.body.age,
      "profileInfo.gender": req.body.gender,
      "profileInfo.skillLevel": req.body.skillLevel,
    };

    // Dacă există o fotografie nouă, actualizează și acest câmp
    if (req.body.photo) {
      updateData["profileInfo.photo"] = req.body.photo;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res
      .status(200)
      .send({ user: updatedUser, message: "Profil actualizat cu succes!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET user by ID
router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "username email profileInfo"
    );
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

// Endpoint pentru a adăuga un prieten în friendList
router.post("/addFriend", async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res
      .status(400)
      .json({ error: "User ID and Friend ID are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verificăm dacă prietenul nu este deja în lista de prieteni
    if (!user.friendList.includes(friendId)) {
      user.friendList.push(friendId);
      await user.save();
    }

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding friend" });
  }
});

// Endpoint pentru a obține lista de prieteni a unui utilizator
router.get("/getFriends/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "friendList",
      "username profileInfo"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.friendList);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching friends" });
  }
});

module.exports = router;
