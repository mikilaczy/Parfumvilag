// frontend/src/components/PerfumeDetailModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style.css';

const PerfumeDetailModal = ({ perfume, onClose }) => {
  const noteTags = (perfume?.notes || []).map((note, index) => (
    <span key={index} className="scent-tag me-2">
      {note}
    </span>
  ));

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{perfume?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <img
              src={perfume?.image_url || 'https://via.placeholder.com/400'}
              alt={perfume?.name}
              className="img-fluid rounded"
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className="col-md-6">
            <h5>Márka: {perfume?.brand}</h5>
            <p>
              <strong>Illatok: </strong>
              {noteTags}
            </p>
            <p className="price-display">
              {perfume?.price && new Intl.NumberFormat('hu-HU').format(perfume.price)} Ft
            </p>
            <p>{perfume?.description || 'Nincs leírás'}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Bezárás
        </Button>
        <Link to={`/parfume/${perfume?.id}`} className="btn btn-primary">
          Oldal megnyitása
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default PerfumeDetailModal;