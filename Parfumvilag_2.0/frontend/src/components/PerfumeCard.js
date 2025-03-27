import React, { useState, useEffect, useContext } from "react"; // Import useContext
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; // Import AuthContext
import {
  getMyFavoriteIds,
  addFavorite,
  removeFavorite,
} from "../services/savedPerfumeService"; // Import service functions
import "../style.css";

// Login Prompt Modal Component (Simple Example)
const LoginPromptModal = ({ onClose, onLoginRedirect }) => (
  <>
    <div className="login-prompt-overlay" onClick={onClose} />
    <div className="login-prompt">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h3>Bejelentkezés szükséges</h3>
      <p>Be kell jelentkezni a kedvencek kezeléséhez.</p>
      <button className="login-btn" onClick={onLoginRedirect}>
        Bejelentkezés
      </button>
      <button className="cancel-btn" onClick={onClose}>
        Mégse
      </button>
    </div>
  </>
);

const PerfumeCard = ({ perfume }) => {
  const { id, name, brand_name: brand, price, image_url } = perfume || {};
  const { isLoggedIn, token } = useContext(AuthContext); // Use context
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false); // Loading state for favorite action
  const navigate = useNavigate();

  const formattedPrice = () => {
    if (price === undefined || price === null)
      return "Ár információ nem elérhető";
    return new Intl.NumberFormat("hu-HU").format(price) + " Ft";
  };

  // Fetch initial favorite status
  useEffect(() => {
    let isMounted = true; // Handle component unmount
    const checkIfFavorite = async () => {
      if (!isLoggedIn || !id) return; // Only run if logged in and perfume id exists
      setLoadingFavorite(true);
      try {
        // Fetch all favorite IDs once might be more efficient if many cards are displayed
        // Alternatively, create a backend endpoint to check a single ID: GET /api/saved-perfumes/check/:perfumeId
        const favoriteIds = await getMyFavoriteIds();
        if (isMounted) {
          setIsFavorite(favoriteIds.includes(id));
        }
      } catch (error) {
        if (isMounted) {
          console.error("Hiba a kedvenc állapot ellenőrzésekor:", error);
          // Optionally show an error to the user
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
    }; // Cleanup on unmount
  }, [id, isLoggedIn, token]); // Re-run if id, login status, or token changes

  // Handle favorite toggle click
  const handleToggleFavorite = async (e) => {
    e.preventDefault(); // Prevent link navigation if clicking the button inside a link
    e.stopPropagation(); // Prevent event bubbling up

    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    if (loadingFavorite || !id) return; // Prevent multiple clicks while processing or if no ID

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await removeFavorite(id);
        setIsFavorite(false);
        // Optional: Show success message
      } else {
        await addFavorite(id);
        setIsFavorite(true);
        // Optional: Show success message
      }
    } catch (error) {
      console.error("Hiba a kedvencek kezelésekor:", error);
      // Optional: Show error message to user
      alert(`Hiba: ${error.message || "Nem sikerült módosítani a kedvencet."}`);
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <>
      <div className="perfume-card h-100">
        {" "}
        {/* Add h-100 for consistent height if needed */}
        <Link
          to={`/parfume/${id}`}
          className="perfume-card-link d-flex flex-column h-100" // Flex layout
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={image_url || "https://via.placeholder.com/220x180?text=Parfüm"} // Adjust placeholder size if needed
            alt={name || "Parfüm"}
            className="perfume-card-img" // Ensure CSS defines height/object-fit
          />
          <div className="perfume-card-body d-flex flex-column flex-grow-1 justify-content-between">
            {" "}
            {/* Flex grow */}
            <div>
              {" "}
              {/* Wrapper for title and price */}
              <h3 className="perfume-card-title">
                {name || "Ismeretlen Parfüm"}
              </h3>
              {/* Brand name could be added here if available: <p className="perfume-card-subtitle">{brand || 'Ismeretlen Márka'}</p> */}
              <p className="perfume-card-text">{formattedPrice()}</p>
            </div>
            {/* Favorite button stays at the bottom right via absolute positioning in CSS */}
          </div>
        </Link>
        {/* Favorite button outside the Link to handle its own click */}
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

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <LoginPromptModal
          onClose={() => setShowLoginPrompt(false)}
          onLoginRedirect={() => navigate("/bejelentkezes")}
        />
      )}
    </>
  );
};

export default PerfumeCard;
