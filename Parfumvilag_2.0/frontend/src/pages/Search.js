import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PerfumeCard from '../components/PerfumeCard';
import Sidebar from '../components/Sidebar';
import { getAllPerfumes } from '../services/perfumeService';

const Search = ({ searchTerm: propSearchTerm }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromUrl = searchParams.get('query') || '';
  const brandFilter = searchParams.get('brand') || '';
  const scentFilter = searchParams.get('scent') || '';
  const genderFilter = searchParams.get('gender') || '';
  const sortOption = searchParams.get('sort') || 'name-asc';
  const [perfumes, setPerfumes] = useState([]);
  const [initialPerfumes, setInitialPerfumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const [suggestions, setSuggestions] = useState([]);
  const perfumesPerPage = 24;
  const [totalPages, setTotalPages] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const perfumesData = await getAllPerfumes({
          query: searchTermFromUrl,
          brand: brandFilter,
          scent: scentFilter,
          gender: genderFilter,
          sort: sortOption,
          page: currentPage,
          per_page: perfumesPerPage
        });
        setPerfumes(perfumesData);
        setInitialPerfumes(perfumesData); // Csak az első alkalommal
        setError('');
      } catch (error) {
        setError('Nem sikerült betölteni a parfümök listáját!');
        setPerfumes([]);
      }
    };
    fetchPerfumes();
  }, [searchTermFromUrl, brandFilter, scentFilter, genderFilter, sortOption, currentPage]);
  useEffect(() => {
    if (initialPerfumes.length > 0) {
      filterAndSortPerfumes(initialPerfumes);
    }
  }, [brandFilter, scentFilter, genderFilter, sortOption, initialPerfumes]);

  useEffect(() => {
    if (searchTerm.trim() && initialPerfumes.length > 0) {
      const filtered = initialPerfumes
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, initialPerfumes]);

  const filterAndSortPerfumes = (data) => {
    let filtered = [...data];
    
    // Keresés
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Márka szűrés
    if (brandFilter) {
      filtered = filtered.filter(p => p.brand === brandFilter);
    }
  
    // Illatjegy szűrés (ha a scents tömb)
    if (scentFilter) {
      filtered = filtered.filter(p => 
        p.scents && p.scents.includes(scentFilter) // Ellenőrizd a tömb létezését
      );
    }
  
    // Nem szűrés
    if (genderFilter) {
      filtered = filtered.filter(p => p.gender === genderFilter);
    }
  
    // Rendezés
    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  
    setPerfumes(filtered);
    setTotalPages(Math.ceil(filtered.length / perfumesPerPage));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const filtered = initialPerfumes
      .filter((p) => !brandFilter || p.brand === brandFilter)
      .filter((p) => !scentFilter || (p.notes && p.notes.includes(scentFilter)))
      .filter((p) => !genderFilter || p.gender === genderFilter)
      .sort((a, b) => {
        switch (sortOption) {
          case 'name-asc': return a.name.localeCompare(b.name);
          case 'name-desc': return b.name.localeCompare(a.name);
          case 'price-asc': return (a.price || 0) - (b.price || 0);
          case 'price-desc': return (b.price || 0) - (a.price || 0);
          default: return 0;
        }
      });
    const startIndex = (page - 1) * perfumesPerPage;
    const endIndex = startIndex + perfumesPerPage;
    setPerfumes(filtered.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(searchParams);
    if (searchTerm.trim()) {
      queryParams.set('query', searchTerm);
    } else {
      queryParams.delete('query');
    }
    setSearchParams(queryParams);
    setSuggestions([]);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{
          marginLeft: windowWidth > 991 ? '250px' : '0',
          width: '100%',
        }}
      >
        <div className="search-page container-fluid mt-4">
          <div className="row justify-content-center mb-4">
            <div className="col-md-6 position-relative">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Keresés név szerint..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn btn-peach" onClick={handleSearch}>
                  Keresés
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                  {suggestions.map((perfume) => (
                    <li
                      key={perfume.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => navigate(`/parfume/${perfume.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {perfume.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <h1 className="search-title mb-4 text-center">Katalógus</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row" id="perfumeList">
            {perfumes.length === 0 && !error ? (
              <div id="noResults" className="text-center w-100">
                <i className="fas fa-search fa-2x mb-3"></i>
                <h4>Nincs találat</h4>
                <p>Próbálj meg más keresőszót vagy kevesebb szűrőt!</p>
              </div>
            ) : (
              perfumes.map((p) => <PerfumeCard key={p.id} perfume={p} />)
            )}
          </div>

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
                <div className="page-numbers">
                  {currentPage > 3 && (
                    <>
                      <li className="page-item">
                        <button className="page-link" onClick={() => handlePageChange(1)}>
                          1
                        </button>
                      </li>
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    </>
                  )}
                  {getPageNumbers().map((page) => (
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
                  {currentPage < totalPages - 2 && (
                    <>
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                      <li className="page-item">
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
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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