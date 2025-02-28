import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added import for Link
import axios from 'axios';
import PerfumeCard from '../components/PerfumeCard';
import '../style.css';

const Search = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedScents, setSelectedScents] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]); // For quick search suggestions

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get('/api/perfumes');
        setPerfumes(response.data);
        setFilteredPerfumes(response.data);
      } catch (err) {
        setError('Nem sikerült betölteni a parfümöket.');
        console.error(err);
      }
    };
    fetchPerfumes();
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = perfumes
      .filter((perfume) =>
        (perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perfume.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !filteredPerfumes.some((p) => p.id === perfume.id) // Avoid duplicates
      )
      .slice(0, 5); // Limit to 5 suggestions
    setSuggestions(filteredSuggestions);
  }, [searchTerm, perfumes, filteredPerfumes]);

  const applyFilters = () => {
    const filtered = perfumes.filter((perfume) => {
      const matchesSearch =
        searchTerm === '' ||
        perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = perfume.price <= maxPrice;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(perfume.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(perfume.gender);
      const matchesScents = selectedScents.length === 0 || selectedScents.some((scent) => perfume.notes.includes(scent));

      return matchesSearch && matchesPrice && matchesBrand && matchesCategory && matchesScents;
    });
    setFilteredPerfumes(filtered);
    setSuggestions([]); // Clear suggestions after applying filters
  };

  const resetFilters = () => {
    setSearchTerm('');
    setMaxPrice(100000);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedScents([]);
    setFilteredPerfumes(perfumes);
    setSuggestions([]); // Clear suggestions on reset
  };

  const handleSuggestionClick = (perfume) => {
    setSearchTerm(perfume.name);
    setFilteredPerfumes([perfume]);
    setSuggestions([]);
  };

  return (
    <div className="search-page container my-5">
      <div className="search-container">
        <h1 className="search-title mb-3">Parfüm Kereső</h1>
        <p className="search-subtitle mb-4">
          Találd meg az ideális parfümöt ajánlásainkkal és árösszehasonlításainkkal!
        </p>

        {/* Search Input with Suggestions */}
        <div className="search-input-group mb-4">
          <div className="input-group">
            <input
              type="text"
              id="searchInput"
              className="form-control"
              placeholder="Keresés név vagy márka szerint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && applyFilters()}
            />
            <button className="btn btn-peach" onClick={applyFilters}>
              <i className="fas fa-search"></i> Keresés
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions-list list-group mt-2">
              {suggestions.map((perfume) => (
                <li
                  key={perfume.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(perfume)}
                >
                  {perfume.name} ({perfume.brand})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filters */}
        <div className="row g-3 mt-3">
          <div className="col-md-3">
            <div className="filter-section brand-filter">
              <h5>Márkák</h5>
              {['Chanel', 'Dior', 'Gucci', 'Armani', 'Versace'].map((brand) => (
                <div className="form-check" key={brand}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={brand}
                    id={brand.toLowerCase()}
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedBrands((prev) =>
                        checked ? [...prev, brand] : prev.filter((b) => b !== brand)
                      );
                    }}
                  />
                  <label className="form-check-label" htmlFor={brand.toLowerCase()}>
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <div className="filter-section category-filter">
              <h5>Kategória</h5>
              {['Női', 'Férfi', 'Unisex'].map((category) => (
                <div className="form-check" key={category}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={category}
                    id={category.toLowerCase()}
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedCategories((prev) =>
                        checked ? [...prev, category] : prev.filter((c) => c !== category)
                      );
                    }}
                  />
                  <label className="form-check-label" htmlFor={category.toLowerCase()}>
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <div className="filter-section scent-filter">
              <h5>Illat típus</h5>
              {['Virágos', 'Fás', 'Orientális', 'Friss', 'Citrusos'].map((scent) => (
                <div className="form-check" key={scent}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={scent}
                    id={scent.toLowerCase()}
                    checked={selectedScents.includes(scent)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedScents((prev) =>
                        checked ? [...prev, scent] : prev.filter((s) => s !== scent)
                      );
                    }}
                  />
                  <label className="form-check-label" htmlFor={scent.toLowerCase()}>
                    {scent}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <div className="filter-section price-filter">
              <h5>Max. ár (Ft)</h5>
              <input
                type="range"
                className="form-range"
                min="5000"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <span className="price-value">
                {new Intl.NumberFormat('hu-HU').format(maxPrice)} Ft
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <button className="btn btn-peach" onClick={applyFilters}>Szűrés alkalmazása</button>
            <button className="btn btn-outline-peach ms-2" onClick={resetFilters}>Szűrők törlése</button>
          </div>
        </div>
        <div className="active-filters mt-3" id="activeFilters">
          {selectedBrands.length > 0 && <p>Márkák: {selectedBrands.join(', ')}</p>}
          {selectedCategories.length > 0 && <p>Kategóriák: {selectedCategories.join(', ')}</p>}
          {selectedScents.length > 0 && <p>Illatok: {selectedScents.join(', ')}</p>}
          {maxPrice !== 100000 && <p>Max. ár: {new Intl.NumberFormat('hu-HU').format(maxPrice)} Ft</p>}
        </div>
      </div>

      <h3 className="results-title mb-4">Találatok ({filteredPerfumes.length})</h3>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="row g-3" id="perfumeList">
        {filteredPerfumes.length > 0 ? (
          filteredPerfumes.map((perfume) => (
            <div key={perfume.id} className="col-lg-4 col-md-6 col-12">
              <PerfumeCard perfume={perfume} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div id="noResults">
              <i className="fas fa-search fa-2x mb-3"></i>
              <h4>Nincs találat a keresési feltételeknek megfelelően</h4>
              <p>Próbálj meg kevesebb vagy más szűrőfeltételt beállítani</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Search Suggestions Section */}
      <section className="quick-suggestions-section container mt-5">
        <h2 className="section-title text-center mb-4">Gyors ajánlások</h2>
        <div className="row g-3">
          {['Chanel No. 5', 'Dior Sauvage', 'Gucci Bloom', 'Armani Code', 'Versace Eros'].map((suggestion, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-12">
              <div className="suggestion-card card h-100">
                <div className="card-body">
                  <h5 className="card-title">{suggestion}</h5>
                  <p className="card-text">Kattints a kereséshez és fedezd fel az ajánlásokat!</p>
                  <Link to={`/kereses?query=${encodeURIComponent(suggestion)}`} className="btn btn-outline-peach">
                    Keresés
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;