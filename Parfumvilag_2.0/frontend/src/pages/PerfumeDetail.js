import React, { useState, useEffect, useContext } from "react"; // Import useContext
import { useParams, useNavigate } from "react-router-dom";
import { getPerfumeById } from "../services/perfumeService";
import {
  getMyFavoriteIds,
  addFavorite,
  removeFavorite,
} from "../services/savedPerfumeService"; // Import favorite service
import { AuthContext } from "../App"; // Import AuthContext
import ReviewForm from "../components/ReviewForm"; // Import ReviewForm
import ReviewList from "../components/ReviewList"; // Import ReviewList
import "../style.css";

// Login Prompt Modal (Can be moved to a separate file)
const LoginPromptModal = ({ onClose, onLoginRedirect }) => (
  <>
    <div className="login-prompt-overlay" onClick={onClose} />
    <div className="login-prompt">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h3>Bejelentkezés szükséges</h3>
      <p>
        Be kell jelentkezni a kedvencek kezeléséhez vagy értékelés írásához.
      </p>
      <button className="login-btn" onClick={onLoginRedirect}>
        Bejelentkezés
      </button>
      <button className="cancel-btn" onClick={onClose}>
        Mégse
      </button>
    </div>
  </>
);

const PerfumeDetail = () => {
  const { id } = useParams();
  const { isLoggedIn, user, token } = useContext(AuthContext); // Use context
  const [perfume, setPerfume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [message, setMessage] = useState(""); // For general messages
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [reviews, setReviews] = useState([]); // State to hold reviews for the list
  const [newlySubmittedReview, setNewlySubmittedReview] = useState(null); // State for the newly submitted review
  // Reviews state is handled within ReviewList/ReviewForm or passed down if needed globally

  const navigate = useNavigate();
  const handleReviewSubmitted = (newReview) => {
    setNewlySubmittedReview(newReview);
  };
  // Fetch perfume data
  useEffect(() => {
    const fetchPerfumeData = async () => {
      setLoading(true);
      setError("");
      try {
        const perfumeData = await getPerfumeById(id);
        setPerfume(perfumeData);
      } catch (err) {
        console.error("Hiba a parfüm betöltésekor:", err);
        setError(err.message || "A parfüm részleteinek betöltése sikertelen.");
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumeData();
  }, [id]);

  // Fetch initial favorite status
  useEffect(() => {
    let isMounted = true;
    const checkIfFavorite = async () => {
      if (!isLoggedIn || !id || !perfume) return; // Wait for perfume data
      setLoadingFavorite(true);
      try {
        const favoriteIds = await getMyFavoriteIds();
        if (isMounted) {
          // parseInt might be needed if id from URL is string and favoriteIds are numbers
          setIsFavorite(favoriteIds.includes(parseInt(id, 10)));
        }
      } catch (error) {
        if (isMounted) {
          console.error("Hiba a kedvenc állapot ellenőrzésekor:", error);
        }
      } finally {
        if (isMounted) {
          setLoadingFavorite(false);
        }
      }
    };

    checkIfFavorite();
    return () => {
      isMounted = false;
    };
  }, [id, isLoggedIn, token, perfume]); // Depend on perfume data as well

  // Handle favorite toggle
  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    if (loadingFavorite || !id) return;

    setLoadingFavorite(true);
    setMessage(""); // Clear previous messages
    try {
      const perfumeIdInt = parseInt(id, 10); // Ensure ID is integer
      if (isFavorite) {
        await removeFavorite(perfumeIdInt);
        setIsFavorite(false);
        setMessage("Parfüm eltávolítva a kedvencekből.");
      } else {
        await addFavorite(perfumeIdInt);
        setIsFavorite(true);
        setMessage("Parfüm hozzáadva a kedvencekhez.");
      }
      // Hide message after a few seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Hiba a kedvencek kezelésekor:", error);
      setMessage(
        `Hiba történt: ${
          error.message || "Nem sikerült módosítani a kedvencet."
        }`
      );
      setTimeout(() => setMessage(""), 5000); // Show error longer
    } finally {
      setLoadingFavorite(false);
    }
  };

  // Format price (similar to PerfumeCard)
  const formattedPrice = () => {
    if (!perfume || perfume.stores?.length === 0) {
      return "Ár információ nem elérhető";
    }
    const prices = perfume.stores
      .map((store) => Number(store.price))
      .filter((price) => !isNaN(price));

    if (prices.length === 0) {
      return "Ár információ nem elérhető";
    }

    const minPrice = Math.min(...prices);
    return new Intl.NumberFormat("hu-HU").format(minPrice) + " Ft";
  };

  return (
    <div className="perfume-detail-container">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          {" "}
          {/* Use navigate for back */}← Vissza
        </button>

        {loading && (
          <div className="text-center text-muted my-5">Adatok betöltése...</div>
        )}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {perfume &&
          !loading && ( // Render only when perfume data is loaded and not loading
            <>
              <div className="perfume-title-wrapper">
                <h1 className="perfume-title-top">{perfume.name}</h1>
                {/* Favorite Button */}
                <button
                  className={`favorite-btn ${isFavorite ? "active" : ""} ${
                    loadingFavorite ? "disabled" : ""
                  }`}
                  onClick={handleToggleFavorite}
                  disabled={loadingFavorite}
                  aria-label={
                    isFavorite
                      ? "Eltávolítás a kedvencekből"
                      : "Hozzáadás a kedvencekhez"
                  }
                />
              </div>

              <div className="perfume-detail-content">
                {/* Image Section */}
                <div className="perfume-image-wrapper">
                  {isImageZoomed ? (
                    <div
                      className="zoomed-image-container"
                      onClick={() => setIsImageZoomed(false)}
                    >
                      {" "}
                      {/* Click outside to close */}
                      <img
                        src={
                          perfume.image_url ||
                          "https://via.placeholder.com/600?text=Nincs+kép"
                        }
                        alt={perfume.name}
                        className="zoomed-image"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
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
                      src={
                        perfume.image_url ||
                        "https://via.placeholder.com/500?text=Nincs+kép"
                      }
                      alt={perfume.name}
                      className="perfume-image"
                      onClick={() => setIsImageZoomed(true)}
                      style={{ cursor: "zoom-in" }}
                    />
                  )}
                </div>

                {/* Info Section */}
                <div className="perfume-info">
                  <p className="perfume-brand">
                    <strong>Márka:</strong> {perfume.brand_name || "Ismeretlen"}
                  </p>
                  <p className="perfume-gender">
                    <strong>Kategória:</strong>{" "}
                    {perfume.gender === "female"
                      ? "Női"
                      : perfume.gender === "male"
                      ? "Férfi"
                      : "Unisex"}
                  </p>
                  <p className="perfume-notes">
                    <strong>Illatjegyek:</strong>{" "}
                    {perfume.notes && perfume.notes.length > 0
                      ? perfume.notes.map((note, index) => (
                          <span key={index} className="scent-tag">
                            {note}
                          </span>
                        ))
                      : "Nincsenek megadva"}
                  </p>
                  <p
                    className={`perfume-price ${
                      !perfume.stores || perfume.stores.length === 0
                        ? "text-muted"
                        : ""
                    }`}
                  >
                    {formattedPrice()}
                  </p>
                  <p className="perfume-description">
                    <strong>Leírás:</strong>{" "}
                    {perfume.description || "Nincs leírás."}
                  </p>
                </div>

                {/* Stores Section */}
                <div className="stores-section">
                  <h2 className="stores-title">Elérhető webáruházak</h2>
                  {perfume.stores && perfume.stores.length > 0 ? (
                    <div className="stores-list">
                      {perfume.stores.map((store, index) => (
                        <div key={index} className="store-item">
                          <span className="store-name">{store.store_name}</span>
                          <a
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="store-link"
                          >
                            Megnézem →
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-stores">
                      Jelenleg nem érhető el webáruházban.
                    </p>
                  )}
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                  <h2 className="reviews-title">Értékelések</h2>
                  {isLoggedIn ? (
                    <ReviewForm
                      perfumeId={id}
                      onReviewSubmitted={handleReviewSubmitted}
                    />
                  ) : (
                    <p className="login-required-message">
                      Bejelentkezés szükséges az értékelés írásához.
                      <button
                        className="btn btn-link"
                        onClick={() => navigate("/bejelentkezes")}
                      >
                        Bejelentkezés
                      </button>
                    </p>
                  )}
                  {/* Pass the new review down to ReviewList */}
                  <ReviewList perfumeId={id} newReview={newlySubmittedReview} />
                </div>
              </div>
            </>
          )}

        {/* General Message Prompt */}
        {message && (
          <div className="message-prompt">
            <p>{message}</p>
            <button onClick={() => setMessage("")}>Bezár</button>
          </div>
        )}

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <LoginPromptModal
            onClose={() => setShowLoginPrompt(false)}
            onLoginRedirect={() => navigate("/bejelentkezes")}
          />
        )}
      </div>
    </div>
  );
};

export default PerfumeDetail;
