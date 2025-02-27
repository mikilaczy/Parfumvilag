import React from "react";

const Footer = () => {
  return (
    <section className="footer_section">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Kapcsolat</h4>
            <div className="contact_link_box">
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
          </div>
          <div className="footer-col">
            <h4>Kövess minket</h4>
            <div className="footer_social">
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
          </div>
          <div className="footer-col">
            <h4>Ügyfélszolgálat</h4>
            <p>Minden nap</p>
            <p>10.00 - 20.00</p>
          </div>
        </div>
        <hr className="footer_placeholder" />
        <p>&copy; Minden jog fenntartva</p>
      </div>
    </section>
  );
};

export default Footer;
