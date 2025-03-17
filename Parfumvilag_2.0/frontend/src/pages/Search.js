// src/pages/Search.js
import React, { useState, useEffect } from 'react';
import PerfumeCard from '../components/PerfumeCard'; // Adjust path if needed
import { getAllPerfumes } from '../services/perfumeService'; // Adjust path if needed

const Search = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [initialPerfumes, setInitialPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  // Pagination settings
  const perfumesPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const perfumesData = await getAllPerfumes();
        setInitialPerfumes(perfumesData);
        setPerfumes(perfumesData.slice(0, perfumesPerPage));
        setTotalPages(Math.ceil(perfumesData.length / perfumesPerPage));
      } catch (error) {
        setError('Nem sikerült betölteni a parfümök listáját!');
        setPerfumes([]);
      }
    };
    fetchPerfumes();
  }, []);

  // Simplified search filter
  const handleSearch = () => {
    const filtered = initialPerfumes.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentPage(1); // Reset to first page on new search
    const startIndex = 0;
    const endIndex = perfumesPerPage;
    setPerfumes(filtered.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filtered.length / perfumesPerPage));
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    const filtered = initialPerfumes.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (page - 1) * perfumesPerPage;
    const endIndex = startIndex + perfumesPerPage;
    setPerfumes(filtered.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="search-page container-fluid">
      <div className="row">
        {/* Left Sidebar with Simple Search */}
        <div className="col-md-3 col-lg-2 filter-sidebar">
          <div className="search-container">
            <h2 className="search-title">Keresés</h2>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Keresés név szerint..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-peach mt-3" onClick={handleSearch}>
              Keresés
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10">
          <h1 className="search-title mb-4">Katalógus</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row" id="perfumeList">
            {perfumes.length === 0 && !error ? (
              <div id="noResults" className="text-center w-100">
                <i className="fas fa-search fa-2x mb-3"></i>
                <h4>Nincs találat</h4>
                <p>Próbálj meg más keresőszót!</p>
              </div>
            ) : (
              perfumes.map(p => <PerfumeCard key={p.id} perfume={p} />)
            )}
          </div>

          {/* Pagination with Horizontal Numbers */}
          {totalPages > 1 && (
            <nav className="pagination mt-4">
              <ul className="pagination-list justify-content-center align-items-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link prev-next"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Előző
                  </button>
                </li>

                {/* Horizontal Page Numbers with First Page Always Visible */}
                <div className="page-numbers">
                  {/* Always show page 1 */}
                  <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>
                      1
                    </button>
                  </li>

                  {/* Show ellipsis if currentPage is far from 1 */}
                  {currentPage > 3 && totalPages > 3 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}

                  {/* Dynamic range around current page */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(
                      Math.max(2, currentPage - 1), // Start after 1 if possible
                      Math.min(totalPages, currentPage + 2) // End before last page if needed
                    )
                    .map(page => (
                      <li
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                        key={page}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                  {/* Show ellipsis and last page if far from current */}
                  {currentPage < totalPages - 2 && (
                    <>
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                      <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </li>
                    </>
                  )}
                </div>

                <li
                  className={`page-item ${
                    currentPage === totalPages ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link prev-next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Következő
                  </button>
                </li>
              </ul>
              <div className="pagination-info text-center mt-2">
                Összesen {totalPages} oldal
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;