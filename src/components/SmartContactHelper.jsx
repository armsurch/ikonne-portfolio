import React, { useState, useEffect } from 'react';
import { FaRobot, FaLightbulb, FaTimes, FaCheck } from 'react-icons/fa';
import './SmartContactHelper.css';

const SmartContactHelper = ({ formData, onSuggestionApply }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showHelper, setShowHelper] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState([]);

  // Smart analysis of form data
  useEffect(() => {
    if (formData.message && formData.message.length > 20) {
      const newSuggestions = analyzeFormData(formData);
      setSuggestions(newSuggestions);
      setShowHelper(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowHelper(false);
    }
  }, [formData]);

  const analyzeFormData = (data) => {
    const suggestions = [];
    const message = data.message.toLowerCase();

    // Project type detection
    const projectTypes = {
      'Smart Home': {
        keywords: ['smart home', 'automation', 'iot', 'smart lights', 'home control'],
        description: 'IoT-based home automation systems'
      },
      'Power Distribution': {
        keywords: ['power', 'distribution', 'industrial', 'factory', 'manufacturing'],
        description: 'Industrial power system design and optimization'
      },
      'Circuit Design': {
        keywords: ['circuit', 'pcb', 'design', 'electronics', 'schematic'],
        description: 'Custom circuit design and PCB layout'
      },
      'Meter Installation': {
        keywords: ['meter', 'prepaid', 'installation', 'billing', 'smart meter'],
        description: 'Smart meter installation and management'
      },
      'System Analysis': {
        keywords: ['analysis', 'troubleshoot', 'maintenance', 'repair', 'diagnose'],
        description: 'Electrical system analysis and maintenance'
      }
    };

    // Auto-detect project type
    if (!data.projectType) {
      for (const [type, info] of Object.entries(projectTypes)) {
        if (info.keywords.some(keyword => message.includes(keyword))) {
          suggestions.push({
            id: `project-type-${type}`,
            type: 'project_type',
            title: 'Project Type Detected',
            message: `This sounds like a ${type} project. ${info.description}`,
            action: 'set_project_type',
            value: type,
            confidence: 85
          });
          break;
        }
      }
    }

    // Budget estimation
    const budgetKeywords = ['budget', 'cost', 'price', 'expensive', 'cheap', 'affordable'];
    if (budgetKeywords.some(keyword => message.includes(keyword))) {
      suggestions.push({
        id: 'budget-info',
        type: 'information',
        title: 'Budget Information',
        message: 'Typical project costs: Simple projects (₦50K-150K), Complex systems (₦200K-500K), Large installations (₦500K+)',
        action: 'info',
        confidence: 90
      });
    }

    // Timeline detection
    const urgencyKeywords = ['urgent', 'asap', 'quickly', 'rush', 'emergency'];
    const timelineKeywords = ['when', 'timeline', 'schedule', 'deadline', 'how long'];
    
    if (urgencyKeywords.some(keyword => message.includes(keyword))) {
      suggestions.push({
        id: 'urgency-response',
        type: 'timeline',
        title: 'Urgent Project Detected',
        message: 'For urgent projects, I typically respond within 2-4 hours and can prioritize your work.',
        action: 'info',
        confidence: 95
      });
    } else if (timelineKeywords.some(keyword => message.includes(keyword))) {
      suggestions.push({
        id: 'timeline-info',
        type: 'timeline',
        title: 'Timeline Information',
        message: 'Typical timelines: Simple projects (1-2 weeks), Complex systems (3-6 weeks), Large installations (2-3 months)',
        action: 'info',
        confidence: 85
      });
    }

    // Contact preference
    const contactKeywords = ['call', 'phone', 'whatsapp', 'meeting', 'discuss'];
    if (contactKeywords.some(keyword => message.includes(keyword))) {
      suggestions.push({
        id: 'contact-preference',
        type: 'contact',
        title: 'Preferred Contact Method',
        message: 'I can call you directly or we can discuss via WhatsApp. Phone consultations are often more efficient for complex projects.',
        action: 'info',
        confidence: 80
      });
    }

    // Location-based suggestions
    const locationKeywords = ['enugu', 'southeast', 'nigeria', 'local', 'visit', 'site'];
    if (locationKeywords.some(keyword => message.includes(keyword))) {
      suggestions.push({
        id: 'location-info',
        type: 'location',
        title: 'Location Services',
        message: 'I\'m based in Enugu and can provide on-site consultations throughout Southeast Nigeria.',
        action: 'info',
        confidence: 90
      });
    }

    // Technical complexity assessment
    const complexKeywords = ['complex', 'advanced', 'sophisticated', 'enterprise', 'large scale'];
    const simpleKeywords = ['simple', 'basic', 'small', 'residential', 'home'];
    
    if (complexKeywords.some(keyword => message.includes(keyword))) {
      suggestions.push({
        id: 'complexity-complex',
        type: 'complexity',
        title: 'Complex Project Detected',
        message: 'For complex projects, I recommend starting with a detailed consultation to understand all requirements and provide accurate estimates.',
        action: 'info',
        confidence: 85
      });
    } else if (simpleKeywords.some(keyword => message.includes(keyword))) {
      suggestions.push({
        id: 'complexity-simple',
        type: 'complexity',
        title: 'Straightforward Project',
        message: 'This seems like a straightforward project. I can often provide quick estimates and faster turnaround times.',
        action: 'info',
        confidence: 80
      });
    }

    return suggestions.filter(s => !appliedSuggestions.includes(s.id));
  };

  const applySuggestion = (suggestion) => {
    if (suggestion.action === 'set_project_type') {
      onSuggestionApply('projectType', suggestion.value);
    }
    
    setAppliedSuggestions(prev => [...prev, suggestion.id]);
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  const dismissSuggestion = (suggestionId) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'project_type': return '🎯';
      case 'information': return '💡';
      case 'timeline': return '⏰';
      case 'contact': return '📞';
      case 'location': return '📍';
      case 'complexity': return '⚙️';
      default: return '🤖';
    }
  };

  const getSuggestionColor = (confidence) => {
    if (confidence >= 90) return 'high';
    if (confidence >= 80) return 'medium';
    return 'low';
  };

  if (!showHelper || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="smart-contact-helper">
      <div className="helper-header">
        <div className="helper-title">
          <FaRobot className="helper-icon" />
          <span>Smart Suggestions</span>
        </div>
        <button 
          className="close-helper"
          onClick={() => setShowHelper(false)}
        >
          <FaTimes />
        </button>
      </div>

      <div className="suggestions-container">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className={`suggestion-card ${getSuggestionColor(suggestion.confidence)}`}
          >
            <div className="suggestion-header">
              <span className="suggestion-emoji">
                {getSuggestionIcon(suggestion.type)}
              </span>
              <div className="suggestion-info">
                <h4>{suggestion.title}</h4>
                <div className="confidence-badge">
                  {suggestion.confidence}% confident
                </div>
              </div>
            </div>

            <p className="suggestion-message">{suggestion.message}</p>

            <div className="suggestion-actions">
              {suggestion.action === 'set_project_type' && (
                <button 
                  className="apply-btn"
                  onClick={() => applySuggestion(suggestion)}
                >
                  <FaCheck /> Set Project Type
                </button>
              )}
              
              {suggestion.action === 'info' && (
                <button 
                  className="acknowledge-btn"
                  onClick={() => applySuggestion(suggestion)}
                >
                  <FaCheck /> Got it
                </button>
              )}

              <button 
                className="dismiss-btn"
                onClick={() => dismissSuggestion(suggestion.id)}
              >
                <FaTimes /> Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="helper-footer">
        <p>💡 These suggestions are based on AI analysis of your message</p>
      </div>
    </div>
  );
};

export default SmartContactHelper;