import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Working with Ikonne was an absolute pleasure. His attention to detail and technical expertise helped us deliver our project ahead of schedule. The quality of work exceeded our expectations.",
      author: "Sarah Johnson",
      position: "Project Manager",
      company: "TechCorp Solutions",
      rating: 5,
      avatar: "SJ"
    },
    {
      id: 2,
      text: "Ikonne's problem-solving skills are exceptional. He tackled complex challenges with innovative solutions and maintained excellent communication throughout the entire project lifecycle.",
      author: "Michael Chen",
      position: "CTO",
      company: "InnovateLab",
      rating: 5,
      avatar: "MC"
    },
    {
      id: 3,
      text: "The level of professionalism and technical knowledge that Ikonne brings to every project is remarkable. He's a reliable partner who consistently delivers high-quality results.",
      author: "Emily Rodriguez",
      position: "Lead Developer",
      company: "Digital Dynamics",
      rating: 5,
      avatar: "ER"
    },
    {
      id: 4,
      text: "Ikonne's ability to understand complex requirements and translate them into elegant solutions is impressive. His work has significantly improved our system's performance.",
      author: "David Thompson",
      position: "Senior Architect",
      company: "CloudTech Systems",
      rating: 5,
      avatar: "DT"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
        style={{ color: index < rating ? '#fbbf24' : '#d1d5db' }}
      />
    ));
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">
            Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
          </p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                {currentTestimonialData.text}
              </p>
              <div className="testimonial-rating">
                {renderStars(currentTestimonialData.rating)}
              </div>
            </div>
            
            <div className="testimonial-author">
              <div className="author-image">
                <div className="author-avatar">
                  {currentTestimonialData.avatar}
                </div>
              </div>
              <div className="author-info">
                <h4 className="author-name">{currentTestimonialData.author}</h4>
                <p className="author-position">{currentTestimonialData.position}</p>
                <p className="author-company">{currentTestimonialData.company}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button className="control-btn" onClick={prevTestimonial} aria-label="Previous testimonial">
              <FaChevronLeft />
            </button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button className="control-btn" onClick={nextTestimonial} aria-label="Next testimonial">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="testimonials-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;