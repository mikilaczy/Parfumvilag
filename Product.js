import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/api/product.php?id=${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div className="container">
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.image_url} alt={product.name} className="img-fluid" />
          <p>{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Típus:</strong> {product.type}</p>
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Product;