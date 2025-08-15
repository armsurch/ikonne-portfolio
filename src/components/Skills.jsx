import React from 'react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          Comprehensive technical and professional skills developed through years of experience in electrical engineering
        </p>
        
        <div className="skills-grid">
          <div className="skill-category">
            <div className="category-header">
              <h3>Technical Skills</h3>
              <p className="category-description">Core engineering and technical competencies</p>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">Circuit Design</span>
              <span className="skill-tag">System Analysis</span>
              <span className="skill-tag">Troubleshooting</span>
              <span className="skill-tag">Prepaid Meter Installation</span>
              <span className="skill-tag">Power Distribution Systems</span>
              <span className="skill-tag">Electrical Safety Standards</span>
            </div>
          </div>
          
          <div className="skill-category">
            <div className="category-header">
              <h3>Professional Skills</h3>
              <p className="category-description">Soft skills and professional competencies</p>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">Problem-Solving</span>
              <span className="skill-tag">Team Collaboration</span>
              <span className="skill-tag">Communication</span>
              <span className="skill-tag">Project Management</span>
              <span className="skill-tag">Leadership</span>
              <span className="skill-tag">Client Relations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
