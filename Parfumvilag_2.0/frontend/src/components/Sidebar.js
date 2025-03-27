import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// Feltételezzük, hogy a service importok helyesek
// import { getAllNotes } from "../services/noteService";
// import { getAllBrands } from "../services/brandService"; // Vagy fetch, ahogy korábban volt

const Sidebar = () => {
  // 1. Inicializáld a searchParams-ot ELŐSZÖR!
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 2. Most már használhatod a searchParams-ot a useState-ben
  const [brandFilter, setBrandFilter] = useState(
    searchParams.get("brand") || ""
  );
  const [scentFilter, setScentFilter] = useState(
    searchParams.get("note") || ""
  );
  const [genderFilter, setGenderFilter] = useState(
    searchParams.get("gender") || ""
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "name-asc"
  );

  // State for fetched data
  const [brands, setBrands] = useState([]);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  // State for sidebar UI
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // State for dropdown search terms
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [noteSearchTerm, setNoteSearchTerm] = useState("");

  // Fetch brands and notes
  useEffect(() => {
    setError(null); // Clear previous errors on new fetch attempt
    let isMounted = true; // Flag to prevent state update on unmounted component

    // Fetch Brands
    fetch("http://localhost:5000/api/brands")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok for brands");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setBrands(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        console.error("Hiba a márkák betöltésekor:", err);
        if (isMounted) {
          setError(
            (prev) => (prev ? prev + "\n" : "") + "Márkák betöltése sikertelen."
          );
          setBrands([]);
        }
      });

    // Fetch Notes
    fetch("http://localhost:5000/api/notes")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok for notes");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setNotes(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        console.error("Hiba az illatjegyek betöltésekor:", err);
        if (isMounted) {
          setError(
            (prev) =>
              (prev ? prev + "\n" : "") + "Illatjegyek betöltése sikertelen."
          );
          setNotes([]);
        }
      });

    return () => {
      isMounted = false;
    }; // Cleanup function
  }, []); // Run only once on mount

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Set initial state correctly based on width
    if (window.innerWidth > 991) {
      setIsOpen(true); // Keep open on desktop by default if needed
    } else {
      setIsOpen(false); // Closed on mobile by default
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Run only once

  // Filter brands based on search term
  const filteredBrands = useMemo(() => {
    if (!brandSearchTerm) return brands;
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
    );
  }, [brands, brandSearchTerm]);

  // Filter notes based on search term
  const filteredNotes = useMemo(() => {
    if (!noteSearchTerm) return notes;
    return notes.filter((note) =>
      note.name.toLowerCase().includes(noteSearchTerm.toLowerCase())
    );
  }, [notes, noteSearchTerm]);

  // Apply filters and navigate
  const handleSearch = () => {
    const queryParams = new URLSearchParams(searchParams); // Start with existing params
    // Update params based on state
    if (brandFilter) queryParams.set("brand", brandFilter);
    else queryParams.delete("brand");
    if (scentFilter) queryParams.set("note", scentFilter);
    else queryParams.delete("note");
    if (genderFilter) queryParams.set("gender", genderFilter);
    else queryParams.delete("gender");
    if (sortOption) queryParams.set("sort", sortOption);
    else queryParams.delete("sort"); // Keep default maybe?
    queryParams.set("page", "1"); // Reset page to 1 when filters change

    navigate(`/kereses?${queryParams.toString()}`);
    if (windowWidth <= 991) {
      // Close sidebar on mobile after search
      setIsOpen(false);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setBrandFilter("");
    setScentFilter("");
    setGenderFilter("");
    setSortOption("name-asc"); // Reset sort
    setBrandSearchTerm(""); // Clear dropdown search
    setNoteSearchTerm(""); // Clear dropdown search

    const queryParams = new URLSearchParams(searchParams); // Start with existing
    // Remove filter params
    queryParams.delete("brand");
    queryParams.delete("note");
    queryParams.delete("gender");
    queryParams.delete("sort");
    queryParams.set("page", "1"); // Reset page

    navigate(`/kereses?${queryParams.toString()}`); // Navigate with cleared filters
    if (windowWidth <= 991) {
      // Close sidebar on mobile
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Determine sidebar class based on state and window width
  const sidebarClass = `sidebar d-flex flex-column ${
    windowWidth <= 991 && !isOpen ? "hidden" : ""
  }`;

  return (
    <>
      {windowWidth <= 991 && (
        <button className="filter-toggle btn btn-sm" onClick={toggleSidebar}>
          <i className={`fas ${isOpen ? "fa-times" : "fa-filter"} me-1`}></i>{" "}
          {/* Change icon */}
          {isOpen ? "Bezár" : "Szűrők"}
        </button>
      )}

      <div className={sidebarClass}>
        {" "}
        {/* Use dynamic class */}
        <h5 className="mb-3">Szűrők és Rendezés</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Rendezés */}
        <div className="mb-3">
          <label htmlFor="sort" className="form-label">
            Rendezés
          </label>
          <select
            id="sort"
            className="form-select form-select-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name-asc">Név (A-Z)</option>
            <option value="name-desc">Név (Z-A)</option>
            <option value="price-asc">Ár (növekvő)</option>
            <option value="price-desc">Ár (csökkenő)</option>
          </select>
        </div>
        {/* Márka Szűrő + Kereső */}
        <div className="mb-3 filter-dropdown">
          <label htmlFor="brand" className="form-label">
            Márka
          </label>
          <input
            type="text"
            className="form-control form-control-sm mb-2"
            placeholder="Márka keresése..."
            value={brandSearchTerm}
            onChange={(e) => setBrandSearchTerm(e.target.value)}
          />
          <select
            id="brand"
            className="form-select form-select-sm"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="">Összes márka</option>
            {filteredBrands.length > 0
              ? filteredBrands.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))
              : brands.length > 0 &&
                brandSearchTerm && (
                  <option value="" disabled>
                    Nincs találat
                  </option>
                )}
          </select>
        </div>
        {/* Illatjegy Szűrő + Kereső */}
        <div className="mb-3 filter-dropdown">
          <label htmlFor="scent" className="form-label">
            Illatjegy
          </label>
          <input
            type="text"
            className="form-control form-control-sm mb-2"
            placeholder="Illatjegy keresése..."
            value={noteSearchTerm}
            onChange={(e) => setNoteSearchTerm(e.target.value)}
          />
          <select
            id="scent"
            className="form-select form-select-sm"
            value={scentFilter}
            onChange={(e) => setScentFilter(e.target.value)}
          >
            <option value="">Összes illatjegy</option>
            {filteredNotes.length > 0
              ? filteredNotes.map((note) => (
                  <option key={note.id} value={note.name}>
                    {note.name}
                  </option>
                ))
              : notes.length > 0 &&
                noteSearchTerm && (
                  <option value="" disabled>
                    Nincs találat
                  </option>
                )}
          </select>
        </div>
        {/* Nem Szűrő */}
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Nem
          </label>
          <select
            id="gender"
            className="form-select form-select-sm"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">Összes</option>
            <option value="male">Férfi</option>
            <option value="female">Női</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        {/* Gombok */}
        <div className="mt-auto pt-3">
          {" "}
          {/* Push buttons to the bottom */}
          <button className="btn btn-primary w-100 mb-2" onClick={handleSearch}>
            {" "}
            {/* Changed btn-peach */}
            Szűrés és Rendezés
          </button>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={handleClearFilters}
          >
            Szűrők törlése
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
