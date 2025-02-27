const Review = require('../models/Review');

exports.getAllReviews = (req, res) => {
  Review.getAllReviews((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getReviewById = (req, res) => {
  Review.getReviewById(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createReview = (req, res) => {
  const { scent_trail_rating, longevity_rating, value_rating, overall_impression, review_text } = req.body;
  const review = {
    perfume_id: req.params.id,
    user_id: req.user.id,
    scent_trail_rating,
    longevity_rating,
    value_rating,
    overall_impression,
    review_text,
    created_at: new Date()
  };
  Review.createReview(review, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...review });
    }
  });
};

exports.updateReview = (req, res) => {
  const { scent_trail_rating, longevity_rating, value_rating, overall_impression, review_text } = req.body;
  const review = {
    scent_trail_rating,
    longevity_rating,
    value_rating,
    overall_impression,
    review_text,
    created_at: new Date()
  };
  Review.updateReview(req.params.id, review, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      Review.getReviewById(req.params.id, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json(results[0]);
        }
      });
    }
  });
};

exports.deleteReview = (req, res) => {
  Review.deleteReview(req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.status(200).json({ message: 'Review deleted successfully' });
    }
  });
};