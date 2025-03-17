import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPerfumes } from '../services/perfumeService';

const Sidebar = () => {
  const [allPerfumes, setAllPerfumes] = useState([]);
  const [brandFilter, setBrandFilter] = useState('');
  const [scentFilter, setScentFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const perfumesData = await getAllPerfumes(''); // Üres keresés az összes parfümhöz
        setAllPerfumes(perfumesData);
      } catch (error) {
        console.error('Hiba a sidebar adatbetöltésnél:', error.message);
      }
    };
    fetchPerfumes();
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (brandFilter) queryParams.set('brand', brandFilter);
    if (scentFilter) queryParams.set('scent', scentFilter);
    if (genderFilter) queryParams.set('gender', genderFilter);
    if (sortOption) queryParams.set('sort', sortOption);

    console.log('Szűrők alkalmazása:', queryParams.toString()); // Ellenőrzés
    navigate(`/kereses?${queryParams.toString()}`);
  };

  const uniqueBrands = [...new Set(allPerfumes.map((p) => p.brand))];
  const uniqueScents = [...new Set(allPerfumes.map((p) => p.scentType))];

  return (
    <div
      className="sidebar bg-light p-3 d-flex flex-column"
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        overflowY: 'auto', // Görgethető, ha túl hosszú
      }}
    >
      {/* Rendezés */}
      <div className="mb-3">
        <label htmlFor="sort" className="form-label">Rendezés</label>
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

      {/* Márka szűrő */}
      <div className="mb-3">
        <label htmlFor="brand" className="form-label">Márka</label>
        <select
          id="brand"
          className="form-select"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">Összes</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Illatfajta szűrő */}
      <div className="mb-3">
        <label htmlFor="scent" className="form-label">Illatfajta</label>
        <select
          id="scent"
          className="form-select"
          value={scentFilter}
          onChange={(e) => setScentFilter(e.target.value)}
        >
          <option value="">Összes</option>
          {uniqueScents.map((scent) => (
            <option key={scent} value={scent}>{scent}</option>
          ))}
        </select>
      </div>

      {/* Nem szűrő */}
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">Nem</label>
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

      {/* Keresés gomb alul, láthatóan */}
      <div className="mt-3">
        <button
          className="btn btn-peach w-100"
          onClick={handleSearch}
          style={{ position: 'sticky', bottom: '10px' }} // Látható marad
        >
          Keresés
        </button>
      </div>
    </div>
  );
};

export default Sidebar;