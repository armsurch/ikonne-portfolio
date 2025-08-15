import React from 'react';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">March 2021 - Present</div>
            <div className="timeline-content">
              <h3>Meter Technician</h3>
              <h4>Enugu Electricity Distribution Company, Enugu</h4>
              <ul>
                <li>Implemented standards for prepaid meter installation</li>
                <li>Directed and supervised technicians to ensure adherence to quality, company policy, and safety standards</li>
                <li>Executed large-scale meter installation projects across multiple states</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-date">October 2015 - April 2016</div>
            <div className="timeline-content">
              <h3>Maintenance Engineer</h3>
              <h4>ChemLab Nig. LTD, Aba</h4>
              <ul>
                <li>Collaborated with engineering teams to resolve electrical issues timely</li>
                <li>Analyzed and troubleshot electrical problems</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-date">September 2016 - September 2017</div>
            <div className="timeline-content">
              <h3>Industrial Training</h3>
              <h4>Enugu Electricity Distribution Company, Aba</h4>
              <ul>
                <li>Assisted in carrying out routine inspections of lines, transformers, and substations</li>
                <li>Learned to identify and troubleshoot faults such as line breaks, blown fuses, etc.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
