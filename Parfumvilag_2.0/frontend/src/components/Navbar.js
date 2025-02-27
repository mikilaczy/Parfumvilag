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
    <nav className="navbar navbar-dark">
      <div className="container">
        <div className="navbar-content">
          <Link className="navbar-brand" to="/">Parfümvilág</Link>
          <ul className="navbar-nav flex-column align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/katalogus">Katalógus</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/kereses">Keresés</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rolunk">Rólunk</NavLink>
            </li>
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/bejelentkezes">Belépés</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;