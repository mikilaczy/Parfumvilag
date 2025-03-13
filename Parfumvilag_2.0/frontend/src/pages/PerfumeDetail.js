// frontend/src/pages/PerfumeDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPerfumeById } from "../services/perfumeService";
import "../style.css";

const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [error, setError] = useState("");
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
>>>>>>> 385bf3f864c1e087fcfa752e27cb4bde54876fde

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const data = await getPerfumeById(id);
        setPerfume(data);
      } catch (err) {
        setError("Nem található parfüm");
      }
    };
    fetchPerfume();
  }, [id]);

<<<<<<< HEAD
  return (
    <div className="container">
      {perfume && (
        <div className="row mb-5">
          <div className="col-md-6">
            <img 
              src={perfume.image_url} 
              alt={perfume.name} 
              className="img-fluid rounded mb-3" 
              style={{ maxWidth: "400px" }} 
            />
            <h2>{perfume.name}</h2>
            <p><strong>Márka:</strong> {perfume.brand}</p>
            <p><strong>Ár:</strong> {perfume.price} Ft</p>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
=======
  const noteTags = (perfume?.notes || []).map((note, index) => (
    <span key={index} className="scent-tag me-2">
      {note.trim()}
    </span>
  ));

  return (
    <div className="perfume-detail-page">
      <div className="container mt-5">
        <button 
          className="btn btn-secondary mb-4"
          onClick={() => window.history.back()}
        >
          Vissza a kereséshez
        </button>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {perfume && (
          <>
            {/* Kép és leírás egymás mellett */}
            <div className="row mb-4">
              {/* Kép bal oldalon, kisebb méretben */}
              <div className="col-md-4">
                {isImageZoomed ? (
                  <div className="zoomed-image-container">
                    <img 
                      src={perfume.image_url || "https://via.placeholder.com/400"} 
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
                    src={perfume.image_url || "https://via.placeholder.com/400"} 
                    alt={perfume.name} 
                    className="img-fluid perfume-detail-image"
                    onClick={() => setIsImageZoomed(true)}
                  />
                )}
              </div>

              {/* Leírás jobb oldalon */}
              <div className="col-md-8">
                <div className="perfume-detail-card">
                  <h2 className="perfume-detail-title">{perfume.name}</h2>
                  <p className="perfume-detail-text">
                    <strong>Márka: </strong>
                    {perfume.brand}
                  </p>
                  <p className="perfume-detail-text">
                    <strong>Kategória: </strong>
                    {perfume.gender === "female" ? "Női" : perfume.gender === "male" ? "Férfi" : "Unisex"}
                  </p>
                  <p className="perfume-detail-text">
                    <strong>Illatok: </strong>
                    {perfume?.notes && noteTags}
                  </p>
                  <p className="price-display">
                    {new Intl.NumberFormat("hu-HU").format(perfume.price)} Ft
                  </p>
                  <p className="perfume-detail-text">
                    <strong>Leírás: </strong>
                    {perfume.description || "Nincs leírás"}
                  </p>
                </div>
              </div>
            </div>

            {/* Értékelések alattuk, teljes szélességben */}
            <div className="row">
              <div className="col-12">
                <div className="perfume-detail-card">
                  <h3 className="perfume-detail-subtitle">Értékelések</h3>
                  <ReviewForm perfumeId={perfume?.id} className="review-form-custom" />
                  <ReviewList perfumeId={perfume?.id} className="review-list-custom" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
>>>>>>> 385bf3f864c1e087fcfa752e27cb4bde54876fde
    </div>
  );
};

export default PerfumeDetail;