import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const PerfumeCard = ({ perfume }) => {
  const { id, name, brand, description, image_url, notes = [] } = perfume;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="perfume-card">
        <img
          src={image_url || 'https://via.placeholder.com/250x250?text=Nincs+kép'}
          alt={name}
          className="perfume-card-img"
        />
        <div className="perfume-card-body">
          <h5 className="perfume-card-title">{name}</h5>
          <h6 className="perfume-card-subtitle">{brand}</h6>
          <div className="scent-tags">
            {notes.map((note, index) => (
              <span key={index} className="scent-tag">{note}</span>
            ))}
          </div>
          <p className="perfume-card-text">{description || 'Nincs leírás'}</p>
        </div>
        <Link to={`/perfume/${id}`} className="perfume-card-link" />
      </div>
    </div>
  );
};

export default PerfumeCard;