// frontend/src/components/PerfumeCard.js
import React from 'react';
import '../style.css';

const PerfumeCard = ({ perfume, onClick }) => {
  const notes = (perfume?.notes || []).join(', ');

  return (
    <div
      className="card perfume-card mb-3"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <img
        src={perfume.image_url || 'https://via.placeholder.com/220'}
        alt={perfume.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{perfume.name}</h5>
        <p className="card-subtitle mb-2 text-muted">{perfume.brand}</p>
        <p className="card-text">{notes}</p>
        <p className="price-display">
          {perfume.price && new Intl.NumberFormat('hu-HU').format(perfume.price)} Ft
        </p>
      </div>
    </div>
  );
};

export default PerfumeCard;