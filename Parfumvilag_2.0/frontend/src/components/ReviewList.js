import React, { useState, useEffect } from "react";
import { getReviewsForPerfume } from "../services/reviewService"; // Import service

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric" /*hour: '2-digit', minute: '2-digit'*/,
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString; // Return original if formatting fails
  }
};

// Helper function to render stars
const renderStars = (rating) => {
  const filledStars = Math.max(0, Math.min(5, Math.round(rating || 0))); // Ensure 0-5 range
  return (
    <>
      {"★".repeat(filledStars)}
      {"☆".repeat(5 - filledStars)}
    </>
  );
};

const ReviewList = ({ perfumeId, newReview }) => {
  // Accept newReview prop
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getReviewsForPerfume(perfumeId);
      setReviews(data || []); // Ensure it's always an array
    } catch (err) {
      setError(err.message || "Hiba az értékelések betöltésekor.");
      setReviews([]); // Clear reviews on error
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (perfumeId) {
      // Only fetch if perfumeId is available
      fetchReviews();
    }
  }, [perfumeId]);

  // Add new review to the top of the list when submitted
  useEffect(() => {
    if (newReview) {
      // Add the new review to the beginning of the list
      setReviews((prevReviews) => [newReview, ...prevReviews]);
    }
  }, [newReview]); // Re-run when newReview prop changes

  if (loading)
    return <div className="text-center my-4">Értékelések betöltése...</div>;

  return (
    <div className="review-list-custom mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {reviews.length === 0 && !error && (
        <p className="text-center text-muted">Még nincsenek értékelések.</p>
      )}
      {reviews.map((review) => {
        console.log("Review data received:", review); // DEBUG: Check the content of each review object
        return (
          <div key={review.id} className="review-item-custom card mb-3">
            <div className="card-body">
              <div className="review-header-custom d-flex justify-content-between align-items-center mb-2">
                {/* Use review.author which comes from the backend JOIN */}
                <span className="review-author-custom fw-bold">
                  {review.author || "Ismeretlen felhasználó"}
                </span>
                <span className="review-date-custom text-muted">
                  {formatDate(review.created_at)}
                </span>
              </div>
              {/* Ratings in a more structured way */}
              <div className="review-ratings-grid mb-2">
                <div className="rating-item">
                  <span className="rating-category">Illatcsík:</span>
                  <span className="rating-stars">
                    {renderStars(review.scent_trail_rating)}
                  </span>
                </div>
                <div className="rating-item">
                  <span className="rating-category">Tartósság:</span>
                  <span className="rating-stars">
                    {renderStars(review.longevity_rating)}
                  </span>
                </div>
                <div className="rating-item">
                  <span className="rating-category">Ár/Érték:</span>
                  <span className="rating-stars">
                    {renderStars(review.value_rating)}
                  </span>
                </div>
                <div className="rating-item">
                  <span className="rating-category">Összbenyomás:</span>
                  <span className="rating-stars">
                    {renderStars(review.overall_impression)}
                  </span>
                </div>
              </div>
              {review.review_text && (
                <p className="review-comment-custom card-text">
                  {review.review_text}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
