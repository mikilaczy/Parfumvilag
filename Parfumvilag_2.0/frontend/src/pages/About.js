import React from 'react';
import '../style.css';

const About = () => {
  return (
    <div>
      <div className="title-section">
        <h1>Rólunk</h1>
        <div className="divider"></div>
        <p>Üdvözlünk a Parfümvilágban, ahol az illatok és az egyéniség tökéletes harmóniát alkotnak!</p>
      </div>

      <div className="container my-5" id="about-section">
        {/* Kik vagyunk? */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Parfümvilág csapat"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6 order-md-1">
            <div className="perfume-card p-4">
              <h2 className="perfume-card-title">Kik vagyunk?</h2>
              <p className="perfume-card-text">
                A Parfümvilág nem csupán egy webshop, hanem egy egyedülálló platform, amely összegyűjti és
                összehasonlítja a legjobb online parfümkínálatokat. Küldetésünk, hogy időt és energiát spóroljunk
                neked, miközben a legmegfelelőbb illatot választod.
              </p>
            </div>
          </div>
        </div>

        {/* Miben segíthetünk? */}
        <div className="row mb-5">
          <div className="col-12 text-center mb-4">
            <h2>Miben segíthetünk?</h2>
          </div>
          <div className="col-md-4">
            <div className="perfume-card text-center p-4">
              <i className="fas fa-list-ul fa-2x mb-3" style={{ color: '#6200ea' }}></i>
              <h5 className="perfume-card-title">Kategóriák szerinti böngészés</h5>
              <p className="perfume-card-text">
                Navigálj könnyedén különböző márkák és illatcsoportok között.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="perfume-card text-center p-4">
              <i className="fas fa-balance-scale fa-2x mb-3" style={{ color: '#6200ea' }}></i>
              <h5 className="perfume-card-title">Árak összehasonlítása</h5>
              <p className="perfume-card-text">
                Találd meg a legjobb ajánlatokat különböző boltokból.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="perfume-card text-center p-4">
              <i className="fas fa-star fa-2x mb-3" style={{ color: '#6200ea' }}></i>
              <h5 className="perfume-card-title">Újdonságok és klasszikusok</h5>
              <p className="perfume-card-text">
                Fedezd fel az új illatokat és a timeless klasszikusokat.
              </p>
            </div>
          </div>
        </div>

        {/* Célunk */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Parfüm üvegek"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <div className="perfume-card p-4">
              <h2 className="perfume-card-title">Célunk</h2>
              <p className="perfume-card-text">
                Szeretnénk, hogy mindenki megtalálja a saját, egyedi illatát. Az illatok többet mondanak rólad,
                mint gondolnád – mi pedig itt vagyunk, hogy segítsünk ebben az utazásban.
              </p>
              <a href="/kereses" className="btn btn-primary mt-3">Kezdj keresni most</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;