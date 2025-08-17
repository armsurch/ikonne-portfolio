import React, { useState, useEffect } from 'react';
import { FaBolt } from 'react-icons/fa';
import './ElectricalLoader.css';

const ElectricalLoader = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simple loading simulation
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadComplete) onLoadComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="electrical-loader">
      <div className="loader-content">
        <div className="loader-logo">
          <FaBolt className="main-logo-icon" />
          <h1>Ikonne Kingsley</h1>
          <p>Electrical Engineer</p>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="progress-text">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalLoader;