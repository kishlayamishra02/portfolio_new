import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [curtainHeight, setCurtainHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [showPressKey, setShowPressKey] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const loadingMessages = [
    "Crafting digital experiences with purpose.",
    "Where innovation meets elegant design.",
    "Building tomorrow's interfaces today.",
    "Transforming ideas into visual stories.",
    "Ready to explore something extraordinary?"
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        setShowMobileWarning(true);
        return;
      }
      startLoadingSequence();
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startLoadingSequence = () => {
    messageSequence();
  };

  const messageSequence = () => {
    let messageIndex = 0;
    
    const showNextMessage = () => {
      if (messageIndex >= loadingMessages.length) {
        setShowMessage(false);
        setTimeout(() => {
          setShowPressKey(true);
          setIsComplete(true);
        }, 500);
        return;
      }

      const newHeight = (messageIndex + 1) * 20;
      setCurtainHeight(newHeight);
      
      setTimeout(() => {
        setCurrentMessage(messageIndex);
        setShowMessage(true);
        
        setTimeout(() => {
          setShowMessage(false);
          setTimeout(() => {
            messageIndex++;
            showNextMessage();
          }, 500);
        }, 1500);
      }, 300);
    };

    showNextMessage();
  };

  const handleContinue = () => {
    setShowMobileWarning(false);
    startLoadingSequence();
  };

  const handleKeyPress = () => {
    if (isComplete) {
      onLoadingComplete();
    }
  };

  const handleMobileContinue = () => {
    if (isComplete) {
      onLoadingComplete();
    }
  };

  useEffect(() => {
    if (isComplete && !isMobile) {
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('click', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('click', handleKeyPress);
      };
    }
  }, [isComplete, isMobile]);

  if (showMobileWarning) {
    return (
      <div className="fixed inset-0 bg-sage-900 z-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <Smartphone className="w-16 h-16 mx-auto text-terracotta-500 mb-4" />
            <h2 className="text-2xl font-bold text-cream-100 mb-4 font-display">
              Desktop Experience Recommended
            </h2>
            <p className="text-sage-300 mb-6 font-body">
              This portfolio is optimized for desktop viewing. Some elements may not display perfectly on mobile devices.
            </p>
          </div>
          
          <button
            onClick={handleContinue}
            className="w-full py-4 px-8 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-xl font-body font-semibold text-white text-lg transform hover:scale-105 transition-all duration-300 shadow-medium"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-sage-900 z-50 overflow-hidden">
      {/* Organic Background Pattern */}
      <div className="absolute inset-0 bg-grain opacity-30"></div>
      
      {/* Smooth Curtain Effect */}
      <div 
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-sage-800 via-sage-700 to-sage-600 transition-all duration-[2000ms] ease-out"
        style={{ height: `${curtainHeight}%` }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-4xl px-6">
          {/* Name */}
          <h1 className="text-hero font-display font-light text-cream-100 mb-8 tracking-wide">
            Kishlaya Mishra
          </h1>
          <h3 className="text-display font-body font-light text-sage-300 mb-12">
            Digital Craftsman & Innovation Architect
          </h3>
          
          {/* Loading bar */}
          <div className="w-96 max-w-[90vw] mx-auto mb-8">
            <div className="w-full bg-sage-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-2 bg-gradient-to-r from-terracotta-500 via-terracotta-400 to-cream-400 rounded-full transition-all duration-[2000ms] ease-out relative overflow-hidden"
                style={{ 
                  width: `${curtainHeight}%`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
          
          {/* Messages with fade animation */}
          <div className="h-8 mb-8">
            {curtainHeight > 0 && (
              <p 
                className={`text-terracotta-400 font-body text-lg transition-all duration-500 ${
                  showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {loadingMessages[currentMessage]}
              </p>
            )}
          </div>
          
          {/* Press any key message */}
          {showPressKey && (
            <div className={`transition-all duration-500 ${showPressKey ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {isMobile ? (
                <button
                  onClick={handleMobileContinue}
                  className="py-3 px-8 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-xl font-body font-semibold text-white text-lg transform hover:scale-105 transition-all duration-300 shadow-medium"
                >
                  Enter Portfolio
                </button>
              ) : (
                <p className="text-sage-400 font-body text-lg animate-pulse">
                  Press any key to enter
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;