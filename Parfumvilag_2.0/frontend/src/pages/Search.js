import React, { useState, useEffect } from "react";
import PerfumeCard from "../components/PerfumeCard";
import axios from "axios";

const Search = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedScents, setSelectedScents] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [activeFilters, setActiveFilters] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get("/api/perfumes");
        setPerfumes(response.data);
      } catch (error) {
        console.error("Error fetching perfumes:", error);
        setPerfumes([]);
      }
    };
    fetchPerfumes();
  }, []);

  const applyFilters = () => {
    const filtered = perfumes
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (p) => selectedBrands.length === 0 || selectedBrands.includes(p.brand)
      )
      .filter(
        (p) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.gender)
      )
      .filter(
        (p) =>
          selectedScents.length === 0 ||
          p.scents.some((scent) => selectedScents.includes(scent))
      )
      .filter((p) => p.price <= maxPrice);

    setActiveFilters(getActiveFilters());
    setPerfumes(filtered);
    setNoResults(filtered.length === 0);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedScents([]);
    setMaxPrice(100000);
    setActiveFilters("");
    setNoResults(false);
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get("/api/perfumes");
        setPerfumes(response.data);
      } catch (error) {
        console.error("Error fetching perfumes:", error);
        setPerfumes([]);
      }
    };
    fetchPerfumes();
  };

  const getActiveFilters = () => {
    const filters = [];
    if (searchTerm) filters.push(`Keresés: ${searchTerm}`);
    if (selectedBrands.length > 0)
      filters.push(`Márkák: ${selectedBrands.join(", ")}`);
    if (selectedCategories.length > 0)
      filters.push(`Kategóriák: ${selectedCategories.join(", ")}`);
    if (selectedScents.length > 0)
      filters.push(`Illatok: ${selectedScents.join(", ")}`);
    if (maxPrice < 100000)
      filters.push(
        `Max ár: ${new Intl.NumberFormat("hu-HU").format(maxPrice)} Ft`
      );
    return filters.join(", ");
  };

  return (
    <div className="container">
      <div className="search-container">
        <h2>Parfüm kereső</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={applyFilters}
          >
            Keresés
          </button>
        </div>
        <div className="brand-filter">
          <h5>Márkák</h5>
          <div className="form-check">
            <input
              className="form-check-input brand-checkbox"
              type="checkbox"
              value="Chanel"
              id="brandChanel"
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
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
              onChange={(e) =>
                setSelectedBrands((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((b) => b !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="brandDior">
              Dior
            </label>
          </div>
          {/* További márkák */}
        </div>
        <div className="category-filter">
          <h5>Kategóriák</h5>
          <div className="form-check">
            <input
              className="form-check-input category-checkbox"
              type="checkbox"
              value="male"
              id="categoryMale"
              onChange={(e) =>
                setSelectedCategories((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((c) => c !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="categoryMale">
              Férfi
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input category-checkbox"
              type="checkbox"
              value="female"
              id="categoryFemale"
              onChange={(e) =>
                setSelectedCategories((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((c) => c !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="categoryFemale">
              Női
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input category-checkbox"
              type="checkbox"
              value="unisex"
              id="categoryUnisex"
              onChange={(e) =>
                setSelectedCategories((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((c) => c !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="categoryUnisex">
              Unisex
            </label>
          </div>
        </div>
        <div className="scent-filter">
          <h5>Illat típus</h5>
          <div className="form-check">
            <input
              className="form-check-input scent-checkbox"
              type="checkbox"
              value="Virágos"
              id="scentVirágos"
              onChange={(e) =>
                setSelectedScents((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((s) => s !== e.target.value)
                )
              }
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
              onChange={(e) =>
                setSelectedScents((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((s) => s !== e.target.value)
                )
              }
            />
            <label className="form-check-label" htmlFor="scentFás">
              Fás
            </label>
          </div>
          {/* További illat típusok */}
        </div>
        <div className="price-filter">
          <h5>Ár (Ft)</h5>
          <input
            type="range"
            className="form-range"
            id="priceRange"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
          <span>
            Maximum:{" "}
            <span id="priceValue">
              {new Intl.NumberFormat("hu-HU").format(maxPrice)}
            </span>{" "}
            Ft
          </span>
        </div>
        <div className="active-filters">{activeFilters}</div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={applyFilters}>
            Szűrés alkalmazása
          </button>
          <button className="btn btn-outline-secondary" onClick={resetFilters}>
            Szűrők törlése
          </button>
        </div>
      </div>
      <div className="row" id="perfumeList">
        {noResults ? (
          <div id="noResults">
            <i className="fas fa-search"></i>
            <h4>Nincs találat a keresési feltételeknek megfelelően</h4>
            <p>Próbálj meg kevesebb vagy más szűrőfeltételt beállítani</p>
          </div>
        ) : (
          perfumes.map((p) => <PerfumeCard key={p.id} perfume={p} />)
        )}
      </div>
    </div>
  );
};

export default Search;
