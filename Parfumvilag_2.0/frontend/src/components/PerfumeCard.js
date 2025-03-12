import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const PerfumeCard = ({ perfume }) => {
  const { id, name, brand, description, image_url } = perfume;

  return (
    <Link
      to={`/parfume/${id}`}
      className="perfume-card-link"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="perfume-card">
        <img
          src={image_url || 'https://via.placeholder.com/220'}
          alt={name}
          className="perfume-card-img"
        />
        <div className="perfume-card-body">
          <h5 className="perfume-card-title">{name}</h5>
          <p className="perfume-card-subtitle">{brand}</p>
          <p className="perfume-card-text">{description || 'Nincs leírás'}</p>
        </div>
      </div>
    </Link>
  );
};

export default PerfumeCard;