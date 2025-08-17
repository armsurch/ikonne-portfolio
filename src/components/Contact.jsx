import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaLinkedin, 
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaYoutube,
  FaDiscord
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../services/emailService';
import SmartContactHelper from './SmartContactHelper';
import './Contact.css';

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [fieldFocus, setFieldFocus] = useState({});

  // Smart validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    
    if (!email) return { isValid: false, message: 'Email is required' };
    if (!emailRegex.test(email)) return { isValid: false, message: 'Please enter a valid email address' };
    
    // Check for common typos
    const domain = email.split('@')[1];
    if (domain) {
      const suggestions = [];
      if (domain.includes('gmial') || domain.includes('gmai')) suggestions.push('gmail.com');
      if (domain.includes('yahooo') || domain.includes('yaho')) suggestions.push('yahoo.com');
      if (domain.includes('hotmial') || domain.includes('hotmai')) suggestions.push('hotmail.com');
      
      if (suggestions.length > 0) {
        return { 
          isValid: true, 
          suggestion: `Did you mean ${email.split('@')[0]}@${suggestions[0]}?` 
        };
      }
    }
    
    return { isValid: true };
  };

  const validatePhone = (phone) => {
    if (!phone) return { isValid: true }; // Optional field
    
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) return { isValid: false, message: 'Phone number should be at least 10 digits' };
    if (cleanPhone.length > 15) return { isValid: false, message: 'Phone number is too long' };
    
    // Format suggestion for Nigerian numbers
    if (cleanPhone.startsWith('234') && cleanPhone.length === 13) {
      return { isValid: true, suggestion: `Formatted: +${cleanPhone.slice(0,3)} ${cleanPhone.slice(3,6)} ${cleanPhone.slice(6,10)} ${cleanPhone.slice(10)}` };
    }
    if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
      return { isValid: true, suggestion: `Formatted: +234 ${cleanPhone.slice(1,4)} ${cleanPhone.slice(4,8)} ${cleanPhone.slice(8)}` };
    }
    
    return { isValid: true };
  };

  const validateName = (name) => {
    if (!name) return { isValid: false, message: 'Name is required' };
    if (name.length < 2) return { isValid: false, message: 'Name should be at least 2 characters' };
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return { isValid: false, message: 'Name should only contain letters, spaces, hyphens, and apostrophes' };
    
    // Capitalize suggestion
    const capitalizedName = name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    
    if (capitalizedName !== name) {
      return { isValid: true, suggestion: `Did you mean "${capitalizedName}"?` };
    }
    
    return { isValid: true };
  };

  const validateMessage = (message) => {
    if (!message) return { isValid: false, message: 'Message is required' };
    if (message.length < 10) return { isValid: false, message: 'Please provide more details (at least 10 characters)' };
    if (message.length > 1000) return { isValid: false, message: 'Message is too long (max 1000 characters)' };
    
    // Suggest improvements
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount < 5) {
      return { isValid: true, suggestion: 'Consider adding more details about your project requirements' };
    }
    
    return { isValid: true };
  };

  const getProjectSuggestions = (projectType, message) => {
    const suggestions = {
      'Circuit Design': [
        'PCB layout requirements',
        'Component specifications',
        'Power requirements',
        'Environmental conditions'
      ],
      'System Analysis': [
        'Current system specifications',
        'Performance issues',
        'Upgrade requirements',
        'Budget constraints'
      ],
      'Meter Installation': [
        'Property type (residential/commercial)',
        'Current meter type',
        'Installation timeline',
        'Access requirements'
      ],
      'Power Distribution': [
        'Load requirements',
        'Distance specifications',
        'Safety requirements',
        'Regulatory compliance needs'
      ]
    };

    return suggestions[projectType] || [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    let validation = { isValid: true };
    let suggestion = '';

    switch (name) {
      case 'email':
        validation = validateEmail(value);
        break;
      case 'phone':
        validation = validatePhone(value);
        break;
      case 'name':
        validation = validateName(value);
        break;
      case 'message':
        validation = validateMessage(value);
        break;
      default:
        break;
    }

    // Update validation errors
    setValidationErrors(prev => ({
      ...prev,
      [name]: validation.isValid ? '' : validation.message
    }));

    // Update suggestions
    setSuggestions(prev => ({
      ...prev,
      [name]: validation.suggestion || ''
    }));

    // Project-specific suggestions
    if (name === 'projectType' && value) {
      const projectSuggestions = getProjectSuggestions(value, formData.message);
      setSuggestions(prev => ({
        ...prev,
        projectHelp: projectSuggestions
      }));
    }
  };

  const handleFocus = (fieldName) => {
    setFieldFocus(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName) => {
    setFieldFocus(prev => ({ ...prev, [fieldName]: false }));
  };

  const applySuggestion = (fieldName, suggestedValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: suggestedValue
    }));
    setSuggestions(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  const handleSuggestionApply = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hello Ikonne! I'm interested in discussing a project with you.${
        formData.name ? `\n\nMy name is ${formData.name}` : ''
      }${
        formData.projectType ? `\nProject Type: ${formData.projectType}` : ''
      }${
        formData.message ? `\nMessage: ${formData.message}` : ''
      }`
    );
    // Replace with actual WhatsApp number
    const whatsappNumber = '2349027021719'; // Updated with actual number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Validate required fields
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // EmailJS configuration using your actual credentials
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'Portfolio Contact',
        project_type: formData.projectType || 'General Inquiry',
        message: formData.message,
        to_email: 'chinonsokingsley854@gmail.com'
      };

      console.log('Attempting to send email with params:', templateParams);
      console.log('EmailJS Config:', {
        serviceId: EMAIL_CONFIG.SERVICE_ID,
        templateId: EMAIL_CONFIG.TEMPLATE_ID,
        publicKey: EMAIL_CONFIG.PUBLIC_KEY ? 'Present' : 'Missing'
      });

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: ''
      });
      setValidationErrors({});
    } catch (error) {
      console.error('EmailJS Error Details:', error);
      console.error('Error status:', error.status);
      console.error('Error text:', error.text);
      
      // Log specific error information for debugging
      let errorMessage = 'Unknown error';
      if (error.status === 400) {
        errorMessage = 'Invalid Service ID or Template ID';
      } else if (error.status === 401) {
        errorMessage = 'Invalid Public Key';
      } else if (error.status === 404) {
        errorMessage = 'Service or Template not found';
      } else if (error.status === 412) {
        errorMessage = 'Gmail service needs reconnection';
      } else if (error.text) {
        errorMessage = error.text;
      }
      
      console.error('Specific Error:', errorMessage);
      
      // Fallback: Open WhatsApp and mailto as backup
      const whatsappMessage = encodeURIComponent(
        `*New Contact Form Submission*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone || 'Not provided'}\n` +
        `*Project Type:* ${formData.projectType || 'General Inquiry'}\n` +
        `*Subject:* ${formData.subject || 'Portfolio Contact'}\n\n` +
        `*Message:*\n${formData.message}\n\n` +
        `_EmailJS failed (${errorMessage}) - sent via fallback method_`
      );

      // Open WhatsApp as fallback
      window.open(`https://wa.me/2349027021719?text=${whatsappMessage}`, '_blank');

      // Also create mailto as backup
      const subject = encodeURIComponent(`${formData.subject || 'Portfolio Contact'} - ${formData.projectType || 'General'}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n` +
        `Project Type: ${formData.projectType || 'General Inquiry'}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `Note: This was sent via fallback method due to email service issue (${errorMessage}).`
      );
      
      window.open(`mailto:chinonsokingsley854@gmail.com?subject=${subject}&body=${body}`, '_blank');
      
      // Still show success since we used fallback methods
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: ''
      });
      setValidationErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Ready to discuss your electrical engineering needs? Let's connect and bring your projects to life.
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-header">
              <h3>Let's Connect</h3>
              <p>Choose your preferred way to reach out</p>
            </div>
            
            <div className="contact-methods">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>chinonsokingsley854@gmail.com</p>
                  <a href="mailto:chinonsokingsley854@gmail.com" className="contact-link">
                    Send Email
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon whatsapp">
                  <FaWhatsapp />
                </div>
                <div className="contact-details">
                  <h4>WhatsApp</h4>
                  <p>Quick response guaranteed</p>
                  <button onClick={handleWhatsAppContact} className="contact-link whatsapp-btn">
                    Chat on WhatsApp
                  </button>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>+234 902 702 1719</p>
                  <a href="tel:+2349027021719" className="contact-link">
                    Call Now
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Enugu, Nigeria</p>
                  <span className="contact-link">Available for remote work</span>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Connect & Follow</h4>
              <p className="social-subtitle">Let's stay connected across platforms</p>
              
              <div className="social-categories">
                {/* Professional Networks */}
                <div className="social-category">
                  <h5>Professional</h5>
                  <div className="social-icons">
                    <a 
                      href="https://linkedin.com/in/ikonne-kingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link linkedin"
                      title="Connect on LinkedIn"
                    >
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://github.com/ikonne-kingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link github"
                      title="View GitHub Projects"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

                {/* Communication */}
                <div className="social-category">
                  <h5>Quick Chat</h5>
                  <div className="social-icons">
                    <a 
                      href="https://wa.me/2349027021719" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link whatsapp"
                      title="Chat on WhatsApp"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </a>
                    <a 
                      href="https://t.me/ikonnekingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link telegram"
                      title="Message on Telegram"
                    >
                      <FaTelegram />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="social-category">
                  <h5>Social Media</h5>
                  <div className="social-icons">
                    <a 
                      href="https://twitter.com/ikonne_kingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link twitter"
                      title="Follow on Twitter"
                    >
                      <FaTwitter />
                      <span>Twitter</span>
                    </a>
                    <a 
                      href="https://instagram.com/ikonne.kingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link instagram"
                      title="Follow on Instagram"
                    >
                      <FaInstagram />
                      <span>Instagram</span>
                    </a>
                    <a 
                      href="https://facebook.com/ikonne.kingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link facebook"
                      title="Connect on Facebook"
                    >
                      <FaFacebook />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>

                {/* Content & Community */}
                <div className="social-category">
                  <h5>Content & Community</h5>
                  <div className="social-icons">
                    <a 
                      href="https://youtube.com/@ikonnekingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link youtube"
                      title="Subscribe to YouTube Channel"
                    >
                      <FaYoutube />
                      <span>YouTube</span>
                    </a>
                    <a 
                      href="https://discord.gg/ikonnekingsley" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link discord"
                      title="Join Discord Community"
                    >
                      <FaDiscord />
                      <span>Discord</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="social-quick-actions">
                <button 
                  onClick={handleWhatsAppContact}
                  className="quick-action-btn whatsapp"
                >
                  <FaWhatsapp />
                  Quick WhatsApp
                </button>
                <a 
                  href="https://linkedin.com/in/ikonne-kingsley" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="quick-action-btn linkedin"
                >
                  <FaLinkedin />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h3>Send Me a Message</h3>
              <p>Fill out the form below and I'll get back to you within 24 hours</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    required
                    placeholder="Enter your full name"
                    className={validationErrors.name ? 'error' : suggestions.name ? 'suggestion' : ''}
                  />
                  {validationErrors.name && (
                    <div className="validation-error">
                      <span className="error-icon">⚠️</span>
                      {validationErrors.name}
                    </div>
                  )}
                  {suggestions.name && !validationErrors.name && (
                    <div className="validation-suggestion">
                      <span className="suggestion-icon">💡</span>
                      {suggestions.name}
                      <button 
                        type="button" 
                        className="apply-suggestion"
                        onClick={() => applySuggestion('name', suggestions.name.replace('Did you mean "', '').replace('"?', ''))}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    placeholder="Enter your email"
                    className={validationErrors.email ? 'error' : suggestions.email ? 'suggestion' : ''}
                  />
                  {validationErrors.email && (
                    <div className="validation-error">
                      <span className="error-icon">⚠️</span>
                      {validationErrors.email}
                    </div>
                  )}
                  {suggestions.email && !validationErrors.email && (
                    <div className="validation-suggestion">
                      <span className="suggestion-icon">💡</span>
                      {suggestions.email}
                      <button 
                        type="button" 
                        className="apply-suggestion"
                        onClick={() => applySuggestion('email', suggestions.email.split(' ')[3])}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    placeholder="Enter your phone number"
                    className={validationErrors.phone ? 'error' : suggestions.phone ? 'suggestion' : ''}
                  />
                  {validationErrors.phone && (
                    <div className="validation-error">
                      <span className="error-icon">⚠️</span>
                      {validationErrors.phone}
                    </div>
                  )}
                  {suggestions.phone && !validationErrors.phone && (
                    <div className="validation-suggestion">
                      <span className="suggestion-icon">💡</span>
                      {suggestions.phone}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="projectType">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('projectType')}
                    onBlur={() => handleBlur('projectType')}
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="Circuit Design">Circuit Design</option>
                    <option value="System Analysis">System Analysis</option>
                    <option value="Meter Installation">Prepaid Meter Installation</option>
                    <option value="Power Distribution">Power Distribution</option>
                    <option value="Maintenance">Electrical Maintenance</option>
                    <option value="Consultation">Technical Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                  {suggestions.projectHelp && suggestions.projectHelp.length > 0 && (
                    <div className="project-suggestions">
                      <div className="suggestion-header">
                        <span className="suggestion-icon">💡</span>
                        Consider including these details in your message:
                      </div>
                      <ul className="suggestion-list">
                        {suggestions.projectHelp.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description of your project"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  rows="6"
                  placeholder="Describe your project requirements, timeline, and any specific details..."
                  className={validationErrors.message ? 'error' : suggestions.message ? 'suggestion' : ''}
                ></textarea>
                <div className={`message-counter ${
                  formData.message.length > 800 ? 'warning' : 
                  formData.message.length > 950 ? 'error' : ''
                }`}>
                  {formData.message.length}/1000 characters
                </div>
                {validationErrors.message && (
                  <div className="validation-error">
                    <span className="error-icon">⚠️</span>
                    {validationErrors.message}
                  </div>
                )}
                {suggestions.message && !validationErrors.message && (
                  <div className="validation-suggestion">
                    <span className="suggestion-icon">💡</span>
                    {suggestions.message}
                  </div>
                )}
                
                {/* Smart Contact Helper */}
                <SmartContactHelper 
                  formData={formData}
                  onSuggestionApply={handleSuggestionApply}
                />
              </div>

              <div className="form-buttons">
                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📧</span>
                      Send Email
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="whatsapp-btn-form"
                  onClick={handleWhatsAppContact}
                >
                  <FaWhatsapp className="btn-icon" />
                  Send via WhatsApp
                </button>
              </div>

              <div className="form-divider">
                <span>or</span>
              </div>

              {submitStatus === 'success' && (
                <div className="form-message success">
                  <span className="message-icon">✅</span>
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>Your message has been delivered. I'll get back to you within 24 hours. Check your browser for any opened tabs (WhatsApp/Email) as backup delivery methods.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message error">
                  <span className="message-icon">❌</span>
                  Something went wrong. Please try again or contact me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
