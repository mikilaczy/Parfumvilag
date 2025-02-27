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
      <div className="contact_link_box mt-3">
        <a href="#" className="contact_link">
          <i className="fas fa-map-marker-alt"></i>
          Budapest
        </a>
        <a href="#" className="contact_link">
          <i className="fas fa-phone-alt"></i>
          +1 23 456 789
        </a>
        <a href="#" className="contact_link">
          <i className="fas fa-envelope"></i>
          Parfümvilág.hu
        </a>
      </div>
      <div className="footer_social mt-3">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg"
            alt="Facebook"
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/twitter.svg"
            alt="Twitter"
          />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg"
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg"
            alt="Instagram"
          />
        </a>
        <a
          href="https://www.pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/pinterest.svg"
            alt="Pinterest"
          />
        </a>
      </div>
      <div className="footer-info mt-3">
        <p>Ügyfélszolgálat</p>
        <p>Minden nap</p>
        <p>10.00 - 20.00</p>
      </div>
      <div className="footer-placeholder mt-3">© Minden jog fenntartva</div>
    </div>
  );
};

export default Login;
