import React, { useState, useEffect } from 'react';
import { FaEye, FaClock, FaMousePointer, FaChartLine } from 'react-icons/fa';
import './VisitorInsights.css';

const VisitorInsights = () => {
  const [insights, setInsights] = useState({
    timeOnSite: 0,
    sectionsViewed: [],
    scrollDepth: 0,
    interactions: 0,
    interests: []
  });
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    let startTime = Date.now();
    let maxScrollDepth = 0;
    let interactionCount = 0;
    let sectionsViewed = new Set();
    let sectionTimes = {};

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);

      // Track which sections are being viewed
      const sections = ['hero', 'about', 'experience', 'skills', 'portfolio', 'contact'];
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            sectionsViewed.add(sectionId);
            if (!sectionTimes[sectionId]) {
              sectionTimes[sectionId] = Date.now();
            }
          }
        }
      });

      updateInsights();
    };

    // Track interactions
    const handleInteraction = (e) => {
      interactionCount++;
      
      // Track specific interests based on clicks
      const target = e.target.closest('[data-interest]');
      if (target) {
        const interest = target.getAttribute('data-interest');
        setInsights(prev => ({
          ...prev,
          interests: [...new Set([...prev.interests, interest])]
        }));
      }
      
      updateInsights();
    };

    const updateInsights = () => {
      const timeOnSite = Math.round((Date.now() - startTime) / 1000);
      
      setInsights(prev => ({
        ...prev,
        timeOnSite,
        sectionsViewed: Array.from(sectionsViewed),
        scrollDepth: maxScrollDepth,
        interactions: interactionCount
      }));
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleInteraction);
    document.addEventListener('mouseover', handleInteraction);

    // Update insights every 5 seconds
    const interval = setInterval(updateInsights, 5000);

    // Show insights after 30 seconds
    const showTimer = setTimeout(() => {
      if (insights.timeOnSite > 30 || insights.scrollDepth > 50) {
        setShowInsights(true);
      }
    }, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('mouseover', handleInteraction);
      clearInterval(interval);
      clearTimeout(showTimer);
    };
  }, []);

  const getEngagementLevel = () => {
    const { timeOnSite, scrollDepth, interactions, sectionsViewed } = insights;
    
    let score = 0;
    if (timeOnSite > 60) score += 2;
    if (timeOnSite > 120) score += 2;
    if (scrollDepth > 50) score += 2;
    if (scrollDepth > 80) score += 2;
    if (interactions > 5) score += 2;
    if (sectionsViewed.length > 3) score += 2;

    if (score >= 8) return { level: 'High', color: '#4CAF50', message: 'Highly engaged visitor!' };
    if (score >= 5) return { level: 'Medium', color: '#FF9800', message: 'Moderately engaged' };
    return { level: 'Low', color: '#2196F3', message: 'Just browsing' };
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getSectionName = (sectionId) => {
    const names = {
      hero: 'Home',
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      portfolio: 'Portfolio',
      contact: 'Contact'
    };
    return names[sectionId] || sectionId;
  };

  const engagement = getEngagementLevel();

  // Only show for development/admin purposes
  if (!showInsights && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="visitor-insights">
      <div className="insights-header">
        <h4>Visitor Insights</h4>
        <div 
          className="engagement-badge"
          style={{ backgroundColor: engagement.color }}
        >
          {engagement.level}
        </div>
      </div>

      <div className="insights-grid">
        <div className="insight-item">
          <FaClock className="insight-icon" />
          <div className="insight-content">
            <span className="insight-label">Time on Site</span>
            <span className="insight-value">{formatTime(insights.timeOnSite)}</span>
          </div>
        </div>

        <div className="insight-item">
          <FaChartLine className="insight-icon" />
          <div className="insight-content">
            <span className="insight-label">Scroll Depth</span>
            <span className="insight-value">{insights.scrollDepth}%</span>
          </div>
        </div>

        <div className="insight-item">
          <FaMousePointer className="insight-icon" />
          <div className="insight-content">
            <span className="insight-label">Interactions</span>
            <span className="insight-value">{insights.interactions}</span>
          </div>
        </div>

        <div className="insight-item">
          <FaEye className="insight-icon" />
          <div className="insight-content">
            <span className="insight-label">Sections Viewed</span>
            <span className="insight-value">{insights.sectionsViewed.length}/6</span>
          </div>
        </div>
      </div>

      {insights.sectionsViewed.length > 0 && (
        <div className="sections-viewed">
          <h5>Sections Explored:</h5>
          <div className="section-tags">
            {insights.sectionsViewed.map(section => (
              <span key={section} className="section-tag">
                {getSectionName(section)}
              </span>
            ))}
          </div>
        </div>
      )}

      {insights.interests.length > 0 && (
        <div className="interests-detected">
          <h5>Interests Detected:</h5>
          <div className="interest-tags">
            {insights.interests.map(interest => (
              <span key={interest} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="insights-footer">
        <p>{engagement.message}</p>
      </div>
    </div>
  );
};

export default VisitorInsights;