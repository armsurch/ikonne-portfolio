import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education & Certifications</h2>
        <div className="education-grid">
          <div className="education-item">
            <div className="education-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>Higher National Diploma (HND)</h3>
            <p>Electrical/Electronics Engineering - Upper Credit</p>
            <p className="education-date">Abia State Polytechnic, Aba | Oct 2019 - Aug 2021</p>
          </div>
          
          <div className="education-item">
            <div className="education-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <h3>National Diploma (ND)</h3>
            <p>Electrical/Electronics Engineering</p>
            <p className="education-date">Abia State Polytechnic, Aba | Jan 2015 - Aug 2017</p>
          </div>
          
          <div className="education-item">
            <div className="education-icon">
              <i className="fas fa-award"></i>
            </div>
            <h3>National Youth Service Corps (NYSC)</h3>
            <p>Completed National Service</p>
            <p className="education-date">November 2023 - November 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
