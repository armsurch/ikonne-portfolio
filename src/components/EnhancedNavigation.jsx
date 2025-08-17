import React, { useState, useEffect } from 'react';
import { FaBolt, FaHome, FaUser, FaBriefcase, FaCogs, FaFolderOpen, FaEnvelope } from 'react-icons/fa';
import './EnhancedNavigation.css';

const EnhancedNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'about', label: 'About', icon: FaUser },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'skills', label: 'Skills', icon: FaCogs },
    { id: 'portfolio', label: 'Portfolio', icon: FaFolderOpen },
    { id: 'contact', label: 'Contact', icon: FaEnvelope }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
        offset: 0
      }));

      sections.forEach(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          section.offset = Math.abs(rect.top);
        }
      });

      const closestSection = sections.reduce((prev, current) => 
        current.offset < prev.offset ? current : prev
      );

      if (closestSection.id !== activeSection) {
        setActiveSection(closestSection.id);
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeSection, navItems]);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add electrical spark effect
      const spark = document.createElement('div');
      spark.className = 'nav-click-spark';
      spark.style.left = mousePosition.x + 'px';
      spark.style.top = mousePosition.y + 'px';
      document.body.appendChild(spark);

      setTimeout(() => {
        document.body.removeChild(spark);
      }, 1000);

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Enhanced Navigation Bar */}
      <nav className={`enhanced-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo with electrical effect */}
          <div className="nav-logo">
            <FaBolt className="logo-icon" />
            <span className="logo-text">Ikonne</span>
            <div className="logo-spark"></div>
          </div>

          {/* Navigation Items */}
          <ul className="nav-items">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <IconComponent className="nav-icon" />
                    <span className="nav-text">{item.label}</span>
                    <div className="nav-electrical-effect">
                      <div className="electrical-line"></div>
                      <div className="electrical-spark-1"></div>
                      <div className="electrical-spark-2"></div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="electrical-hamburger-effect"></div>
          </div>
        </div>

        {/* Navigation Background Effects */}
        <div className="nav-bg-effects">
          <div className="circuit-pattern"></div>
          <div className="electrical-flow"></div>
        </div>
      </nav>

      {/* Floating Action Button for Quick Contact */}
      <div className="floating-contact-btn">
        <button 
          className="fab-btn"
          onClick={() => handleNavClick('contact')}
          title="Quick Contact"
        >
          <FaBolt className="fab-icon" />
          <div className="fab-ripple"></div>
          <div className="fab-electrical-ring"></div>
        </button>
      </div>

      {/* Click Spark Effect Styles */}
      <style jsx>{`
        .nav-click-spark {
          position: fixed;
          width: 20px;
          height: 20px;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
        }
        
        .nav-click-spark::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle, #00ffff 0%, transparent 70%);
          border-radius: 50%;
          animation: sparkExplosion 1s ease-out forwards;
        }
        
        @keyframes sparkExplosion {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(2);
            opacity: 0.8;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedNavigation;