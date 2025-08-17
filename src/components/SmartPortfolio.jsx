import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaRocket, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import './SmartPortfolio.css';

const SmartPortfolio = () => {
  const [visitorInterests, setVisitorInterests] = useState([]);
  const [smartFilters, setSmartFilters] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [smartSuggestions, setSmartSuggestions] = useState([]);

  // Smart project data with enhanced metadata
  const projectsData = {
    'smart-home': {
      title: 'Smart Home Automation',
      keywords: ['iot', 'automation', 'smart', 'home', 'control', 'sensors'],
      industry: 'residential',
      complexity: 'advanced',
      benefits: ['Energy savings up to 30%', 'Enhanced security', 'Convenience', 'Remote monitoring'],
      ideal_for: ['Homeowners', 'Tech enthusiasts', 'Modern families'],
      related_skills: ['IoT', 'Arduino', 'Mobile Apps', 'Sensors']
    },
    'power-distribution': {
      title: 'Industrial Power Distribution',
      keywords: ['industrial', 'power', 'distribution', 'energy', 'efficiency', 'manufacturing'],
      industry: 'industrial',
      complexity: 'expert',
      benefits: ['25% cost reduction', 'Improved reliability', 'System optimization', 'Compliance'],
      ideal_for: ['Manufacturing plants', 'Industrial facilities', 'Energy managers'],
      related_skills: ['ETAP', 'Power Systems', 'Load Analysis', 'Fault Analysis']
    },
    'prepaid-meters': {
      title: 'Prepaid Meter Installation',
      keywords: ['meter', 'prepaid', 'billing', 'installation', 'smart', 'monitoring'],
      industry: 'utility',
      complexity: 'intermediate',
      benefits: ['Accurate billing', 'Remote monitoring', 'Reduced disputes', 'Cost control'],
      ideal_for: ['Utility companies', 'Property managers', 'Landlords'],
      related_skills: ['Smart Meters', 'Communication Systems', 'Database Management']
    },
    'maintenance': {
      title: 'Electrical Maintenance Program',
      keywords: ['maintenance', 'preventive', 'reliability', 'downtime', 'service'],
      industry: 'commercial',
      complexity: 'intermediate',
      benefits: ['40% less downtime', 'Extended equipment life', 'Cost savings', 'Safety'],
      ideal_for: ['Facility managers', 'Industrial plants', 'Commercial buildings'],
      related_skills: ['Maintenance Management', 'Testing Equipment', 'Documentation']
    },
    'power-quality': {
      title: 'Power Quality Improvement',
      keywords: ['power', 'quality', 'harmonics', 'factor', 'improvement', 'analysis'],
      industry: 'commercial',
      complexity: 'advanced',
      benefits: ['Reduced harmonics', 'Better power factor', 'Equipment protection', 'Efficiency'],
      ideal_for: ['Commercial buildings', 'Industrial facilities', 'Data centers'],
      related_skills: ['Power Quality Analysis', 'Harmonic Filters', 'Power Factor Correction']
    }
  };

  // Smart visitor profiling based on scroll behavior
  useEffect(() => {
    const trackVisitorBehavior = () => {
      let timeOnSections = {};
      let scrollDepth = 0;
      let interactionCount = 0;

      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollDepth = Math.max(scrollDepth, scrollPercent);
      };

      const handleClick = (e) => {
        interactionCount++;
        
        // Track clicks on project cards
        if (e.target.closest('.project-card')) {
          const projectCard = e.target.closest('.project-card');
          const projectTitle = projectCard.querySelector('.project-title')?.textContent;
          if (projectTitle) {
            trackInterest(projectTitle);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      document.addEventListener('click', handleClick);

      // Analyze behavior after 30 seconds
      setTimeout(() => {
        analyzeVisitorProfile(scrollDepth, interactionCount);
      }, 30000);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleClick);
      };
    };

    trackVisitorBehavior();
  }, []);

  const trackInterest = (projectTitle) => {
    // Find matching project data
    const projectKey = Object.keys(projectsData).find(key => 
      projectsData[key].title.toLowerCase().includes(projectTitle.toLowerCase())
    );
    
    if (projectKey) {
      const project = projectsData[projectKey];
      setVisitorInterests(prev => [...new Set([...prev, ...project.keywords])]);
    }
  };

  const analyzeVisitorProfile = (scrollDepth, interactions) => {
    const profile = {
      engagement: scrollDepth > 70 ? 'high' : scrollDepth > 40 ? 'medium' : 'low',
      interactions: interactions > 3 ? 'active' : 'passive',
      interests: visitorInterests
    };

    if (profile.engagement === 'high' && profile.interactions === 'active') {
      generateSmartRecommendations(profile);
    }
  };

  const generateSmartRecommendations = (profile) => {
    const recommendations = [];

    // Industry-based recommendations
    if (profile.interests.some(interest => ['home', 'smart', 'automation'].includes(interest))) {
      recommendations.push({
        type: 'project_match',
        title: 'Perfect for Smart Home Projects',
        message: 'Based on your interest in smart home automation, you might also like the power quality improvement project for comprehensive electrical solutions.',
        projects: ['smart-home', 'power-quality']
      });
    }

    if (profile.interests.some(interest => ['industrial', 'power', 'manufacturing'].includes(interest))) {
      recommendations.push({
        type: 'industry_match',
        title: 'Industrial Solutions Expert',
        message: 'I specialize in industrial electrical systems. Let me show you how I can optimize your facility\'s power distribution and maintenance.',
        projects: ['power-distribution', 'maintenance']
      });
    }

    if (recommendations.length > 0) {
      setSmartSuggestions(recommendations);
      setShowRecommendations(true);
    }
  };

  // Smart search functionality
  const handleSmartSearch = (query) => {
    setSearchQuery(query);
    
    if (!query) {
      setSmartFilters([]);
      return;
    }

    const matches = [];
    Object.entries(projectsData).forEach(([key, project]) => {
      const relevanceScore = calculateRelevance(query, project);
      if (relevanceScore > 0) {
        matches.push({
          key,
          project,
          relevance: relevanceScore
        });
      }
    });

    // Sort by relevance
    matches.sort((a, b) => b.relevance - a.relevance);
    setSmartFilters(matches);
  };

  const calculateRelevance = (query, project) => {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Title match (highest weight)
    if (project.title.toLowerCase().includes(queryLower)) score += 10;

    // Keywords match
    project.keywords.forEach(keyword => {
      if (keyword.includes(queryLower)) score += 5;
    });

    // Benefits match
    project.benefits.forEach(benefit => {
      if (benefit.toLowerCase().includes(queryLower)) score += 3;
    });

    // Skills match
    project.related_skills.forEach(skill => {
      if (skill.toLowerCase().includes(queryLower)) score += 2;
    });

    return score;
  };

  // Smart project suggestions based on current selection
  const getRelatedProjects = (currentProject) => {
    const current = projectsData[currentProject];
    if (!current) return [];

    const related = [];
    Object.entries(projectsData).forEach(([key, project]) => {
      if (key === currentProject) return;

      let relationScore = 0;
      
      // Same industry
      if (project.industry === current.industry) relationScore += 3;
      
      // Similar complexity
      if (project.complexity === current.complexity) relationScore += 2;
      
      // Common keywords
      const commonKeywords = project.keywords.filter(k => current.keywords.includes(k));
      relationScore += commonKeywords.length;

      if (relationScore > 2) {
        related.push({ key, project, score: relationScore });
      }
    });

    return related.sort((a, b) => b.score - a.score).slice(0, 2);
  };

  return (
    <div className="smart-portfolio-enhancements">
      {/* Smart Search Bar */}
      <div className="smart-search-container">
        <div className="smart-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search projects by technology, industry, or benefits..."
            value={searchQuery}
            onChange={(e) => handleSmartSearch(e.target.value)}
            className="smart-search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => handleSmartSearch('')}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Smart Search Results */}
        {smartFilters.length > 0 && (
          <div className="smart-search-results">
            <div className="results-header">
              <FaFilter /> Found {smartFilters.length} relevant projects
            </div>
            {smartFilters.map(({ key, project, relevance }) => (
              <div key={key} className="search-result-item">
                <div className="result-content">
                  <h4>{project.title}</h4>
                  <p>Industry: {project.industry} | Complexity: {project.complexity}</p>
                  <div className="result-benefits">
                    {project.benefits.slice(0, 2).map((benefit, index) => (
                      <span key={index} className="benefit-tag">{benefit}</span>
                    ))}
                  </div>
                </div>
                <div className="relevance-score">
                  {Math.round((relevance / 10) * 100)}% match
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Smart Recommendations Modal */}
      {showRecommendations && smartSuggestions.length > 0 && (
        <div className="smart-recommendations-overlay">
          <div className="smart-recommendations-modal">
            <button 
              className="close-recommendations"
              onClick={() => setShowRecommendations(false)}
            >
              <FaTimes />
            </button>

            <div className="recommendations-header">
              <FaLightbulb className="header-icon" />
              <h3>Smart Recommendations</h3>
              <p>Based on your browsing behavior</p>
            </div>

            <div className="recommendations-content">
              {smartSuggestions.map((suggestion, index) => (
                <div key={index} className="recommendation-item">
                  <h4>{suggestion.title}</h4>
                  <p>{suggestion.message}</p>
                  
                  <div className="recommended-projects">
                    {suggestion.projects.map(projectKey => {
                      const project = projectsData[projectKey];
                      return (
                        <div key={projectKey} className="mini-project-card">
                          <h5>{project.title}</h5>
                          <div className="mini-benefits">
                            {project.benefits.slice(0, 2).map((benefit, i) => (
                              <span key={i} className="mini-benefit">{benefit}</span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button 
                    className="view-projects-btn"
                    onClick={() => {
                      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
                      setShowRecommendations(false);
                    }}
                  >
                    <FaRocket /> View These Projects
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Smart Project Insights (can be added to individual project cards) */}
      <div className="smart-insights-data" style={{ display: 'none' }}>
        {JSON.stringify(projectsData)}
      </div>
    </div>
  );
};

export default SmartPortfolio;