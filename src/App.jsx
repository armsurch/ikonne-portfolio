import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIAssistant from './components/AIAssistant';
import SmartRecommendations from './components/SmartRecommendations';
import ElectricalBackground from './components/ElectricalBackground';
import PageTransitions from './components/PageTransitions';
import EnhancedNavigation from './components/EnhancedNavigation';
import ElectricalLoader from './components/ElectricalLoader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showEnhancedNav, setShowEnhancedNav] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnhancedNav(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    document.body.classList.add('enhanced-nav-active');
  };

  return (
    <div className="App">
      {/* Loading Screen */}
      {isLoading && (
        <ElectricalLoader onLoadComplete={handleLoadComplete} />
      )}

      {/* Enhanced Background Effects */}
      {!isLoading && <ElectricalBackground />}

      {/* Enhanced Navigation */}
      {!isLoading && showEnhancedNav && <EnhancedNavigation />}

      {/* Page Transitions */}
      {!isLoading && <PageTransitions />}

      {/* Main Content */}
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
      
      {/* Enhanced Features */}
      <ScrollToTop />
      <AIAssistant />
      <SmartRecommendations />
    </div>
  );
}

export default App;