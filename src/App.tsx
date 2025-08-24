import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WebGLBackground from './components/WebGLBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Simulate content loading with minimum time for smooth UX
    const minLoadTime = 2000;
    const startTime = Date.now();

    const checkContentReady = () => {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime >= minLoadTime) {
        setIsContentReady(true);
      } else {
        setTimeout(checkContentReady, minLoadTime - elapsedTime);
      }
    };

    setTimeout(checkContentReady, 100);
  }, []);

  const handleLoadingComplete = () => {
    if (isContentReady) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-sage-50 text-charcoal-900 overflow-x-hidden relative">
      {/* WebGL Background */}
      <WebGLBackground />
      
      {/* Textured Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-texture opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100/20 via-transparent to-terracotta-100/20"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;