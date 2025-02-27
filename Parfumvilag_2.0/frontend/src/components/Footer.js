import React from 'react';
import '../style.css';

const Footer = () => {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <h4 className="footer-title">Kapcsolat</h4>
            <div className="contact_link_box">
              <a href="https://maps.google.com/?q=Budapest" target="_blank" className="contact_link">
                <i className="fas fa-map-marker-alt"></i> Budapest
              </a>
              <a href="tel:+123456789" className="contact_link">
                <i className="fas fa-phone-alt"></i> +1 23 456 789
              </a>
              <a href="mailto:parfumvilag.hu" className="contact_link">
                <i className="fas fa-envelope"></i> Parfümvilág.hu
              </a>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <a href="/" className="footer-logo">Parfümvilág</a>
              <p>Keress minket bizalommal! Az alábbi platformokon is elérhetőek vagyunk:</p>
              <div className="footer_social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg" alt="Facebook" className="social-icon" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/twitter.svg" alt="Twitter" className="social-icon" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg" alt="LinkedIn" className="social-icon" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg" alt="Instagram" className="social-icon" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/pinterest.svg" alt="Pinterest" className="social-icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <h4 className="footer-title">Ügyfélszolgálat</h4>
            <p>Minden nap</p>
            <p>10.00 - 20.00</p>
          </div>
        </div>
        <div className="footer-info">
          <p>© {new Date().getFullYear()} Minden jog fenntartva</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;