import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(userName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Parfümvilág</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/katalogus">Katalógus</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/kereses">Keresés</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rolunk">Rólunk</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link profile-link" to="/profil">
                    <i className="fas fa-user-circle"></i> {username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light logout-btn" onClick={handleLogout}>
                    Kilépés
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Belépés
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/bejelentkezes">Bejelentkezés</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/regisztracio">Regisztráció</NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;