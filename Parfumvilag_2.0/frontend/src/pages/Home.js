import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PerfumeCard from '../components/PerfumeCard';
import axios from 'axios';
import '../style.css';

const Home = () => {
  const [featuredPerfumes, setFeaturedPerfumes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPerfumes = async () => {
      try {
        const response = await axios.get('/api/featured-perfumes');
        const perfumesData = await Promise.all(
          response.data.map(async (fp) => {
            const perfumeResponse = await axios.get(`/api/perfumes/${fp.perfume_id}`);
            return perfumeResponse.data;
          })
        );
        setFeaturedPerfumes(perfumesData);
      } catch (err) {
        console.error('Error fetching featured perfumes:', err);
        setError('Nem sikerült betölteni a kiemelt parfümöket.');
        setFeaturedPerfumes([]);
      }
    };
    fetchFeaturedPerfumes();
  }, []);

  return (
    <div className="home-wrapper">
      {/* Simplified Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Üdvözöljük a Parfümvilágban</h1>
          <p>
            Találd meg álmaid parfümjét ajánlásainkkal és árösszehasonlításainkkal – egyszerűen, gyorsan, stílusosan!
          </p>
          <div className="hero-actions">
            <Link to="/kereses" className="btn btn-peach hero-btn">Keresés indítása</Link>
            <Link to="/katalogus" className="btn btn-outline-peach ms-3 hero-btn">Hírek felfedezése</Link>
          </div>
        </div>
      </section>

      {/* Featured Section (Refined for Recommendations) */}
      <section className="featured-section container my-5">
        <h2 className="section-title text-center mb-4">Ajánlott Parfümjeink</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <div className="row g-3" id="perfumeList">
          {featuredPerfumes.length > 0 ? (
            featuredPerfumes.map((perfume) => (
              <div key={perfume.id} className="col-lg-4 col-md-6 col-12">
                <PerfumeCard perfume={perfume} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <div id="noResults">
                <i className="fas fa-search fa-2x mb-3"></i>
                <h4>Nincs találat</h4>
                <p>Próbálj meg később újra!</p>
              </div>
            </div>
          )}
        </div>

      </section>
    </div>
  );
};

export default Home;