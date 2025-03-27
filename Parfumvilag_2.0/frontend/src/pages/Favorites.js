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
      try {
        // 1. Token ellenőrzése
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Hiányzó token! Jelentkezz be újra.');
        }

        // 2. Kedvencek lekérdezése
        const favoritesResponse = await fetch('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!favoritesResponse.ok) {
          const errorText = await favoritesResponse.text();
          throw new Error(`Hiba (${favoritesResponse.status}): ${errorText}`);
        }

        // 3. JSON válasz ellenőrzése
        const favoritesData = await favoritesResponse.json();
        if (!Array.isArray(favoritesData)) {
          throw new Error('Érvénytelen válaszformátum');
        }

        // 4. Parfüm részletek lekérdezése (hibakezeléssel)
        const perfumes = await Promise.allSettled(
          favoritesData.map(async (fav) => {
            const response = await fetch(`http://localhost:5000/api/perfumes/${fav.perfume_id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error(`Parfüm ${fav.perfume_id} nem elérhető`);
            return response.json();
          })
        );

        // 5. Sikeres és sikertelen eredmények szűrése
        const successfulPerfumes = perfumes
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);

        const failedPerfumes = perfumes
          .filter(result => result.status === 'rejected')
          .map(result => result.reason.message);

        if (failedPerfumes.length > 0) {
          console.warn('Nem sikerült betölteni:', failedPerfumes);
        }

        setFavorites(successfulPerfumes);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) fetchFavorites();
  }, [isLoggedIn]);

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