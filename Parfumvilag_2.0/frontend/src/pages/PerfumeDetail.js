import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPerfumeById } from "../services/perfumeService";
import "../style.css";

const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [ratings, setRatings] = useState({
    sillage: 0,
    longevity: 0,
    value: 0,
    overall: 0,
  });
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Parfüm adatainak betöltése
  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const perfumeData = await getPerfumeById(id);
        setPerfume(perfumeData);
        setError("");
      } catch (err) {
        setError("Nem sikerült betölteni a parfüm részleteit!");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfume();
  }, [id]);

  // Kedvencek ellenőrzése az API-n keresztül
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!isLoggedIn) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Hiányzó autentikációs token. Kérlek, jelentkezz be újra.');
          return;
        }

        const response = await fetch('/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('A szerver nem JSON-t adott vissza, valószínűleg autentikációs probléma.');
          }
          const errorData = await response.json();
          throw new Error(`Hiba a kedvencek lekérdezésekor: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const favorites = await response.json();
        setIsFavorite(favorites.some((fav) => fav.perfume_id === parseInt(id)));
      } catch (error) {
        console.error('Hiba a kedvencek ellenőrzésekor:', error);
        setMessage(`Nem sikerült ellenőrizni a kedvenceket: ${error.message}`);
      }
    };

    checkIfFavorite();
  }, [id, isLoggedIn]);

  // Kedvencekhez adás/törlés
  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      if (!token || !userId) {
        setMessage('Hiányzó autentikációs adatok. Kérlek, jelentkezz be újra.');
        return;
      }

      if (isFavorite) {
        const response = await fetch(`/api/favorites/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Hiba a kedvenc törlésekor: ${response.status} - ${errorText}`);
        }

        setMessage('Parfüm eltávolítva a kedvencekből.');
      } else {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            perfume_id: id,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Hiba a kedvenc hozzáadásakor: ${response.status} - ${errorText}`);
        }

        setMessage('Parfüm hozzáadva a kedvencekhez.');
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Hiba a kedvencek kezelésekor:', error);
      setMessage(`Hiba történt: ${error.message}`);
    }
  };

  // Értékelés beküldése (mock, API nélkül)
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    if (ratings.sillage === 0 || ratings.longevity === 0 || ratings.value === 0 || ratings.overall === 0) {
      setMessage("Kérlek, adj értékelést minden szempont alapján (1-5 csillag)!");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      ratings,
      comment,
      user: localStorage.getItem('username') || "Névtelen",
      date: new Date().toLocaleDateString('hu-HU'),
    };

    setReviews([newReview, ...reviews]);
    setRatings({ sillage: 0, longevity: 0, value: 0, overall: 0 });
    setComment("");
    setMessage("Értékelés sikeresen beküldve!");
  };

  // Csillagozás kezelése
  const handleStarHover = (category, star) => {
    setRatings((prev) => ({ ...prev, [category]: star }));
  };

  const handleStarClick = (category, star) => {
    setRatings((prev) => ({ ...prev, [category]: star }));
  };

  const noteTags = (perfume?.notes || []).map((note, index) => (
    <span key={index} className="scent-tag">
      {note.trim()}
    </span>
  ));

  return (
    <div className="perfume-detail-container">
      <div className="container">
        <button
          className="back-btn"
          onClick={() => window.history.back()}
        >
          ← Vissza a kereséshez
        </button>

        {perfume && (
          <div className="perfume-title-wrapper">
            <h1 className="perfume-title-top">{perfume.name}</h1>
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite();
              }}
            />
          </div>
        )}

        {loading && <div className="text-center text-muted">Betöltés...</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {perfume && (
          <div className="perfume-detail-content">
            {/* Kép középen, nagyban */}
            <div className="perfume-image-wrapper">
              {isImageZoomed ? (
                <div className="zoomed-image-container">
                  <img
                    src={perfume.image_url || "https://via.placeholder.com/600"}
                    alt={perfume.name}
                    className="zoomed-image"
                  />
                  <button
                    className="close-zoom-btn"
                    onClick={() => setIsImageZoomed(false)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <img
                  src={perfume.image_url || "https://via.placeholder.com/600"}
                  alt={perfume.name}
                  className="perfume-image"
                  onClick={() => setIsImageZoomed(true)}
                />
              )}
            </div>

            {/* Leírás és adatok a kép alatt */}
            <div className="perfume-info">
              <p className="perfume-brand"><strong>Márka:</strong> {perfume.brand}</p>
              <p className="perfume-gender">
                <strong>Kategória:</strong>{" "}
                {perfume.gender === "female" ? "Női" : perfume.gender === "male" ? "Férfi" : "Unisex"}
              </p>
              <p className="perfume-notes">
                <strong>Illatok:</strong> {perfume?.notes && noteTags}
              </p>
              <p className="perfume-price">
                {new Intl.NumberFormat("hu-HU").format(perfume.price)} Ft
              </p>
              <p className="perfume-description">
                <strong>Leírás:</strong> {perfume.description || "Nincs leírás"}
              </p>
            </div>

            {/* Értékelések szekció */}
            <div className="reviews-section">
              <h2 className="reviews-title">Értékelések</h2>

              {/* Értékelés űrlap */}
              {isLoggedIn ? (
                <form onSubmit={handleReviewSubmit} className="review-form">
                  <div className="rating-category">
                    <label>Illatélmény (Sillage):</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${ratings.sillage >= star ? 'filled' : ''}`}
                          onMouseEnter={() => handleStarHover('sillage', star)}
                          onMouseLeave={() => handleStarHover('sillage', ratings.sillage)}
                          onClick={() => handleStarClick('sillage', star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rating-category">
                    <label>Tartósság (Longevity):</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${ratings.longevity >= star ? 'filled' : ''}`}
                          onMouseEnter={() => handleStarHover('longevity', star)}
                          onMouseLeave={() => handleStarHover('longevity', ratings.longevity)}
                          onClick={() => handleStarClick('longevity', star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rating-category">
                    <label>Ár/Érték arány (Value):</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${ratings.value >= star ? 'filled' : ''}`}
                          onMouseEnter={() => handleStarHover('value', star)}
                          onMouseLeave={() => handleStarHover('value', ratings.value)}
                          onClick={() => handleStarClick('value', star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rating-category">
                    <label>Összbenyomás (Overall):</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${ratings.overall >= star ? 'filled' : ''}`}
                          onMouseEnter={() => handleStarHover('overall', star)}
                          onMouseLeave={() => handleStarHover('overall', ratings.overall)}
                          onClick={() => handleStarClick('overall', star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <textarea
                    className="review-comment"
                    placeholder="Írd meg a véleményed..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  <button type="submit" className="submit-review-btn">
                    Értékelés beküldése
                  </button>
                </form>
              ) : (
                <p className="login-required-message">
                  Bejelentkezés szükséges az értékelés írásához.
                </p>
              )}

              {/* Értékelések listája */}
              <div className="reviews-list">
                {reviews.length === 0 ? (
                  <p className="no-reviews">Még nincsenek értékelések.</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="review-user">{review.user}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div className="review-ratings">
                        <div className="rating-display">
                          <span>Illatélmény:</span>
                          <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`star ${index < review.ratings.sillage ? 'filled' : ''}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rating-display">
                          <span>Tartósság:</span>
                          <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`star ${index < review.ratings.longevity ? 'filled' : ''}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rating-display">
                          <span>Ár/Érték arány:</span>
                          <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`star ${index < review.ratings.value ? 'filled' : ''}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rating-display">
                          <span>Összbenyomás:</span>
                          <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`star ${index < review.ratings.overall ? 'filled' : ''}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Visszajelzés üzenet */}
        {message && (
          <div className="message-prompt">
            <p>{message}</p>
            <button onClick={() => setMessage('')}>Bezár</button>
          </div>
        )}

        {/* Bejelentkezés üzenet modális */}
        {showLoginPrompt && (
          <>
            <div className="login-prompt-overlay" onClick={() => setShowLoginPrompt(false)} />
            <div className="login-prompt">
              <button
                className="close-btn"
                onClick={() => setShowLoginPrompt(false)}
              >
                ×
              </button>
              <h3>Bejelentkezés szükséges</h3>
              <p>Be kell jelentkezni, hogy menteni tudjunk a kedvencek közé.</p>
              <button
                className="login-btn"
                onClick={() => navigate('/bejelentkezes')}
              >
                Bejelentkezés
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowLoginPrompt(false)}
              >
                Mégse
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PerfumeDetail;