// frontend/src/components/SearchModal.js
import React, { useState } from 'react';
import PerfumeCard from './PerfumeCard';
import { getAllPerfumes } from '../services/perfumeService';
import { Modal, Button } from 'react-bootstrap';
import PerfumeDetailModal from '../components/PerfumeDetailModal'; // Példa
import '../style.css';

const SearchModal = ({ show, onClose }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await getAllPerfumes(searchTerm);
    setPerfumes(results);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Kereső</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Keresés..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Keresés
              </button>
            </div>
          </form>
        </div>

        {selectedPerfume ? (
          <PerfumeDetailModal perfume={selectedPerfume} onClose={onClose} />
        ) : (
          <div className="row g-3 mt-4">
            {perfumes.map((p) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <PerfumeCard
                  perfume={p}
                  onClick={() => setSelectedPerfume(p)}
                />
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Bezárás
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;