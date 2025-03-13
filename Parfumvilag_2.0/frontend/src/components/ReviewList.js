import React, { useState, useEffect } from "react";

// Mock adatok teszteléshez
const mockReviews = [
  {
    id: 1,
    author: "Felhasználó 1",
    date: "2025. 03. 13. 11:06:35",
    ratings: {
      sillage: 4,
      longevity: 3,
      value: 3,
      overall: 4,
    },
    comment: "Jó illat!",
  },
  {
    id: 2,
    author: "Felhasználó 2",
    date: "2025. 03. 13. 11:06:35",
    ratings: {
      sillage: 5,
      longevity: 4,
      value: 4,
      overall: 5,
    },
    comment: "Fantasztikus illat, nagyon tartós!",
  },
];

const ReviewList = ({ perfumeId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/reviews/${perfumeId}`);
        if (!response.ok) {
          throw new Error(`Hiba: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setReviews(data); // Feltételezem, hogy a válasz egy tömb vagy { reviews: [...] }
      } catch (err) {
        setError(err.message);
        // Ha API hiba van, mock adatokat használunk
        console.warn("API hiba, mock adatok betöltése:", err.message);
        setReviews(mockReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [perfumeId]);

  if (loading) return <div className="text-center">Betöltés...</div>;

  return (
    <div className="review-list-custom">
      {error && <div className="alert alert-danger">{error}</div>}
      {reviews.length === 0 && !error && (
        <p className="text-center">Még nincsenek értékelések.</p>
      )}
      {reviews.map((review) => (
        <div key={review.id} className="review-item-custom">
          <div className="review-header-custom">
            <span className="review-author-custom">{review.author}</span>
            <span className="review-date-custom">{review.date}</span>
          </div>
          <div className="review-rating-custom">
            <span className="rating-category">Illatélmény (Sillage):</span>
            <span className="rating-stars">
              {"★".repeat(review.ratings.sillage)}
              {"☆".repeat(5 - review.ratings.sillage)}
            </span>
          </div>
          <div className="review-rating-custom">
            <span className="rating-category">Tartósság (Longevity):</span>
            <span className="rating-stars">
              {"★".repeat(review.ratings.longevity)}
              {"☆".repeat(5 - review.ratings.longevity)}
            </span>
          </div>
          <div className="review-rating-custom">
            <span className="rating-category">Ár/Érték arány (Value):</span>
            <span className="rating-stars">
              {"★".repeat(review.ratings.value)}
              {"☆".repeat(5 - review.ratings.value)}
            </span>
          </div>
          <div className="review-rating-custom">
            <span className="rating-category">Összbenyomás (Overall):</span>
            <span className="rating-stars">
              {"★".repeat(review.ratings.overall)}
              {"☆".repeat(5 - review.ratings.overall)}
            </span>
          </div>
          <p className="review-comment-custom">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;