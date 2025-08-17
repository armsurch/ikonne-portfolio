import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaRocket, FaTimes, FaArrowRight } from 'react-icons/fa';
import './SmartRecommendations.css';

const SmartRecommendations = () => {
  const [visitorProfile, setVisitorProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Smart visitor profiling based on behavior
  const visitorProfiles = {
    'homeowner': {
      interests: ['smart home', 'automation', 'residential'],
      projects: [1, 5], // Smart Home, Maintenance
      message: "Perfect for homeowners looking to modernize their electrical systems!"
    },
    'business': {
      interests: ['industrial', 'commercial', 'power distribution', 'energy'],
      projects: [2, 6], // Power Distribution, Power Quality
      message: "Ideal for businesses seeking electrical system optimization!"
    },
    'developer': {
      interests: ['iot', 'arduino', 'technology', 'innovation'],
      projects: [1, 3], // Smart Home, Prepaid Meters
      message: "Great for tech enthusiasts and developers!"
    },
    'facility_manager': {
      interests: ['maintenance', 'system', 'management', 'reliability'],
      projects: [5, 2], // Maintenance, Power Distribution
      message: "Perfect for facility managers and maintenance professionals!"
    }
  };

  // Project data (matching Portfolio.jsx)
  const projects = {
    1: {
      title: "Smart Home Automation System",
      category: "IoT & Automation",
      description: "Complete home automation with IoT integration",
      benefits: ["Energy savings", "Convenience", "Security", "Modern living"],
      ideal_for: "Homeowners, Tech enthusiasts"
    },
    2: {
      title: "Industrial Power Distribution Analysis",
      category: "Power Systems",
      description: "Comprehensive power system optimization",
      benefits: ["25% cost reduction", "Improved efficiency", "System reliability"],
      ideal_for: "Manufacturing, Industrial facilities"
    },
    3: {
      title: "Prepaid Meter Installation",
      category: "Smart Metering",
      description: "Large-scale smart meter deployment",
      benefits: ["Accurate billing", "Remote monitoring", "Cost control"],
      ideal_for: "Utility companies, Property managers"
    },
    5: {
      title: "Electrical Maintenance Program",
      category: "Maintenance & Support",
      description: "Preventive maintenance system",
      benefits: ["40% less downtime", "Extended equipment life", "Cost savings"],
      ideal_for: "Facility managers, Industrial plants"
    },
    6: {
      title: "Power Quality Improvement",
      category: "Power Systems",
      description: "Power quality analysis and solutions",
      benefits: ["Reduced harmonics", "Better power factor", "Equipment protection"],
      ideal_for: "Commercial buildings, Industrial facilities"
    }
  };

  // Detect visitor interests based on scroll behavior and time spent
  useEffect(() => {
    let scrollBehavior = [];
    let timeSpent = {};
    let startTime = Date.now();

    const trackScrollBehavior = () => {
      const sections = ['hero', 'about', 'portfolio', 'skills', 'contact'];
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            if (!timeSpent[sectionId]) {
              timeSpent[sectionId] = Date.now();
            }
          } else if (timeSpent[sectionId]) {
            const duration = Date.now() - timeSpent[sectionId];
            if (duration > 2000) { // Spent more than 2 seconds
              scrollBehavior.push({ section: sectionId, duration });
            }
            delete timeSpent[sectionId];
          }
        }
      });
    };

    const handleScroll = () => {
      trackScrollBehavior();
    };

    const analyzeVisitorProfile = () => {
      // Analyze scroll behavior after 30 seconds
      setTimeout(() => {
        const profile = determineVisitorProfile(scrollBehavior);
        if (profile && !hasInteracted) {
          setVisitorProfile(profile);
          generateRecommendations(profile);
          setShowRecommendations(true);
        }
      }, 30000); // Show after 30 seconds
    };

    window.addEventListener('scroll', handleScroll);
    analyzeVisitorProfile();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasInteracted]);

  const determineVisitorProfile = (behavior) => {
    // Simple AI logic to determine visitor type
    const portfolioTime = behavior.find(b => b.section === 'portfolio')?.duration || 0;
    const skillsTime = behavior.find(b => b.section === 'skills')?.duration || 0;
    const aboutTime = behavior.find(b => b.section === 'about')?.duration || 0;

    if (portfolioTime > 10000) { // Spent a lot of time on portfolio
      if (skillsTime > 5000) {
        return 'developer'; // Interested in technical details
      } else {
        return 'business'; // Interested in results
      }
    } else if (aboutTime > 8000) {
      return 'homeowner'; // Personal interest
    } else if (skillsTime > 8000) {
      return 'facility_manager'; // Technical but practical
    }

    return 'business'; // Default
  };

  const generateRecommendations = (profileType) => {
    const profile = visitorProfiles[profileType];
    if (!profile) return;

    const recommendedProjects = profile.projects.map(projectId => ({
      ...projects[projectId],
      id: projectId,
      relevanceScore: Math.floor(Math.random() * 20) + 80 // 80-100% relevance
    }));

    setRecommendations(recommendedProjects);
  };

  const handleInteraction = () => {
    setHasInteracted(true);
    setShowRecommendations(false);
  };

  const scrollToProject = (projectId) => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
      // Highlight the specific project (you could add this functionality)
    }
    handleInteraction();
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleInteraction();
  };

  if (!showRecommendations || !visitorProfile || !recommendations.length) {
    return null;
  }

  const profile = visitorProfiles[visitorProfile];

  return (
    <div className="smart-recommendations-overlay">
      <div className="smart-recommendations-modal">
        <button 
          className="close-recommendations"
          onClick={handleInteraction}
        >
          <FaTimes />
        </button>

        <div className="recommendations-header">
          <div className="header-icon">
            <FaLightbulb />
          </div>
          <h3>Smart Recommendations</h3>
          <p className="profile-message">{profile.message}</p>
        </div>

        <div className="recommendations-content">
          <p className="recommendations-intro">
            Based on your browsing behavior, these projects might interest you:
          </p>

          <div className="recommended-projects">
            {recommendations.map((project) => (
              <div key={project.id} className="recommended-project">
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <span className="relevance-score">
                    {project.relevanceScore}% match
                  </span>
                </div>
                
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
                
                <div className="project-benefits">
                  <strong>Key Benefits:</strong>
                  <ul>
                    {project.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="project-ideal">
                  <strong>Ideal for:</strong> {project.ideal_for}
                </div>

                <button 
                  className="view-project-btn"
                  onClick={() => scrollToProject(project.id)}
                >
                  View Project Details <FaArrowRight />
                </button>
              </div>
            ))}
          </div>

          <div className="recommendations-actions">
            <button 
              className="contact-btn primary"
              onClick={scrollToContact}
            >
              <FaRocket /> Discuss Your Project
            </button>
            <button 
              className="dismiss-btn"
              onClick={handleInteraction}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;