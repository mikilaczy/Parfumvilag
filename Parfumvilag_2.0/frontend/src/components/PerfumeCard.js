import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; // AuthContext importálása
import '../style.css';

const PerfumeCard = ({ perfume }) => {
  const { id, name, brand, price, image_url } = perfume;
  const [isFavorite, setIsFavorite] = useState(false); // Kedvencek állapot
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // Modális állapot
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); // Bejelentkezés állapotának lekérése

  // Kedvencekhez adás/törlés
  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true); // Ha nincs bejelentkezve, mutasd a modálist
      return;
    }

    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      await addToFavorites(id);
    } else {
      await removeFromFavorites(id);
    }
    console.log(`${name} ${isFavorite ? 'eltávolítva a kedvencekből' : 'hozzáadva a kedvencekhez'}`);
  };

  // Dummy függvények (később API-val helyettesítjük)
  const addToFavorites = async (perfumeId) => {
    console.log(`Hozzáadás a kedvencekhez: ${perfumeId}`);
  };

  const removeFromFavorites = async (perfumeId) => {
    console.log(`Törlés a kedvencekből: ${perfumeId}`);
  };

  return (
    <>
      <div className="perfume-card">
        <Link
          to={`/parfume/${id}`}
          className="perfume-card-link"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <img
            src={image_url || 'https://via.placeholder.com/220'}
            alt={name}
            className="perfume-card-img"
          />
          <div className="perfume-card-body">
            <h5 className="perfume-card-title">{name}</h5>
            <p className="perfume-card-subtitle">{brand}</p>
            <p className="perfume-card-text">{price ? `${price} Ft` : 'Ár nem elérhető'}</p>
          </div>
        </Link>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite();
          }}
        />
      </div>

      {/* Bejelentkezés üzenet modális */}
      {showLoginPrompt && (
        <>
          <div className="login-prompt-overlay" onClick={() => setShowLoginPrompt(false)} />
          <div className="login-prompt">
            <button
              className="close-btn"
              onClick={() => setShowLoginPrompt(false)} // Bezárás gomb
            >
              ×
            </button>
            <h3>Bejelentkezés szükséges</h3>
            <p>Be kell jelentkezni, hogy menteni tudjunk a kedvencek közé.</p>
            <button
              className="login-btn"
              onClick={() => navigate('/bejelentkezes')} // Átirányítás a Login.js oldalra
            >
              Bejelentkezés
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PerfumeCard;