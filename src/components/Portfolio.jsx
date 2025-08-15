import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaTools, FaLightbulb } from 'react-icons/fa';
import './Portfolio.css';

// Import images
import k1Image from '../assets/k1.jpg';
import k2Image from '../assets/k2.jpg';
import k3Image from '../assets/k3.jpg';
import k4Image from '../assets/k4.jpg';
import k5Image from '../assets/k5.jpg';
import k6Image from '../assets/K6.jpg';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects', icon: FaCode },
    { id: 'circuit', name: 'Circuit Design', icon: FaTools },
    { id: 'system', name: 'System Analysis', icon: FaLightbulb },
    { id: 'installation', name: 'Installations', icon: FaTools }
  ];

  const projects = [
    {
      id: 1,
      title: "Smart Home Automation System",
      category: "circuit",
      description: "Designed and implemented a comprehensive smart home automation system with IoT integration, featuring automated lighting, climate control, and security systems.",
      technologies: ["Arduino", "Raspberry Pi", "IoT Sensors", "Mobile App"],
      image: k1Image,
      githubUrl: "https://github.com/ikonne-kingsley/smart-home",
      liveUrl: null,
      duration: "3 months",
      client: "Private Residence",
      status: "Completed"
    },
    {
      id: 2,
      title: "Industrial Power Distribution Analysis",
      category: "system",
      description: "Conducted comprehensive power system analysis for a manufacturing facility, optimizing power distribution and reducing energy costs by 25%.",
      technologies: ["ETAP", "Power System Analysis", "Load Flow", "Fault Analysis"],
      image: k2Image,
      githubUrl: null,
      liveUrl: null,
      duration: "2 months",
      client: "Manufacturing Corp",
      status: "Completed"
    },
    {
      id: 3,
      title: "Prepaid Meter Installation Project",
      category: "installation",
      description: "Led the installation of 500+ prepaid electricity meters across residential and commercial properties, improving billing accuracy.",
      technologies: ["Smart Meters", "Communication Systems", "Database Management"],
      image: k3Image,
      githubUrl: null,
      liveUrl: null,
      duration: "6 months",
      client: "Electricity Distribution Company",
      status: "Completed"
    },
    {
      id: 4,
      title: "Solar Power System Design",
      category: "circuit",
      description: "Designed a 50kW solar power system for a commercial building, including battery storage and grid-tie capabilities.",
      technologies: ["Solar Panels", "Battery Storage", "Inverters", "Grid-Tie Systems"],
      image: k4Image,
      githubUrl: null,
      liveUrl: null,
      duration: "4 months",
      client: "Commercial Building",
      status: "Completed"
    },
    {
      id: 5,
      title: "Electrical Maintenance Program",
      category: "system",
      description: "Developed and implemented a preventive maintenance program for electrical systems, reducing downtime by 40%.",
      technologies: ["Maintenance Management", "Testing Equipment", "Documentation Systems"],
      image: k5Image,
      githubUrl: null,
      liveUrl: null,
      duration: "Ongoing",
      client: "Industrial Facility",
      status: "Active"
    },
    {
      id: 6,
      title: "Power Quality Improvement Study",
      category: "system",
      description: "Conducted power quality analysis and implemented solutions to reduce harmonic distortion and improve power factor.",
      technologies: ["Power Quality Analyzers", "Harmonic Filters", "Power Factor Correction"],
      image: k6Image,
      githubUrl: null,
      liveUrl: null,
      duration: "3 months",
      client: "Commercial Complex",
      status: "Completed"
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <h2 className="section-title">My Portfolio</h2>
        <p className="section-subtitle">
          Explore my recent projects and engineering solutions
        </p>

        {/* Category Filter */}
        <div className="portfolio-filters">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <IconComponent className="filter-icon" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-actions">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                        <FaGithub />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className={`project-status ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag more">+{project.technologies.length - 3}</span>
                  )}
                </div>

                <div className="project-meta">
                  <span className="project-duration">{project.duration}</span>
                  <span className="project-client">{project.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <FaCode className="no-projects-icon" />
            <h3>No projects found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;