import React from "react";
import { Link } from "react-router-dom";

const PerfumeCard = ({ perfume }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="perfume-card">
        <img src={perfume.image} alt={perfume.name} />
        <div className="perfume-card-body">
          <h3 className="perfume-card-title">{perfume.name}</h3>
          <h5 className="perfume-card-subtitle">{perfume.brand}</h5>
          <div className="scent-tags">
            {perfume.scents.map((scent, index) => (
              <span key={index} className="scent-tag">
                {scent}
              </span>
            ))}
          </div>
          <p className="perfume-card-text">{perfume.description}</p>
          <p className="price-display">
            {new Intl.NumberFormat("hu-HU").format(perfume.price)} Ft
          </p>
          <Link to={`/parfume/${perfume.id}`} className="perfume-card-link">
            Részletek
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerfumeCard;
