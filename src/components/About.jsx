import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="image-container">
              <div className="profile-image">
                <img src="./src/assets/IK.jpg" alt="Ikonne Kingsley - Electrical Engineer" />
              </div>
              <div className="image-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
              </div>
            </div>
          </div>
          
          <div className="about-details">
            <div className="about-text">
              <p>
                I am an experienced Electrical Engineer with a strong background in designing, maintaining, and implementing electrical systems. My expertise spans circuit design, system analysis, and troubleshooting, with specialized knowledge in prepaid meter installation and power distribution systems.
              </p>
              <p>
                I am proficient in using advanced tools for simulation and diagnostics, committed to delivering efficient, reliable solutions while ensuring compliance with industry standards and safety regulations.
              </p>
            </div>
            <div className="about-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <div className="info-label">Location</div>
                  <div className="info-value">Enugu, Enugu State</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div className="info-content">
                  <div className="info-label">Email</div>
                  <div className="info-value">chinonsokingsley854@gmail.com</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <div className="info-label">Phone</div>
                  <div className="info-value">08137890365</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⚡</div>
                <div className="info-content">
                  <div className="info-label">Profession</div>
                  <div className="info-value">Electrical Engineer</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
