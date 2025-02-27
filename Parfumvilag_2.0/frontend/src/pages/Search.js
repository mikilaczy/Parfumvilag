import React, { useState, useEffect } from 'react';
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
  };

  const resetFilters = () => {
    setSearchTerm('');
    setMaxPrice(100000);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedScents([]);
    setFilteredPerfumes(perfumes);
  };

  return (
    <div className="container my-5" id="search-section">
      <div className="search-container">
        <h2 className="mb-4">Parfüm kereső</h2>
        <div className="row">
          <div className="col-md-12 mb-3">
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
              <button className="btn btn-primary" onClick={applyFilters}>
                <i className="fas fa-search"></i> Keresés
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-3">
            <div className="brand-filter">
              <h5>Márkák</h5>
              {['Chanel', 'Dior', 'Gucci', 'Armani', 'Versace'].map((brand) => (
                <div className="form-check" key={brand}>
                  <input
                    className="form-check-input brand-checkbox"
                    type="checkbox"
                    value={brand}
                    id={brand.toLowerCase()}
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
            <div className="category-filter">
              <h5>Kategória</h5>
              {['Női', 'Férfi', 'Unisex'].map((category) => (
                <div className="form-check" key={category}>
                  <input
                    className="form-check-input category-checkbox"
                    type="checkbox"
                    value={category}
                    id={category.toLowerCase()}
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
            <div className="scent-filter">
              <h5>Illat típus</h5>
              {['Virágos', 'Fás', 'Orientális', 'Friss', 'Citrusos'].map((scent) => (
                <div className="form-check" key={scent}>
                  <input
                    className="form-check-input scent-checkbox"
                    type="checkbox"
                    value={scent}
                    id={scent.toLowerCase()}
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
            <div className="price-filter">
              <h5>Ár (Ft)</h5>
              <input
                type="range"
                className="form-range"
                min="5000"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <span>
                Maximum: <span id="priceValue">{new Intl.NumberFormat('hu-HU').format(maxPrice)} Ft</span>
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <button className="btn btn-primary" onClick={applyFilters}>Szűrés alkalmazása</button>
            <button className="btn btn-outline-secondary ms-2" onClick={resetFilters}>Szűrők törlése</button>
          </div>
        </div>
        <div className="active-filters mt-3" id="activeFilters">
          {selectedBrands.length > 0 && <p>Márkák: {selectedBrands.join(', ')}</p>}
          {selectedCategories.length > 0 && <p>Kategóriák: {selectedCategories.join(', ')}</p>}
          {selectedScents.length > 0 && <p>Illatok: {selectedScents.join(', ')}</p>}
          {maxPrice !== 100000 && <p>Max ár: {new Intl.NumberFormat('hu-HU').format(maxPrice)} Ft</p>}
        </div>
      </div>

      <h3 className="mb-4">Találatok ({filteredPerfumes.length})</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row" id="perfumeList">
        {filteredPerfumes.length > 0 ? (
          filteredPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))
        ) : (
          <div id="noResults" className="text-center">
            <i className="fas fa-search fa-3x mb-3"></i>
            <h4>Nincs találat a keresési feltételeknek megfelelően</h4>
            <p>Próbálj meg kevesebb vagy más szűrőfeltételt beállítani</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;