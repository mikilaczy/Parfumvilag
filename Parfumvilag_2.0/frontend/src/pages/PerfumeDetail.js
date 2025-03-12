import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPerfumeById } from "../services/perfumeService";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "../style.css";

const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  // "notes" mező kezelése
  const noteTags = (perfume?.notes || []).map((note, index) => (
    <span key={index} className="scent-tag me-2">
      {note.trim()}
    </span>
  ));

  return (
    <div className="container mt-5">
      <button 
        className="btn btn-secondary mb-3"
        onClick={() => window.history.back()}
      >
        Vissza a kereséshez
      </button>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {perfume && (
        <div className="row mb-5">
          <div className="col-md-6">
            <img 
              src={perfume.image_url || "https://via.placeholder.com/400"} 
              alt={perfume.name} 
              className="img-fluid rounded mb-3" 
              style={{ maxWidth: "400px" }}
            />
            <h2>{perfume.name}</h2>
            <p>
              <strong>Márka: </strong>
              {perfume.brand}
            </p>
            <p>
              <strong>Kategória: </strong>
              {perfume.gender === "female" ? "Női" : perfume.gender === "male" ? "Férfi" : "Unisex"}
            </p>
            <p>
              <strong>Illatok: </strong>
              {perfume?.notes && noteTags} {/* "notes" használata */}
            </p>
            <p className="price-display fs-4">
              {new Intl.NumberFormat("hu-HU").format(perfume.price)} Ft
            </p>
            <p>
              <strong>Leírás: </strong>
              {perfume.description || "Nincs leírás"}
            </p>
          </div>
          <div className="col-md-6">
            <h3>Értékelések</h3>
            <ReviewForm perfumeId={perfume?.id} />
            <ReviewList perfumeId={perfume?.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfumeDetail;