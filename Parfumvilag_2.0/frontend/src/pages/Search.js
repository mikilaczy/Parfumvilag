import React, { useState, useEffect } from 'react';
import PerfumeCard from '../components/PerfumeCard';
import { getAllPerfumes } from '../services/perfumeService';

const Search = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedScents, setSelectedScents] = useState([]);
  const [sortOption, setSortOption] = useState('name-asc'); // Default sorting: name ascending
  const [activeFilters, setActiveFilters] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState('');
  const [initialPerfumes, setInitialPerfumes] = useState([]); // Store initial perfumes for reset
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // Add this line

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const perfumesData = await getAllPerfumes();
        setPerfumes(perfumesData);
        setInitialPerfumes(perfumesData);
        setNoResults(perfumesData.length === 0);
      } catch (error) {
        setError('Nem sikerült betölteni a parfümek listáját!');
        setPerfumes([]);
        setNoResults(true);
      }
    };
    fetchPerfumes();
  }, []);

  const applyFilters = () => {
    let filtered = [...initialPerfumes];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.gender));
    }

    if (selectedScents.length > 0) {
      filtered = filtered.filter((p) =>
        p.scents.some((scent) => selectedScents.includes(scent))
      );
    }

    filtered = applySorting(filtered, sortOption);

    setPerfumes(filtered);
    setNoResults(filtered.length === 0);
    setActiveFilters(getActiveFilters());
  };

  const applySorting = (perfumesList, sortOption) => {
    return [...perfumesList].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedScents([]);
    setSortOption('name-asc');
    setActiveFilters('');
    setPerfumes(initialPerfumes);
    setNoResults(initialPerfumes.length === 0);
  };

  const getActiveFilters = () => {
    const filters = [];
    if (searchTerm) filters.push(`Keresés: ${searchTerm}`);
    if (selectedBrands.length > 0)
      filters.push(`Márkák: ${selectedBrands.join(', ')}`);
    if (selectedCategories.length > 0)
      filters.push(`Kategóriák: ${selectedCategories.join(', ')}`);
    if (selectedScents.length > 0)
      filters.push(`Illatok: ${selectedScents.join(', ')}`);
    if (sortOption !== 'name-asc')
      filters.push(`Rendezés: ${getSortLabel(sortOption)}`);
    return filters.join(', ');
  };

  const getSortLabel = (option) => {
    switch (option) {
      case 'name-asc':
        return 'Név A-Z-ig';
      case 'name-desc':
        return 'Név Z-A-ig';
      default:
        return 'Név A-Z-ig';
    }
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setSelectedBrands((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((b) => b !== value)
    );
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  const handleScentChange = (e) => {
    const value = e.target.value;
    setSelectedScents((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortSelection = (option) => {
    setSortOption(option);
    setIsSortDropdownOpen(false);
    applyFilters();
  };

  return (
    <div className="catalog-section container">
      <h1 className="title-section-h1">Katalógus</h1>
      <div className="search-container">
        <h2 className="search-title">Keresés</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-peach"
            type="button"
            onClick={applyFilters}
          >
            Keresés
          </button>
        </div>
        <div className="filter-grid">
          {/* Brands */}
          <div className="filter-section brand-filter">
            <h5>Márkák</h5>
            <div className="form-check">
              <input
                className="form-check-input brand-checkbox"
                type="checkbox"
                value="Chanel"
                id="brandChanel"
                onChange={handleBrandChange}
                checked={selectedBrands.includes('Chanel')}
              />
              <label className="form-check-label" htmlFor="brandChanel">
                Chanel
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input brand-checkbox"
                type="checkbox"
                value="Dior"
                id="brandDior"
                onChange={handleBrandChange}
                checked={selectedBrands.includes('Dior')}
              />
              <label className="form-check-label" htmlFor="brandDior">
                Dior
              </label>
            </div>
          </div>

          {/* Categories */}
          <div className="filter-section category-filter">
            <h5>Kategóriák</h5>
            <div className="form-check">
              <input
                className="form-check-input category-checkbox"
                type="checkbox"
                value="female"
                id="categoryFemale"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes('female')}
              />
              <label className="form-check-label" htmlFor="categoryFemale">
                Női
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input category-checkbox"
                type="checkbox"
                value="male"
                id="categoryMale"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes('male')}
              />
              <label className="form-check-label" htmlFor="categoryMale">
                Férfi
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input category-checkbox"
                type="checkbox"
                value="unisex"
                id="categoryUnisex"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes('unisex')}
              />
              <label className="form-check-label" htmlFor="categoryUnisex">
                Unisex
              </label>
            </div>
          </div>

          {/* Scents */}
          <div className="filter-section scent-filter">
            <h5>Illat típus</h5>
            <div className="form-check">
              <input
                className="form-check-input scent-checkbox"
                type="checkbox"
                value="Virágos"
                id="scentVirágos"
                onChange={handleScentChange}
                checked={selectedScents.includes('Virágos')}
              />
              <label className="form-check-label" htmlFor="scentVirágos">
                Virágos
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input scent-checkbox"
                type="checkbox"
                value="Fás"
                id="scentFás"
                onChange={handleScentChange}
                checked={selectedScents.includes('Fás')}
              />
              <label className="form-check-label" htmlFor="scentFás">
                Fás
              </label>
            </div>
          </div>

          {/* Sorting */}
          <div className="filter-section sort-filter">
            <h5>Rendezés</h5>
            <button
              className="btn btn-peach sort-toggle"
              onClick={toggleSortDropdown}
            >
              {getSortLabel(sortOption)} <i className="fas fa-caret-down"></i>
            </button>
            {isSortDropdownOpen && (
              <div className="sort-dropdown-menu">
                <button
                  className="sort-dropdown-item"
                  onClick={() => handleSortSelection('name-asc')}
                >
                  Név A-Z-ig
                </button>
                <button
                  className="sort-dropdown-item"
                  onClick={() => handleSortSelection('name-desc')}
                >
                  Név Z-A-ig
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="active-filters">{activeFilters}</div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-peach"
            onClick={applyFilters}
          >
            Szűrés alkalmazása
          </button>
          <button
            type="button"
            className="btn btn-outline-peach ms-2"
            onClick={resetFilters}
          >
            Szűrők törlése
          </button>
        </div>
      </div>
      <div className="row" id="perfumeList">
        {error && <div className="alert alert-danger">{error}</div>}
        {noResults && (
          <div id="noResults">
            <i className="fas fa-search"></i>
            <h4>Nincs találat a keresési feltételeknek megfelelően</h4>
            <p>Próbálj meg kevesebb vagy más szűrőfeltételt beállítani</p>
          </div>
        )}
        {!noResults &&
          perfumes.map((p) => <PerfumeCard key={p.id} perfume={p} />)}
      </div>
    </div>
  );
};

export default Search;