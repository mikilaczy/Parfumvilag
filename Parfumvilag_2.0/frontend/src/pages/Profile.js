import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileDate, setProfileDate] = useState("");
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/users/me", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const user = response.data;
        setProfileName(user.name);
        setProfileEmail(user.email);
        setProfileDate(user.created_at.split("T")[0]);
        setNewName(user.name);
        setNewEmail(user.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Profil betöltése sikertelen.");
      }
    };

    if (localStorage.getItem("isLoggedIn") === "true") {
      fetchProfile();
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "/api/users/me",
        { name: newName, email: newEmail, password: newPassword },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const updatedUser = response.data;
      setProfileName(updatedUser.name);
      setProfileEmail(updatedUser.email);
      setEditing(false);
      alert("Adatok frissítve!");
    } catch (error) {
      setError(error.response.data.error || "Adatok frissítése sikertelen.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("registrationDate");
    localStorage.removeItem("token");
    alert("Sikeresen kijelentkeztél!");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>Profil</h1>
      <div className="row">
        <div className="col-12">
          <h3>Felhasználói adatok</h3>
          {editing ? (
            <form id="profileForm">
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">
                  Név
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editEmail" className="form-label">
                  Email cím
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="editEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editPassword" className="form-label">
                  Új jelszó
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="editPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Mentés
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={handleCancel}
              >
                Mégse
              </button>
            </form>
          ) : (
            <div>
              <p>
                <strong>Név:</strong> {profileName}
              </p>
              <p>
                <strong>Email:</strong> {profileEmail}
              </p>
              <p>
                <strong>Regisztráció dátuma:</strong> {profileDate}
              </p>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleEdit}
              >
                Adatok szerkesztése
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={handleLogout}
              >
                Kijelentkezés
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
