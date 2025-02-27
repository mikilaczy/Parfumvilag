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
    <div>
      <div className="hero-section">
        <h1>Üdvözöljük a Parfümvilágban</h1>
        <p>
          Merülj el az illatok lenyűgöző világában, és találd meg a tökéletes parfümöt, amely kifejezi egyéniségedet.
        </p>
        <Link to="/kereses" className="btn btn-primary">Keresés indítása</Link>
      </div>

      <section className="container my-5">
        <h2 className="text-center mb-5">Kiemelt Parfümjeink</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-4" id="perfumeList">
          {featuredPerfumes.length > 0 ? (
            featuredPerfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))
          ) : (
            <div id="noResults" className="text-center">
              <i className="fas fa-search fa-3x mb-3"></i>
              <h4>Nincs találat</h4>
              <p>Próbálj meg később újra!</p>
            </div>
          )}
        </div>
        <div className="text-center mt-5">
          <Link to="/kereses" className="btn btn-outline-primary">További parfümök felfedezése</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;