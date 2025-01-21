import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Catalog() {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/api/perfumes.php')
      .then(response => setPerfumes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <h2>Perfume Catalog</h2>
      <div className="row">
        {perfumes.map(perfume => (
          <div key={perfume.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={perfume.image_url} alt={perfume.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{perfume.name}</h5>
                <p className="card-text">{perfume.description}</p>
                <Link to={`/product/${perfume.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;