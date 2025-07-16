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
    // Start the curtain and message sequence
    messageSequence();
  };

  const messageSequence = () => {
    let messageIndex = 0;
    
    const showNextMessage = () => {
      if (messageIndex >= loadingMessages.length) {
        // All messages shown, show "Press any key"
        setShowMessage(false);
        setTimeout(() => {
          setShowPressKey(true);
          setIsComplete(true);
        }, 500);
        return;
      }

      // Increase curtain height by 20% for each message
      const newHeight = (messageIndex + 1) * 20;
      setCurtainHeight(newHeight);
      
      // Show message after curtain animation
      setTimeout(() => {
        setCurrentMessage(messageIndex);
        setShowMessage(true);
        
        // Hide message after 1.5s, then show next after 0.5s
        setTimeout(() => {
          setShowMessage(false);
          setTimeout(() => {
            messageIndex++;
            showNextMessage();
          }, 500);
        }, 1500);
      }, 300); // Small delay for curtain to animate
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

  // Matrix rain effect
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = window.innerWidth < 768 ? 8 : 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ffff';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.5})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (showMobileWarning) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
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
      {/* Matrix Rain Background */}
      <canvas
        id="matrix-canvas"
        className="absolute inset-0 opacity-20"
      />
      
      {/* Smooth Curtain Effect */}
      <div 
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black transition-all duration-[2000ms] ease-out"
        style={{ height: `${curtainHeight}%` }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-bold font-mono mb-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Kishlaya Mishra🎧
          </h1>
          <h3 className="text-3xl md:text-4xl font-bold font-mono mb-12 bg-gradient-to-r from-pink-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Full Stack Developer x AI Architect 
          </h3>
          
          {/* Loading bar */}
          <div className="w-96 max-w-[90vw] mx-auto mb-8">
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-[2000ms] ease-out"
                style={{ 
                  width: `${curtainHeight}%`
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
    </div>
  );
};

export default LoadingScreen;