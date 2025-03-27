// backend/controllers/userController.js
const User = require("../models/User");

// GET User Data (No changes needed here, assuming it works)
exports.getUserById = async (req, res, next) => {
  const userId = req.user.id; // From authMiddleware
  try {
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Felhasználó nem található!" });
    }
    res.status(200).json(user); // Send user data (without password)
  } catch (err) {
    console.error(`Error fetching user ${userId}:`, err);
    next(err); // Pass to central error handler
  }
};

// UPDATE User Data (Handles JSON body)
exports.updateUser = async (req, res, next) => {
  const userId = req.user.id;
  // Data comes directly from the JSON body parser
  const userDataFromRequest = req.body;

  // Basic check for essential data if needed (though frontend validates)
  if (!userDataFromRequest || typeof userDataFromRequest !== "object") {
    return res.status(400).json({ error: "Érvénytelen kérés törzs." });
  }

  try {
    console.log(
      `Controller: Updating user ${userId}. Received data:`,
      userDataFromRequest
    );

    // Call the simplified model function (which expects JSON-like data)
    const result = await User.updateUser(userId, userDataFromRequest);

    // Check if the update actually happened in the DB
    // result.affectedRows might be 1 even if changedRows is 0 (if data was identical)
    if (result.affectedRows === 0) {
      // Maybe user doesn't exist? Should be caught by getUserById usually.
      // Or data was identical. Let's treat identical data as success.
      console.warn(
        `Controller: Update for user ${userId} affected 0 rows. Data might be identical or user not found.`
      );
      // Re-fetch current data to be safe
    }

    console.log(
      `Controller: Update processed for user ${userId}. Fetching fresh data...`
    );
    // --- Always re-fetch user data after update attempt ---
    const updatedUser = await User.getUserById(userId);

    if (!updatedUser) {
      // This is problematic, update happened but user can't be fetched?
      console.error(
        `Controller: CRITICAL - Failed to fetch user ${userId} immediately after update!`
      );
      // Send a specific error indicating inconsistency
      return res
        .status(500)
        .json({
          error: "Felhasználó frissítve, de az adatok újratöltése sikertelen.",
        });
    }

    console.log(`Controller: Returning updated user data for ${userId}.`);
    // Send the freshly fetched user data back
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    // Catch errors from User.updateUser (like duplicate email) or other issues
    console.error(
      `Controller: Error during user update process for ${userId}:`,
      err
    );
    // Pass the error to the central error handler
    next(err);
  }
};
