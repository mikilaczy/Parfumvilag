import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container my-5">
        <h1 className="about-title">Rólunk</h1>
        <p className="about-subtitle">Üdvözlünk a Parfümvilágban, ahol az illatok és az egyéniség tökéletes harmóniát alkotnak!</p>

        {/* Miben segíthetünk? szekció */}
        <div className="row g-4 mb-5">
          <h2 className="section-title">Miben segíthetünk?</h2>
          <div className="col-lg-4 col-md-6 col-12">
            <div className="about-card">
              <i className="fas fa-list-ul about-icon"></i>
              <h3 className="about-card-title">Kategóriák szerinti böngészés</h3>
              <p className="about-card-text">
                Navigálj könnyedén különböző márkák és illatcsoportok között.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <div className="about-card">
              <i className="fas fa-balance-scale about-icon"></i>
              <h3 className="about-card-title">Árak összehasonlítása</h3>
              <p className="about-card-text">
                Találd meg a legjobb ajánlatokat különböző boltokból.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <div className="about-card">
              <i className="fas fa-star about-icon"></i>
              <h3 className="about-card-title">Újdonságok és klasszikusok</h3>
              <p className="about-card-text">
                Fedezd fel az új illatokat és a timeless klasszikusokat.
              </p>
            </div>
          </div>
        </div>

        {/* Kik vagyunk? szekció */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-md-6">
            <div className="about-card">
              <h2 className="about-card-title">Kik vagyunk?</h2>
              <p className="about-card-text">
                A Parfümvilág nem csupán egy webshop, hanem egy egyedülálló platform, amely összegyűjti és
                összehasonlítja a legjobb online parfümkínálatokat. Küldetésünk, hogy időt és energiát spóroljunk
                neked, miközben a legmegfelelőbb illatot választod.
              </p>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Parfümvilág csapat"
                className="about-card-img"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-card">
              <h2 className="about-card-title">Célunk</h2>
              <p className="about-card-text">
                Szeretnénk, hogy mindenki megtalálja a saját, egyedi illatát. Az illatok többet mondanak rólad,
                mint gondolnád – mi pedig itt vagyunk, hogy segítsünk ebben az utazásban.
              </p>
              <Link to="/kereses" className="btn btn-gold mt-3">
                Kezdj keresni most
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;