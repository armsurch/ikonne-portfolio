import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Ikonne Kingsley Chinonso
          </h1>
          <p className="hero-subtitle">
            Experienced Electrical Engineer
          </p>
          <p className="hero-description">
            Specializing in electrical systems design, maintenance, and implementation with expertise in prepaid meter installation and power distribution systems.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="tel:+2349027021719" className="btn btn-secondary">Call Now</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
