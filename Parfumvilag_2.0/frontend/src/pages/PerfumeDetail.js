// frontend/src/pages/PerfumeDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPerfumeById } from "../services/perfumeService";
import "../style.css";

const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [error, setError] = useState("");

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
    </div>
  );
};

export default PerfumeDetail;