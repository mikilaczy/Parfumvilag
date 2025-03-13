import React, { useState } from "react";

const ReviewForm = ({ perfumeId }) => {
  const [ratings, setRatings] = useState({
    sillage: 0,
    longevity: 0,
    value: 0,
    overall: 0,
  });
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRatingChange = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          perfumeId,
          ratings,
          comment,
          author: "Felhasználó", // Lecserélheted valódi felhasználónévre
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Hiba történt az értékelés beküldésekor!");
      }

      setSuccess("Értékelés sikeresen beküldve!");
      setRatings({ sillage: 0, longevity: 0, value: 0, overall: 0 });
      setComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="review-form-custom" onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="review-form-section">
        <label className="form-label">Illatélmény (Sillage):</label>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={ratings.sillage}
          onChange={(e) => handleRatingChange("sillage", parseInt(e.target.value))}
          className="rating-slider"
        />
        <span className="slider-value">{ratings.sillage}/5</span>
      </div>

      <div className="review-form-section">
        <label className="form-label">Tartósság (Longevity):</label>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={ratings.longevity}
          onChange={(e) => handleRatingChange("longevity", parseInt(e.target.value))}
          className="rating-slider"
        />
        <span className="slider-value">{ratings.longevity}/5</span>
      </div>

      <div className="review-form-section">
        <label className="form-label">Ár/Érték arány (Value):</label>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={ratings.value}
          onChange={(e) => handleRatingChange("value", parseInt(e.target.value))}
          className="rating-slider"
        />
        <span className="slider-value">{ratings.value}/5</span>
      </div>

      <div className="review-form-section">
        <label className="form-label">Összbenyomás (Overall):</label>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={ratings.overall}
          onChange={(e) => handleRatingChange("overall", parseInt(e.target.value))}
          className="rating-slider"
        />
        <span className="slider-value">{ratings.overall}/5</span>
      </div>

      <div className="review-form-section">
        <label className="form-label">Megjegyzés:</label>
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Írd ide a véleményed..."
          rows="3"
        />
      </div>

      <button type="submit" className="btn-submit">
        Értékelés beküldése
      </button>
    </form>
  );
};

export default ReviewForm;