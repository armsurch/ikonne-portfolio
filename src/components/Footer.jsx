import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Ikonne Kingsley Chinonso</h3>
            <p>Electrical Engineer & Power Systems Specialist</p>
            <p>Enugu, Nigeria</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
