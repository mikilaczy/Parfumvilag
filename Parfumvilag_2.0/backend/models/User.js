const db = require("../db");
const bcrypt = require("bcryptjs");
const { queryAsync } = require("./helpers"); // Assuming queryAsync is in a helper file now

// Helper function to promisify db.query

const getAllUsers = async () => {
  return queryAsync(
    "SELECT id, name, email, phone, profile_picture_url, is_admin, created_at FROM users"
  ); // Password excluded
};

const getUserById = async (id) => {
  // Include profile_picture_url
  const results = await queryAsync(
    "SELECT id, name, email, phone, profile_picture_url, is_admin, created_at FROM users WHERE id = ?",
    [id]
  );
  return results.length > 0 ? results[0] : null;
};

const getUserByEmail = async (email) => {
  // Visszaadja a teljes user objektumot (jelszóval együtt) az ellenőrzéshez
  const results = await queryAsync("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return results.length > 0 ? results[0] : null;
};

const createUser = async (user) => {
  try {
    const hash = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hash };
    // Explicit oszlopok megadása a biztonság kedvéért
    const { name, email, password, phone, profile_picture_url, is_admin } =
      newUser;
    const result = await queryAsync(
      "INSERT INTO users (name, email, password, phone, profile_picture_url, is_admin) VALUES (?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        password,
        phone || null,
        profile_picture_url || null,
        is_admin || 0,
      ]
    );
    return { insertId: result.insertId }; // Visszaadjuk az új ID-t
  } catch (error) {
    // Kezeljük az esetleges egyedi kulcs (email) ütközést
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Ez az email cím már foglalt!");
    }
    throw error; // Egyéb hibák továbbdobása
  }
};

const updateUser = async (id, userData) => {
  const user = { ...userData }; // Clone input

  // Hash password if provided and not empty
  if (user.password && user.password.trim() !== "") {
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (hashErr) {
      console.error("Password hashing error:", hashErr);
      throw new Error("Jelszó hashelési hiba.");
    }
  } else {
    delete user.password; // Don't update password if empty or not provided
  }

  // Prepare data for DB update - only allowed fields
  // Make sure these names match your DB columns exactly
  const allowedFields = [
    "name",
    "email",
    "password",
    "phone",
    "profile_picture_url",
  ];
  const updateData = {};

  for (const key of allowedFields) {
    if (user.hasOwnProperty(key)) {
      // Check if the key exists in the input
      // Allow setting fields to null if an empty string is provided
      updateData[key] =
        user[key] === null || user[key] === "" ? null : user[key];
    }
  }

  // If password was deleted because it was empty, ensure it's not in updateData
  if (!user.password && updateData.hasOwnProperty("password")) {
    delete updateData.password;
  }

  if (Object.keys(updateData).length === 0) {
    console.log("No valid fields to update for user:", id);
    // Return something indicating no change, maybe fetch current user?
    return {
      affectedRows: 0,
      changedRows: 0,
      message: "Nincs frissítendő adat.",
    };
  }

  console.log("Executing DB update for user:", id, "with data:", updateData);

  try {
    const result = await queryAsync("UPDATE users SET ? WHERE id = ?", [
      updateData,
      id,
    ]);
    console.log("DB update result:", result);
    if (result.affectedRows === 0) {
      console.warn(`User ${id} not found or data identical during update.`);
    }
    return result; // Return the MySQL result object
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      // Check which key caused the duplicate error if possible (often involves parsing error message)
      if (error.message.includes("email")) {
        throw new Error("Ez az email cím már foglalt!");
      } else {
        throw new Error("Adatbázis hiba: Duplikált bejegyzés."); // More generic
      }
    }
    console.error("Error updating user in DB:", error);
    throw new Error("Adatbázis hiba a felhasználó frissítésekor."); // Throw generic DB error
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  queryAsync, // Esetleg exportálhatod más modellekhez is
};
