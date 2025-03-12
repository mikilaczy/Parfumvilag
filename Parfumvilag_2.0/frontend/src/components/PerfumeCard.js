// frontend/src/components/PerfumeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const PerfumeCard = ({ perfume }) => {
  const { id, name, brand, price, image_url } = perfume;

  return (
    <Link 
      to={`/parfume/${id}`} 
      className="perfume-card-link" 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card perfume-card">
          <img 
            src={image_url || 'https://via.placeholder.com/220'} 
            alt={name} 
            className="card-img-top" 
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-subtitle mb-2 text-muted">{brand}</p>
            <p className="price-display">{new Intl.NumberFormat('hu-HU').format(price)} Ft</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PerfumeCard;