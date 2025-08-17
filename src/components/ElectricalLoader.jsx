import React, { useState, useEffect } from 'react';
import { FaBolt, FaCog, FaCircuitBoard } from 'react-icons/fa';
import './ElectricalLoader.css';

const ElectricalLoader = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('initializing');
  const [isVisible, setIsVisible] = useState(true);

  const loadingStages = [
    { stage: 'initializing', text: 'Initializing Systems...', duration: 1000 },
    { stage: 'connecting', text: 'Connecting Circuits...', duration: 1200 },
    { stage: 'powering', text: 'Powering Up Components...', duration: 1000 },
    { stage: 'calibrating', text: 'Calibrating Instruments...', duration: 800 },
    { stage: 'finalizing', text: 'Finalizing Setup...', duration: 600 },
    { stage: 'complete', text: 'System Ready!', duration: 400 }
  ];

  useEffect(() => {
    let currentStageIndex = 0;
    let progressInterval;
    let stageTimeout;

    const runLoadingSequence = () => {
      if (currentStageIndex >= loadingStages.length) {
        // Loading complete
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            if (onLoadComplete) onLoadComplete();
          }, 500);
        }, 500);
        return;
      }

      const currentStage = loadingStages[currentStageIndex];
      setLoadingStage(currentStage.stage);

      // Animate progress for current stage
      const startProgress = (currentStageIndex / loadingStages.length) * 100;
      const endProgress = ((currentStageIndex + 1) / loadingStages.length) * 100;
      const progressStep = (endProgress - startProgress) / (currentStage.duration / 50);
      let currentProgress = startProgress;

      progressInterval = setInterval(() => {
        currentProgress += progressStep;
        if (currentProgress >= endProgress) {
          currentProgress = endProgress;
          clearInterval(progressInterval);
        }
        setLoadingProgress(Math.min(currentProgress, 100));
      }, 50);

      // Move to next stage
      stageTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        currentStageIndex++;
        runLoadingSequence();
      }, currentStage.duration);
    };

    // Start loading sequence after a brief delay
    const initialDelay = setTimeout(() => {
      runLoadingSequence();
    }, 500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(stageTimeout);
      clearInterval(progressInterval);
    };
  }, [onLoadComplete]);

  const getStageIcon = () => {
    switch (loadingStage) {
      case 'initializing':
        return <FaCog className="stage-icon rotating" />;
      case 'connecting':
        return <FaCircuitBoard className="stage-icon pulsing" />;
      case 'powering':
        return <FaBolt className="stage-icon sparking" />;
      case 'calibrating':
        return <FaCog className="stage-icon oscillating" />;
      case 'finalizing':
        return <FaCircuitBoard className="stage-icon glowing" />;
      case 'complete':
        return <FaBolt className="stage-icon success" />;
      default:
        return <FaBolt className="stage-icon" />;
    }
  };

  const getStageText = () => {
    const stage = loadingStages.find(s => s.stage === loadingStage);
    return stage ? stage.text : 'Loading...';
  };

  if (!isVisible) return null;

  return (
    <div className={`electrical-loader ${!isVisible ? 'fade-out' : ''}`}>
      {/* Background Circuit Animation */}
      <div className="loader-background">
        <div className="circuit-grid">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`circuit-line circuit-line-${i % 4}`}></div>
          ))}
        </div>
        <div className="electrical-sparks">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className={`spark spark-${i}`}></div>
          ))}
        </div>
      </div>

      {/* Main Loader Content */}
      <div className="loader-content">
        {/* Logo Section */}
        <div className="loader-logo">
          <div className="logo-container">
            <FaBolt className="main-logo-icon" />
            <div className="logo-text">
              <h1>Ikonne Kingsley</h1>
              <p>Electrical Engineer</p>
            </div>
          </div>
          <div className="logo-electrical-effect">
            <div className="electrical-ring ring-1"></div>
            <div className="electrical-ring ring-2"></div>
            <div className="electrical-ring ring-3"></div>
          </div>
        </div>

        {/* Loading Stage Indicator */}
        <div className="loading-stage">
          <div className="stage-icon-container">
            {getStageIcon()}
          </div>
          <div className="stage-text">
            {getStageText()}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${loadingProgress}%` }}
            >
              <div className="progress-spark"></div>
            </div>
          </div>
          <div className="progress-text">
            {Math.round(loadingProgress)}%
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="system-status">
          <div className={`status-item ${loadingProgress > 20 ? 'active' : ''}`}>
            <div className="status-dot"></div>
            <span>Power Systems</span>
          </div>
          <div className={`status-item ${loadingProgress > 40 ? 'active' : ''}`}>
            <div className="status-dot"></div>
            <span>Control Circuits</span>
          </div>
          <div className={`status-item ${loadingProgress > 60 ? 'active' : ''}`}>
            <div className="status-dot"></div>
            <span>Interface Ready</span>
          </div>
          <div className={`status-item ${loadingProgress > 80 ? 'active' : ''}`}>
            <div className="status-dot"></div>
            <span>All Systems Go</span>
          </div>
        </div>
      </div>

      {/* Loading Particles */}
      <div className="loading-particles">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>
    </div>
  );
};

export default ElectricalLoader;