import React from 'react';
import { FaLinkedin, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
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
          
          <div className="hero-social">
            <p className="social-label">Connect with me:</p>
            <div className="social-links">
              <a href="https://linkedin.com/in/ikonne-kingsley" target="_blank" rel="noopener noreferrer" className="social-link linkedin" title="LinkedIn">
                <span className="social-icon"><FaLinkedin /></span>
                <span className="social-text">LinkedIn</span>
              </a>
              <a href="mailto:chinonsokingsley854@gmail.com" className="social-link email" title="Email">
                <span className="social-icon"><FaEnvelope /></span>
                <span className="social-text">Email</span>
              </a>
              <a href="tel:+2349027021719" className="social-link phone" title="Phone">
                <span className="social-icon"><FaPhone /></span>
                <span className="social-text">Call</span>
              </a>
              <a href="https://wa.me/2349027021719" target="_blank" rel="noopener noreferrer" className="social-link whatsapp" title="WhatsApp">
                <span className="social-icon"><FaWhatsapp /></span>
                <span className="social-text">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
