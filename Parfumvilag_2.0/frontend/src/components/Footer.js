import React from 'react';
import '../style.css';

const Footer = () => {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-title">Kapcsolat</h4>
            <div className="contact_link_box">
              <p className="contact_link">
                <i className="fas fa-map-marker-alt"></i> Budapest
              </p>
              <p className="contact_link">
                <i className="fas fa-phone-alt"></i> +36 123 456 789
              </p>
              <p className="contact_link">
                <i className="fas fa-envelope"></i> parfumvilag.hu
              </p>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Parfümvilág</h4>
            <p>Keress minket bizalommal! Az alábbi platformokon is elérhetőek vagyunk:</p>
            <div className="footer_social">
              <a href="https://facebook.com/parfumvilag" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/parfumvilag" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com/company/parfumvilag" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com/parfumvilag" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://pinterest.com/parfumvilag" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Ügyfélszolgálat</h4>
            <p>Minden nap</p>
            <p>10:00 - 18:00</p>
          </div>
        </div>
        <div className="footer-info text-center">
          <p>© {new Date().getFullYear()} Parfümvilág - Minden jog fenntartva</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;