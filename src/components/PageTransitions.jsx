import React, { useEffect, useState } from 'react';
import './PageTransitions.css';

const PageTransitions = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'skills', 'portfolio', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newSection = entry.target.id;
          if (newSection !== currentSection) {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentSection(newSection);
              setIsTransitioning(false);
            }, 300);
          }
        }
      });
    }, observerOptions);

    sectionElements.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [currentSection]);

  // Add smooth scroll behavior to navigation links
  useEffect(() => {
    const handleNavClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          setIsTransitioning(true);
          
          // Add electrical spark effect during transition
          const sparkEffect = document.createElement('div');
          sparkEffect.className = 'nav-spark-effect';
          document.body.appendChild(sparkEffect);
          
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            setTimeout(() => {
              setIsTransitioning(false);
              document.body.removeChild(sparkEffect);
            }, 800);
          }, 200);
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  return (
    <>
      {/* Section Transition Overlay */}
      <div className={`section-transition-overlay ${isTransitioning ? 'active' : ''}`}>
        <div className="electrical-transition">
          <div className="spark-line spark-line-1"></div>
          <div className="spark-line spark-line-2"></div>
          <div className="spark-line spark-line-3"></div>
          <div className="transition-text">
            {isTransitioning && (
              <span className="loading-text">
                Connecting to {currentSection}...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Section Progress Indicator */}
      <div className="section-progress-indicator">
        <div className="progress-container">
          {['home', 'about', 'experience', 'skills', 'portfolio', 'contact'].map((section, index) => (
            <div
              key={section}
              className={`progress-dot ${currentSection === section ? 'active' : ''}`}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
            >
              <div className="dot-inner"></div>
              <div className="dot-pulse"></div>
              {currentSection === section && (
                <div className="electrical-current"></div>
              )}
            </div>
          ))}
          <div className="progress-line">
            <div 
              className="progress-fill"
              style={{
                height: `${(['home', 'about', 'experience', 'skills', 'portfolio', 'contact'].indexOf(currentSection) + 1) * (100 / 6)}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageTransitions;