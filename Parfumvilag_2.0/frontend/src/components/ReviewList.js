import React, { useState, useEffect } from "react";

const ReviewList = ({ perfumeId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Ide kerül a backend hívás
    const mockReviews = [
      {
        sillage: 4,
        longevity: 5,
        value: 4,
        overall: 5,
        comment: "Remek parfüm, nagyon tartós!",
        date: new Date().toLocaleString("hu-HU"),
      },
      {
        sillage: 3,
        longevity: 4,
        value: 3,
        overall: 4,
        comment: "Jó illat, de nem túlzottan drágára.",
        date: new Date().toLocaleString("hu-HU"),
      },
    ];
    setReviews(mockReviews);
  }, [perfumeId]);

  return (
    <div className="review-list">
      <h2>Értékelések</h2>
      {reviews.length === 0 ? (
        <p>Még nincsenek értékelések ehhez a parfümhöz.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <p>
              <strong>Illatfelhő (Sillage):</strong>{" "}
              {Array(review.sillage).fill("★").join("")}{" "}
              {Array(5 - review.sillage)
                .fill("☆")
                .join("")}
            </p>
            <p>
              <strong>Tartósság (Longevity):</strong>{" "}
              {Array(review.longevity).fill("★").join("")}{" "}
              {Array(5 - review.longevity)
                .fill("☆")
                .join("")}
            </p>
            <p>
              <strong>Ár/Érték arány (Value):</strong>{" "}
              {Array(review.value).fill("★").join("")}{" "}
              {Array(5 - review.value)
                .fill("☆")
                .join("")}
            </p>
            <p>
              <strong>Összbenyomás (Overall):</strong>{" "}
              {Array(review.overall).fill("★").join("")}{" "}
              {Array(5 - review.overall)
                .fill("☆")
                .join("")}
            </p>
            <p>
              <strong>Megjegyzés:</strong> {review.comment}
            </p>
            <p>
              <strong>Dátum:</strong> {review.date}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
