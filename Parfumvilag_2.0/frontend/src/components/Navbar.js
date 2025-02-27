import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <nav className="navbar navbar-dark">
      <div className="container">
        <div className="navbar-content">
          <Link className="navbar-brand" to="/">Parfümvilág</Link>
          <ul className="navbar-nav navbar-left">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/katalogus"
              >
                Katalógus
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/kereses"
              >
                Keresés
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/rolunk"
              >
                Rólunk
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav navbar-right">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link profile-link ${isActive ? 'active' : ''}`} 
                    to="/profil"
                  >
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
                <div 
                  className="nav-link dropdown-toggle" 
                  onClick={toggleDropdown} 
                  role="button"
                >
                  Belépés
                </div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink 
                        className="dropdown-item" 
                        to="/bejelentkezes" 
                        onClick={() => setIsDropdownOpen(false)} // Close on click
                      >
                        Bejelentkezés
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        className="dropdown-item" 
                        to="/regisztracio" 
                        onClick={() => setIsDropdownOpen(false)} // Close on click
                      >
                        Regisztráció
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;