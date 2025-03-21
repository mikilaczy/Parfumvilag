import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PerfumeCard from '../components/PerfumeCard';

const Favorites = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        // 1. Lépés: Kedvencek lekérdezése
        const favoritesResponse = await fetch('/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!favoritesResponse.ok) {
          throw new Error('Hiba a kedvencek lekérdezésekor');
        }

        const favoritesData = await favoritesResponse.json();

        // 2. Lépés: Parfümök adatainak lekérdezése
        const perfumePromises = favoritesData.map(async (fav) => {
          const perfumeResponse = await fetch(`/api/perfumes/${fav.perfume_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!perfumeResponse.ok) {
            throw new Error(`Hiba a parfüm lekérdezésekor: ${fav.perfume_id}`);
          }

          return await perfumeResponse.json();
        });

        const perfumes = await Promise.all(perfumePromises);
        setFavorites(perfumes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);

  // Ha a felhasználó nincs bejelentkezve, átirányítjuk a bejelentkezés oldalra
  if (!isLoggedIn) {
    return <Navigate to="/bejelentkezes" />;
  }

  if (loading) {
    return <div className="text-center">Betöltés...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Hiba: {error}</div>;
  }

  return (
    <div className="favorites-page">
      <h1 className="text-center mb-4">Kedvenc Parfümjeim</h1>
      {favorites.length === 0 ? (
        <p className="text-center">Még nincsenek kedvenc parfümjeid.</p>
      ) : (
        <div className="row">
          {favorites.map((perfume) => (
            <div key={perfume.id} className="col-md-4 mb-4">
              <PerfumeCard perfume={perfume} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;