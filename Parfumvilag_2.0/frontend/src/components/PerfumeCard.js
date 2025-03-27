import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const PerfumeCard = ({ perfume }) => {
  const {
    id,
    name,
    brand_name: brand, // Ha a backend brand_name néven küldi
    price,
    image_url,
  } = perfume || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const formattedPrice = () => {
    if (price === undefined || price === null)
      return "Ár információ nem elérhető";
    return new Intl.NumberFormat("hu-HU").format(price) + " Ft";
  };

  // Kedvencek ellenőrzése az API-n keresztül
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!isLoggedIn) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Hiba a kedvencek lekérdezésekor");
        }

        const favorites = await response.json();
        // Ellenőrizzük, hogy a parfüm a kedvencek között van-e
        setIsFavorite(favorites.some((fav) => fav.perfume_id === id));
      } catch (error) {
        console.error("Hiba a kedvencek ellenőrzésekor:", error);
      }
    };

    checkIfFavorite();
  }, [id, isLoggedIn]);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Hiba a kedvencek lekérdezésekor:", error);
      return [];
    }
  };
   useEffect(() => {
    const checkFavorite = async () => {
      if (!isLoggedIn) return;
      const favorites = await fetchFavorites();
      setIsFavorite(favorites.some(fav => fav.perfume_id === id));
    };
    checkFavorite();
  }, [id, isLoggedIn])
  
  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    try {
      await toggleFavorite(perfume.id);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Hiba a kedvenc kezelésekor:", err);
    }
  };


  // Kedvencekhez adás/törlés
  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (isFavorite) {
        // Törlés a kedvencekből
        const response = await fetch(`/api/favorites/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Hiba a kedvenc törlésekor");
        }
      } else {
        // Hozzáadás a kedvencekhez
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            perfume_id: id,
          }),
        });

        if (!response.ok) {
          throw new Error("Hiba a kedvenc hozzáadásakor");
        }
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Hiba a kedvencek kezelésekor:", error);
    }
  };

  return (
    <>
      <div className="perfume-card">
        <Link
          to={`/parfume/${id}`}
          className="perfume-card-link"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={image_url || "https://via.placeholder.com/220"}
            alt={name}
            className="perfume-card-img"
          />
          <div className="perfume-card-body">
            <h3 className="perfume-card-title">{name}</h3>

            <p className="perfume-card-text">{formattedPrice()}</p>
          </div>
        </Link>
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
        
        />
      </div>

      {/* Bejelentkezés üzenet modális */}
      {showLoginPrompt && (
        <>
          <div
            className="login-prompt-overlay"
            onClick={() => setShowLoginPrompt(false)}
          />
          <div className="login-prompt">
            <button
              className="close-btn"
              onClick={() => setShowLoginPrompt(false)}
            >
              ×
            </button>
            <h3>Bejelentkezés szükséges</h3>
            <p>Be kell jelentkezni, hogy menteni tudjunk  a kedvencek közé.</p>
            <button
              className="login-btn"
              onClick={() => navigate("/bejelentkezes")}
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
