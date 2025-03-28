import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNotes } from "../services/noteService";
import { getAllBrands } from "../services/brandService";

const Sidebar = () => {
  const [brands, setBrands] = useState([]);
  const [notes, setNotes] = useState([]);
  const [brandFilter, setBrandFilter] = useState("");
  const [scentFilter, setScentFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsData = await getAllBrands();
        const notesData = await getAllNotes();
        setBrands(brandsData);
        setNotes(notesData);
      } catch (error) {
        console.error("Hiba az adatok betöltésénél:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (brandFilter) queryParams.set("brands", brandFilter);
    if (scentFilter) queryParams.set("perfume_notes", scentFilter);
    if (genderFilter) queryParams.set("gender", genderFilter);
    if (sortOption) queryParams.set("sort", sortOption);
    navigate(`/kereses?${queryParams.toString()}`);
    setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {windowWidth <= 991 && (
        <button className="filter-toggle" onClick={toggleSidebar}>
          <i className="fas fa-filter"></i> {isOpen ? "Bezár" : "Szűrők"}
        </button>
      )}

      <div
        className={`sidebar d-flex flex-column ${
          windowWidth <= 991 && !isOpen ? "hidden" : ""
        }`}
      >
        <div className="mb-3">
          <label htmlFor="sort" className="form-label">
            Rendezés
          </label>
          <select
            id="sort"
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name-asc">Név (A-Z)</option>
            <option value="name-desc">Név (Z-A)</option>
            <option value="price-asc">Ár (növekvő)</option>
            <option value="price-desc">Ár (csökkenő)</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Márka
          </label>
          <select
            id="brand"
            className="form-select"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="">Összes</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="scent" className="form-label">
            Illatjegy
          </label>
          <select
            id="scent"
            className="form-select"
            value={scentFilter}
            onChange={(e) => setScentFilter(e.target.value)}
          >
            <option value="">Összes</option>
            {notes.map((note) => (
              <option key={note.id} value={note.name}>
                {note.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Nem
          </label>
          <select
            id="gender"
            className="form-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">Összes</option>
            <option value="male">Férfi</option>
            <option value="female">Női</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mt-3">
          <button className="btn btn-peach w-100" onClick={handleSearch}>
            Keresés
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
