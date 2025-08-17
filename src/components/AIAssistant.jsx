import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaLightbulb } from 'react-icons/fa';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm Ikonne's AI assistant. I can help you learn about his electrical engineering projects, skills, and experience. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Smart responses based on keywords
  const smartResponses = {
    // Project-related queries
    'projects': {
      keywords: ['project', 'work', 'portfolio', 'experience'],
      response: "Ikonne has worked on several impressive projects:\n\n🏠 **Smart Home Automation** - IoT-integrated system with automated lighting and security\n⚡ **Power Distribution Analysis** - Reduced energy costs by 25% for manufacturing facility\n🔌 **Prepaid Meter Installation** - Led installation of 500+ smart meters\n🔧 **Electrical Maintenance Program** - Reduced downtime by 40%\n\nWhich project interests you most?"
    },
    
    'smart home': {
      keywords: ['smart home', 'automation', 'iot', 'arduino'],
      response: "The Smart Home Automation System is one of Ikonne's flagship projects! 🏠\n\n**Features:**\n• Automated lighting control\n• Climate control system\n• Security integration\n• Mobile app control\n• IoT sensor network\n\n**Technologies:** Arduino, Raspberry Pi, IoT Sensors, Mobile App\n**Duration:** 3 months\n\nThis project showcases his expertise in modern electrical systems and IoT integration. Would you like to know about implementation details?"
    },

    'power distribution': {
      keywords: ['power', 'distribution', 'analysis', 'energy'],
      response: "The Industrial Power Distribution Analysis project demonstrates Ikonne's expertise in large-scale systems! ⚡\n\n**Achievements:**\n• 25% reduction in energy costs\n• Optimized power distribution\n• Comprehensive system analysis\n• Load flow optimization\n\n**Tools Used:** ETAP, Power System Analysis, Load Flow, Fault Analysis\n**Client:** Manufacturing Corporation\n\nThis project saved the client thousands in energy costs. Interested in similar optimization work?"
    },

    'prepaid meter': {
      keywords: ['prepaid', 'meter', 'installation', 'billing'],
      response: "The Prepaid Meter Installation Project was a massive undertaking! 🔌\n\n**Scale:**\n• 500+ meters installed\n• Residential & commercial properties\n• Improved billing accuracy\n• Database management system\n\n**Duration:** 6 months\n**Client:** Electricity Distribution Company\n\nThis project required excellent project management and technical skills. Need similar metering solutions?"
    },

    'skills': {
      keywords: ['skill', 'expertise', 'technology', 'tools'],
      response: "Ikonne's technical expertise includes:\n\n**Core Skills:**\n⚡ Circuit Design & Analysis\n🔧 System Maintenance & Troubleshooting\n📊 Power System Analysis\n🏗️ Electrical Installation\n\n**Software & Tools:**\n• ETAP (Power System Analysis)\n• Arduino & Raspberry Pi\n• IoT Integration\n• Database Management\n• Testing Equipment\n\n**Specializations:**\n• Prepaid Meter Systems\n• Smart Home Automation\n• Industrial Power Distribution\n• Preventive Maintenance\n\nWhich skill area interests you most?"
    },

    'contact': {
      keywords: ['contact', 'hire', 'work', 'collaborate', 'email', 'phone'],
      response: "Ready to work with Ikonne? Here are the best ways to connect:\n\n📧 **Email:** chinonsokingsley854@gmail.com\n📱 **Phone:** +234 902 702 1719\n💬 **WhatsApp:** Direct messaging available\n🔗 **LinkedIn:** Professional networking\n\n**Location:** Enugu, Enugu State, Nigeria\n\n**Best for:**\n• Project consultations\n• System design & analysis\n• Electrical installations\n• Maintenance programs\n\nWould you like me to help you draft a message or schedule a call?"
    },

    'location': {
      keywords: ['location', 'where', 'based', 'enugu'],
      response: "Ikonne is based in **Enugu, Enugu State, Nigeria** 📍\n\nThis strategic location allows him to serve:\n• Southeast Nigeria region\n• Industrial facilities\n• Residential developments\n• Commercial complexes\n\nHe's available for:\n✅ On-site consultations\n✅ Remote system analysis\n✅ Project management\n✅ Technical support\n\nNeed services in the Enugu area or remote consultation?"
    },

    'experience': {
      keywords: ['experience', 'background', 'years', 'career'],
      response: "Ikonne brings extensive experience in electrical engineering:\n\n**Professional Background:**\n🎓 Electrical Engineering degree\n⚡ Specialized in power systems\n🔧 Hands-on installation experience\n📊 System analysis expertise\n\n**Key Achievements:**\n• 500+ meter installations\n• 25% energy cost reduction\n• 40% downtime reduction\n• Multiple successful projects\n\n**Industry Focus:**\n• Residential electrical systems\n• Industrial power distribution\n• Smart home automation\n• Preventive maintenance\n\nLooking for someone with this level of expertise?"
    },

    'default': {
      keywords: [],
      response: "I'd be happy to help you learn more about Ikonne! I can tell you about:\n\n🔧 **His Projects** - Smart home automation, power distribution, meter installations\n⚡ **His Skills** - Circuit design, system analysis, IoT integration\n📞 **Contact Info** - How to reach him for your project\n📍 **Location** - Based in Enugu, Nigeria\n💼 **Experience** - Background and achievements\n\nWhat would you like to know more about?"
    }
  };

  // Quick suggestion buttons
  const quickSuggestions = [
    "Tell me about his projects",
    "What are his main skills?",
    "How can I contact him?",
    "Smart home automation details",
    "Power distribution experience"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Find the best matching response
    for (const [key, responseData] of Object.entries(smartResponses)) {
      if (key === 'default') continue;
      
      const hasKeyword = responseData.keywords.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );
      
      if (hasKeyword) {
        return responseData.response;
      }
    }
    
    return smartResponses.default.response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: findBestResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button 
        className={`ai-assistant-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Ask AI about Ikonne's work"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
        {!isOpen && <span className="pulse-dot"></span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-assistant-window">
          <div className="ai-assistant-header">
            <div className="assistant-info">
              <FaRobot className="assistant-icon" />
              <div>
                <h4>AI Assistant</h4>
                <span className="status">Ask me about Ikonne's work</span>
              </div>
            </div>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="ai-assistant-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.content.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line.includes('**') ? (
                        <div dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/•/g, '•')
                        }} />
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="quick-suggestions">
              <div className="suggestions-header">
                <FaLightbulb /> Quick questions:
              </div>
              <div className="suggestions-list">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-btn"
                    onClick={() => handleQuickSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="ai-assistant-input">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Ikonne's projects, skills, or experience..."
                rows="1"
                disabled={isTyping}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="send-btn"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;