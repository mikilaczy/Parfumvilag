import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userName = localStorage.getItem("username") || "";
    setIsLoggedIn(loggedIn);
    setUsername(userName);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = document.getElementById("username").value;
    if (newUser.trim()) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", newUser);
      setIsLoggedIn(true);
      setUsername(newUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Parfümvilág
      </Link>
      <div className="navbar-nav">
        <NavLink to="/katalogus" className="nav-link">
          Katalógus
        </NavLink>
        <NavLink to="/kereses" className="nav-link">
          Keresés
        </NavLink>
        <NavLink to="/rolunk" className="nav-link">
          Rólunk
        </NavLink>
      </div>
      <div className="navbar-dropdown">
        {isLoggedIn ? (
          <div>
            <button className="btn btn-outline-primary" onClick={handleLogout}>
              Kilépés
            </button>
            <Link to="/profil" className="nav-link">
              {username}
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/bejelentkezes" className="nav-link">
              Bejelentkezés
            </Link>
            <Link to="/regisztracio" className="nav-link">
              Regisztráció
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
