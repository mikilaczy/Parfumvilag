import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../services/userService";
import { AuthContext } from "../App";

const Profile = () => {
  // State from Context
  const {
    isLoggedIn,
    user: contextUser,
    login: contextLogin,
    logout: contextLogout,
  } = useContext(AuthContext);

  // Local State
  const [user, setUser] = useState(contextUser || null);
  const [loading, setLoading] = useState(!contextUser);
  const [updateLoading, setUpdateLoading] = useState(false); // KÜLÖN state a frissítéshez!
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(""); // Általános/Fetch hiba
  const [updateError, setUpdateError] = useState(""); // Frissítési hiba
  const [validationErrors, setValidationErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState("");

  // Form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [profileImage, setProfileImage] = useState(""); // Display state

  const navigate = useNavigate();

  // --- Function to Initialize Form State ---
  const initializeForm = useCallback((userData) => {
    if (!userData) return;
    setNewName(userData.name || "");
    setNewEmail(userData.email || "");
    setPhoneNumber(userData.phone || "");
    const currentImageUrl = userData.profile_picture_url || "";
    setImageUrl(currentImageUrl);
    setProfileImage(currentImageUrl);
    setNewPassword("");
    setValidationErrors({});
    setUpdateError("");
    setUpdateSuccess("");
  }, []);

  // --- Fetch User Data ---
  const fetchUser = useCallback(async () => {
    // Csak akkor fetcheljünk, ha be van jelentkezve és még nincs adat VAGY nincs init loading
    if (!isLoggedIn || loading) return;

    console.log("[fetchUser] Fetching user data...");
    setLoading(true); // Kezdeti betöltés jelzése
    setError("");
    try {
      const userData = await getUser();
      console.log("[fetchUser] Data received:", userData);
      if (!userData) throw new Error("Nem érkeztek felhasználói adatok.");
      setUser(userData);
      contextLogin(userData, localStorage.getItem("token")); // Context frissítése
      initializeForm(userData); // Form init
    } catch (err) {
      console.error("[fetchUser] Error:", err);
      setError(err.message || "Hiba történt a profil betöltése közben.");
      setUser(null);
      if (err.message.includes("hitelesít") || err.response?.status === 401) {
        contextLogout();
        navigate("/bejelentkezes");
      }
    } finally {
      setLoading(false); // Kezdeti betöltés vége
      console.log("[fetchUser] Fetch finished.");
    }
  }, [
    isLoggedIn,
    loading,
    navigate,
    contextLogin,
    contextLogout,
    initializeForm,
  ]); // Figyel a loading state-re is!

  // --- Effect to Fetch or Initialize ---
  useEffect(() => {
    if (isLoggedIn) {
      if (contextUser && !user) {
        console.log("Effect: Initializing from contextUser");
        setUser(contextUser);
        initializeForm(contextUser);
        if (loading) setLoading(false);
      } else if (!user && !loading) {
        console.log("Effect: No user, fetching...");
        fetchUser();
      } else if (user && !editing) {
        initializeForm(user); // Ensure form sync when not editing
      }
    } else {
      // Redirect if not logged in
      // navigate('/bejelentkezes');
    }
  }, [
    isLoggedIn,
    contextUser,
    user,
    loading,
    editing,
    fetchUser,
    initializeForm,
    navigate,
  ]); // Hozzáadva initializeForm, navigate

  // --- Form Validation ---
  const validateForm = useCallback(() => {
    const errors = {};
    // ... (ugyanaz a validáció, mint korábban) ...
    if (!newName.trim()) errors.name = "Név megadása kötelező!";
    if (!newEmail.trim()) {
      errors.email = "Email cím megadása kötelező!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      errors.email = "Érvénytelen email cím formátum!";
    }
    if (newPassword && newPassword.length < 6) {
      errors.password =
        "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
    }
    if (
      phoneNumber &&
      phoneNumber.trim() &&
      !/^\+?[0-9\s-()]{7,}$/.test(phoneNumber)
    ) {
      errors.phoneNumber = "Érvénytelen telefonszám formátum!";
    }
    const trimmedImageUrl = imageUrl.trim();
    if (trimmedImageUrl && !/^https?:\/\/.+\..+/i.test(trimmedImageUrl)) {
      errors.imageUrl =
        "Érvénytelen URL formátum! (http:// vagy https:// kell)";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [newName, newEmail, newPassword, phoneNumber, imageUrl]);

  // --- Handle Update (Drastically Simplified) ---
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUpdateLoading(true); // START update loading
    setUpdateError("");
    setUpdateSuccess("");

    const dataToUpdate = {
      name: newName.trim(),
      email: newEmail.trim(),
      phone: phoneNumber.trim() || null,
      profile_picture_url: imageUrl.trim() || null,
    };
    if (newPassword.trim()) {
      dataToUpdate.password = newPassword.trim();
    }

    try {
      console.log(
        "[handleEdit Simplified] Attempting update with data:",
        dataToUpdate
      );
      await updateUser(dataToUpdate); // Call update service
      console.log(
        "[handleEdit Simplified] Update API call presumed successful."
      );

      // --- NINCS AZONNALI STATE FRISSÍTÉS ---
      // Csak jelezzük a sikert, és kilépünk a szerkesztésből

      setEditing(false);
      setNewPassword(""); // Jelszó mező ürítése
      setUpdateSuccess(
        "Adatok elméletileg mentve! Frissítsd az oldalt a változások megtekintéséhez."
      ); // Tájékoztatás
      // Nincs setTimeout a success üzenethez itt
    } catch (updateErr) {
      console.error(
        "[handleEdit Simplified] Profile update process error:",
        updateErr
      );
      setUpdateError(
        updateErr.message || "Hiba történt az adatok mentése közben."
      );
    } finally {
      // --- **KRITIKUS:** Biztosítjuk, hogy a töltés leálljon ---
      console.log("[handleEdit Simplified] Update process finished.");
      setUpdateLoading(false); // STOP update loading indicator
    }
  };

  // --- Logout ---
  const handleLogout = () => {
    if (window.confirm("Biztosan ki szeretne lépni?")) {
      contextLogout();
      navigate("/");
    }
  };

  // --- Cancel Edit ---
  const handleCancelEdit = () => {
    setEditing(false);
    if (user) {
      // Reset form from current user state
      initializeForm(user);
    }
    // Clear errors relevant to editing
    setUpdateError("");
    setValidationErrors({});
    setUpdateSuccess("");
  };

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="container text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Profil betöltése...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Ha a betöltés kész, de nincs user (hiba történt)
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4>Hiba</h4>
          <p>{error || "Felhasználói adatok nem tölthetők be."}</p>
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate("/bejelentkezes")}
          >
            Bejelentkezés
          </button>
          {!error?.includes("hitelesít") && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => fetchUser()}
            >
              Újrapróbálás
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- Main Profile Render ---
  return (
    <div className="container py-5">
      <div className="profile-card">
        <h1 className="profile-title mb-4">Profil</h1>
        {/* Display messages */}
        {updateSuccess && (
          <div className="alert alert-success">{updateSuccess}</div>
        )}
        {updateError && <div className="alert alert-danger">{updateError}</div>}
        {error && !editing && (
          <div className="alert alert-danger">{error}</div>
        )}{" "}
        {/* Show fetch error only when not editing */}
        <div className="profile-content">
          {/* Image Section */}
          <div className="profile-image-section">
            <img
              src={
                profileImage || "https://via.placeholder.com/150?text=Profil"
              }
              alt={`${user.name} profilképe`}
              className="profile-image"
              key={profileImage} // Force re-render on change
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=Hiba";
              }}
            />
            {editing && (
              <div className="mt-3">
                <label htmlFor="profileImageUrl" className="form-label">
                  Profilkép URL
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.imageUrl ? "is-invalid" : ""
                  }`}
                  id="profileImageUrl"
                  value={imageUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    setImageUrl(url);
                    setProfileImage(url); // Update preview
                  }}
                  placeholder="Kép URL-je (pl. https://...)"
                  aria-describedby="imageUrlError"
                  disabled={updateLoading} // Disable while updating
                />
                {validationErrors.imageUrl && (
                  <div id="imageUrlError" className="invalid-feedback">
                    {validationErrors.imageUrl}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Details / Form Section */}
          <h3 className="profile-subtitle mb-3">Felhasználói adatok</h3>
          {!editing ? (
            // --- Display Mode ---
            <div className="profile-details">
              <p>
                <strong>Név:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Telefonszám:</strong> {user.phone || "Nincs megadva"}
              </p>
              <p>
                <strong>Regisztráció:</strong>{" "}
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("hu-HU")
                  : "Ismeretlen"}
              </p>
              <div className="profile-actions mt-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setEditing(true)}
                  disabled={updateLoading}
                >
                  Adatok szerkesztése
                </button>
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={handleLogout}
                  disabled={updateLoading}
                >
                  Kilépés
                </button>
              </div>
            </div>
          ) : (
            // --- Editing Mode ---
            <form id="profileForm" onSubmit={handleEdit}>
              {/* Inputs using state: newName, newEmail, phoneNumber, imageUrl, newPassword */}
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">
                  Név
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.name ? "is-invalid" : ""
                  }`}
                  id="editName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  disabled={updateLoading}
                  aria-describedby="nameError"
                />
                {validationErrors.name && (
                  <div id="nameError" className="invalid-feedback">
                    {validationErrors.name}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="editEmail" className="form-label">
                  Email cím
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    validationErrors.email ? "is-invalid" : ""
                  }`}
                  id="editEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  disabled={updateLoading}
                  aria-describedby="emailError"
                />
                {validationErrors.email && (
                  <div id="emailError" className="invalid-feedback">
                    {validationErrors.email}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="editPhoneNumber" className="form-label">
                  Telefonszám (opcionális)
                </label>
                <input
                  type="tel"
                  className={`form-control ${
                    validationErrors.phoneNumber ? "is-invalid" : ""
                  }`}
                  id="editPhoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Pl. +36 30 123 4567"
                  disabled={updateLoading}
                  aria-describedby="phoneNumberError"
                />
                {validationErrors.phoneNumber && (
                  <div id="phoneNumberError" className="invalid-feedback">
                    {validationErrors.phoneNumber}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="editPassword" className="form-label">
                  Új jelszó (üresen hagyva nem változik)
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    validationErrors.password ? "is-invalid" : ""
                  }`}
                  id="editPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 karakter"
                  disabled={updateLoading}
                  aria-describedby="passwordError"
                />
                {validationErrors.password && (
                  <div id="passwordError" className="invalid-feedback">
                    {validationErrors.password}
                  </div>
                )}
              </div>
              {/* Action Buttons */}
              <div className="profile-actions mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Mentés...
                    </>
                  ) : (
                    "Mentés"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary ms-2"
                  onClick={handleCancelEdit}
                  disabled={updateLoading}
                >
                  Mégse
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
