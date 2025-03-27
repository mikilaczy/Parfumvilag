// backend/controllers/authController.js
const User = require("../models/User"); // Módosított User modell
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Regisztráció
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Alap validáció
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Minden mező kitöltése kötelező (név, email, jelszó)!" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({
        error: "A jelszónak legalább 6 karakter hosszúnak kell lennie!",
      });
  }

  try {
    // 1. Ellenőrizzük, létezik-e már a felhasználó
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      // Nem dobunk hibát, csak státuszkódot küldünk
      return res.status(409).json({ error: "Ez az email cím már foglalt!" }); // 409 Conflict
    }

    // 2. Felhasználó létrehozása (a modell már kezeli a hashelést és a DUP_ENTRY hibát)
    const result = await User.createUser({ name, email, password });
    const userId = result.insertId;

    // 3. Sikeres regisztráció után token generálása
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 4. Felhasználói adatok visszaküldése (jelszó nélkül!)
    const newUser = await User.getUserById(userId); // Lekérjük az újonnan létrehozott usert (jelszó nélkül)
    if (!newUser) {
      // Ez nem valószínű, de jobb ellenőrizni
      console.error("User not found after creation, ID:", userId);
      return res
        .status(500)
        .json({ error: "Szerver hiba a felhasználó lekérésekor." });
    }

    res.status(201).json({
      user: {
        // Csak a szükséges, nem érzékeny adatokat küldjük vissza
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        // is_admin: newUser.is_admin // Ha szükséges
      },
      token,
    });
  } catch (error) {
    // A createUser által dobott specifikus hiba kezelése
    if (error.message === "Ez az email cím már foglalt!") {
      return res.status(409).json({ error: error.message });
    }
    // Általános szerverhiba
    console.error("Register Error:", error);
    res
      .status(500)
      .json({ error: "Szerverhiba történt a regisztráció során." });
  }
};

// Bejelentkezés
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email és jelszó megadása kötelező!" });
  }

  try {
    // 1. Felhasználó lekérése email alapján (a modell már Promise-t ad vissza)
    // Fontos: getUserByEmail most a teljes user objektumot adja vissza, jelszóval együtt!
    const user = await User.getUserByEmail(email);

    // 2. Ellenőrizzük, létezik-e a felhasználó
    if (!user) {
      // Fontos: Ne áruljuk el, hogy az email vagy a jelszó rossz!
      return res.status(401).json({ error: "Hibás email cím vagy jelszó!" }); // 401 Unauthorized
    }

    // 3. Jelszó ellenőrzés (aszinkron!)
    const isMatch = await bcrypt.compare(password, user.password);

    // 4. Ellenőrizzük a jelszó egyezést
    if (!isMatch) {
      // Fontos: Ne áruljuk el, hogy az email vagy a jelszó rossz!
      return res.status(401).json({ error: "Hibás email cím vagy jelszó!" }); // 401 Unauthorized
    }

    // 5. Sikeres bejelentkezés => Token generálása
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 6. Felhasználói adatok visszaküldése (jelszó nélkül!)
    res.status(200).json({
      user: {
        // Csak a szükséges, nem érzékeny adatokat küldjük vissza
        id: user.id,
        name: user.name,
        email: user.email,
        // is_admin: user.is_admin // Ha szükséges
      },
      token,
    });
  } catch (error) {
    // Általános szerverhiba
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ error: "Szerverhiba történt a bejelentkezés során." });
  }
};
