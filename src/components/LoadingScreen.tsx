import React, { useState, useEffect } from 'react';
import { Terminal, Code, Brain, Zap, Cpu, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const loadingMessages = [
    'Desktop recommended for full features...',
    'Desktop mode adviced...',
    'Compiling portfolio data...',
    'Establishing secure connections...',
    'Optimizing user experience...',
    'Finalizing holographic interface...',
    'Welcome to the matrix.'
  ];

  // Typing effect for messages
  useEffect(() => {
    const currentMsg = loadingMessages[currentMessage];
    
    if (isTyping && displayText.length < currentMsg.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentMsg.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isTyping && displayText.length === currentMsg.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 800);
      return () => clearTimeout(timeout);
    } else if (!isTyping && displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 20);
      return () => clearTimeout(timeout);
    } else if (!isTyping && displayText.length === 0) {
      if (currentMessage < loadingMessages.length - 1) {
        setCurrentMessage(prev => prev + 1);
        setIsTyping(true);
      }
    }
  }, [displayText, currentMessage, isTyping, loadingMessages]);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 1000);
          return 100;
        }
        // Simulate realistic loading with varying speeds
        const increment = Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 12}s`
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        
        {/* Logo/Brand */}
        <div className="mb-12">
          <div className="relative inline-block group">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
              <Terminal className="w-12 h-12 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-50 rounded-2xl animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Kishlaya Mishra
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-mono">
              <span className="text-cyan-400">Full Stack Developer</span> × 
              <span className="text-purple-400"> AI Architect</span>
            </p>
          </div>
        </div>

        {/* Terminal Loading Interface */}
        <div className="bg-black/80 border-2 border-cyan-500/50 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden mb-8">
          {/* Terminal Header */}
          <div className="flex items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-cyan-500/30">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-cyan-400 text-sm font-mono">portfolio_loader.exe</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-purple-400 animate-pulse" />
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-8 font-mono">
            <div className="flex items-center mb-4">
              <span className="text-cyan-400">root@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-purple-400">~/quantum-dev</span>
              <span className="text-white">$ </span>
              <span className="text-green-400 ml-2">./initialize_portfolio.sh</span>
            </div>
            
            {/* Loading Message */}
            <div className="text-white min-h-[32px] text-lg mb-6">
              <span className="text-yellow-400">[INFO]</span> {displayText}
              <span className="animate-pulse text-cyan-400">█</span>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-mono text-gray-400">
                <span>Loading Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-cyan-500/30">
                <div 
                  className="h-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* System Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-xs font-mono">
              <div className="text-center p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <Code className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                <div className="text-emerald-400">Components</div>
                <div className="text-white">Loading...</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <Brain className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                <div className="text-purple-400">AI Systems</div>
                <div className="text-white">Ready</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <Zap className="w-4 h-4 mx-auto mb-1 text-orange-400" />
                <div className="text-orange-400">Performance</div>
                <div className="text-white">Optimized</div>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <Sparkles className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                <div className="text-cyan-400">Experience</div>
                <div className="text-white">Enhanced</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Subtle Hint */}
        <p className="text-gray-500 text-sm font-mono mt-8 opacity-70">
          Preparing an extraordinary digital experience...
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-50px) translateX(30px);
            opacity: 1;
          }
          75% {
            opacity: 0.6;
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;