import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-dark">
      <div className="container">
        <div className="navbar-content">
          {windowWidth <= 991 && (
            <button className="navbar-toggler" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
          )}
          <Link className="navbar-brand" to="/">
            Parfümvilág
          </Link>
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <ul className="navbar-nav navbar-left">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/katalogus"
                  onClick={() => windowWidth <= 991 && toggleMenu()}
                >
                  Hírek
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/kereses"
                  onClick={() => windowWidth <= 991 && toggleMenu()}
                >
                  Keresés
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/rolunk"
                  onClick={() => windowWidth <= 991 && toggleMenu()}
                >
                  Rólunk
                </NavLink>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to="/kedvencek"
                    onClick={() => windowWidth <= 991 && toggleMenu()}
                  >
                    Kedvencek
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav navbar-right">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link profile-link ${isActive ? 'active' : ''}`
                      }
                      to="/profil"
                      onClick={() => windowWidth <= 991 && toggleMenu()}
                    >
                      <i className="fas fa-user-circle"></i> {username}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light logout-btn"
                      onClick={() => {
                        handleLogout();
                        if (windowWidth <= 991) toggleMenu();
                      }}
                    >
                      Kilépés
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      to="/bejelentkezes"
                      onClick={() => windowWidth <= 991 && toggleMenu()}
                    >
                      Bejelentkezés
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      to="/regisztracio"
                      onClick={() => windowWidth <= 991 && toggleMenu()}
                    >
                      Regisztráció
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;