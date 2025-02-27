import React from "react";

const About = () => {
  return (
    <div className="container">
      <h1>Rólunk</h1>
      <p>
        Üdvözlünk a Parfümvilágban, ahol az illatok és az egyéniség tökéletes
        harmóniát alkotnak!
      </p>
      <h2>Kik vagyunk?</h2>
      <p>
        A Parfümvilág nem csupán egy webshop, hanem egy egyedülálló platform,
        amely összegyűjti és összehasonlítja a legjobb online parfümkínálatokat.
        Küldetésünk, hogy időt és energiát spóroljunk neked, miközben a
        legmegfelelőbb illatot választod.
      </p>
      <h2>Miben segíthetünk?</h2>
      <p>
        <strong>Kategóriák szerinti böngészés:</strong> Navigálj könnyedén
        különböző márkák és illatcsoportok között.
      </p>
      <p>
        <strong>Árak összehasonlítása:</strong> Találd meg a legjobb ajánlatokat
        különböző boltokból.
      </p>
      <p>
        <strong>Újdonságok és klasszikusok:</strong> Fedezd fel az új illatokat
        és a timeless klasszikusokat.
      </p>
      <h2>Célunk</h2>
      <p>
        Szeretnénk, hogy mindenki megtalálja a saját, egyedi illatát. Az illatok
        többet mondanak rólad, mint gondolnád – mi pedig itt vagyunk, hogy
        segítsünk ebben az utazásban.
      </p>
      <h2>Kezdj keresni most</h2>
      <button className="btn btn-primary">Keresés indítása</button>
      <div className="contact_link_box mt-3">
        <a href="#" className="contact_link">
          <i className="fas fa-map-marker-alt"></i>
          Budapest
        </a>
        <a href="#" className="contact_link">
          <i className="fas fa-phone-alt"></i>
          +1 23 456 789
        </a>
        <a href="#" className="contact_link">
          <i className="fas fa-envelope"></i>
          Parfümvilág.hu
        </a>
      </div>
      <div className="footer_social mt-3">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg"
            alt="Facebook"
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/twitter.svg"
            alt="Twitter"
          />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg"
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg"
            alt="Instagram"
          />
        </a>
        <a
          href="https://www.pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/pinterest.svg"
            alt="Pinterest"
          />
        </a>
      </div>
      <div className="footer-info mt-3">
        <p>Ügyfélszolgálat</p>
        <p>Minden nap</p>
        <p>10.00 - 20.00</p>
      </div>
      <div className="footer-placeholder mt-3">© Minden jog fenntartva</div>
    </div>
  );
};

export default About;
