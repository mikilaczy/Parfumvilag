import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem(
        "registrationDate",
        response.data.user.created_at.split("T")[0]
      );
      alert("Sikeresen bejelentkeztél!");
      window.location.href = "/profil";
    } catch (error) {
      setError(error.response.data.error || "Bejelentkezés sikertelen.");
    }
  };

  return (
    <div className="container">
      <h1>Bejelentkezés</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email cím
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Jelszó
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Bejelentkezés
        </button>
      </form>
      
    </div>
  );
};

export default Login;
