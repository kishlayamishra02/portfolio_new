import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [curtainHeight, setCurtainHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [showPressKey, setShowPressKey] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const loadingMessages = [
    'Initializing quantum systems...',
    'Loading neural networks...',
    'Compiling portfolio data...',
    'Optimizing user experience...',
    'Ready to launch!'
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
    // Start curtain animation
    setCurtainHeight(100);
    
    // Start message sequence after curtain is down
    setTimeout(() => {
      messageSequence();
    }, 1000);
  };

  const messageSequence = () => {
    const showNextMessage = (index: number) => {
      if (index >= loadingMessages.length) {
        // All messages shown, show "Press any key"
        setShowMessage(false);
        setTimeout(() => {
          setShowPressKey(true);
          setIsComplete(true);
        }, 500);
        return;
      }

      setCurrentMessage(index);
      setShowMessage(true);

      // Hide message after 1.5s, then show next after 0.5s
      setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => {
          showNextMessage(index + 1);
        }, 500);
      }, 1500);
    };

    showNextMessage(0);
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

  // Listen for key press
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
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        {/* Minimal mobile warning */}
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <Smartphone className="w-16 h-16 mx-auto text-orange-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4 font-mono">
              Mobile Device Detected
            </h2>
            <p className="text-gray-400 mb-6 font-mono">
              This portfolio is optimized for desktop. Elements may overlap on mobile.
            </p>
          </div>
          
          <button
            onClick={handleContinue}
            className="w-full py-4 px-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-mono font-bold text-white text-lg transform hover:scale-105 transition-all duration-300"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Animated curtain coming down */}
      <div 
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black transition-all duration-1000 ease-out"
        style={{ height: `${curtainHeight}%` }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-bold font-mono mb-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Kishlaya Mishra🎧
          </h1>
          <h3 className="text-6xl md:text-8xl font-bold font-mono mb-12 bg-gradient-to-r from-red-400 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Full Stack Developer x AI Architect 
          </h3>
          
          {/* Loading bar */}
          <div className="w-96 max-w-[90vw] mx-auto mb-8">
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{ 
                  width: curtainHeight > 0 ? `${(currentMessage + 1) * 20}%` : '0%'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Messages with fade animation */}
          <div className="h-8 mb-8">
            {curtainHeight > 0 && (
              <p 
                className={`text-cyan-400 font-mono text-lg transition-all duration-500 ${
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
                  className="py-3 px-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-mono font-bold text-black text-lg transform hover:scale-105 transition-all duration-300"
                >
                  Tap to Enter
                </button>
              ) : (
                <p className="text-gray-400 font-mono text-lg animate-pulse">
                  Press any key to enter
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-30px) translateX(20px);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;