import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Github, Linkedin, Mail, Download, ChevronDown, Code, Zap, Sparkles, Cpu } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);

  const welcomeMessages = [
    'Initializing quantum neural networks...',
    'Loading advanced AI algorithms...',
    'Compiling future-ready solutions...',
    'Establishing secure connections...',
    'Optimizing performance matrices...',
    'System ready. Welcome to the matrix.'
  ];

  useEffect(() => {
    if (currentIndex < welcomeMessages.length) {
      const currentMessage = welcomeMessages[currentIndex];
      
      if (isTyping && displayText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else if (isTyping && displayText.length === currentMessage.length) {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      } else if (!isTyping && displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else if (!isTyping && displayText.length === 0) {
        setCurrentIndex((prev) => (prev + 1) % welcomeMessages.length);
        setIsTyping(true);
      }
    }
  }, [displayText, currentIndex, isTyping, welcomeMessages]);

  // Clean Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
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

    // Initialize subtle floating particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = window.innerWidth < 768 ? 20 : 50;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          color: '#00ffff'
        });
      }
    };

    initParticles();

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw matrix rain
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

      // Draw subtle particles
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });
    }

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Clean Matrix Rain Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        style={{ zIndex: 1 }}
      />

      {/* Floating 3D Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {[
          { text: "AI/ML", color: "from-purple-500 to-pink-500", position: "top-16 sm:top-20 left-4 sm:left-10", delay: "0s", icon: "🧠" },
          { text: "React", color: "from-cyan-500 to-blue-500", position: "top-24 sm:top-32 right-4 sm:right-16", delay: "1s", icon: "⚛️" },
          { text: "Python", color: "from-green-500 to-emerald-500", position: "bottom-24 sm:bottom-32 left-4 sm:left-20", delay: "2s", icon: "🐍" },
          { text: "Security", color: "from-orange-500 to-red-500", position: "bottom-16 sm:bottom-20 right-4 sm:right-10", delay: "3s", icon: "🔒" },
          { text: "Node.js", color: "from-yellow-500 to-orange-500", position: "top-1/2 left-2 sm:left-5", delay: "4s", icon: "🟢" },
          { text: "MongoDB", color: "from-indigo-500 to-purple-500", position: "top-1/2 right-2 sm:right-5", delay: "5s", icon: "🍃" }
        ].map((item, index) => (
          <div
            key={index}
            className={`floating-3d absolute ${item.position} transform-gpu`}
            style={{ animationDelay: item.delay }}
          >
            <div className={`bg-gradient-to-r ${item.color} px-3 sm:px-6 py-2 sm:py-3 rounded-lg border border-white/20 backdrop-blur-sm shadow-2xl group hover:scale-110 transition-all duration-300`}>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-lg sm:text-2xl">{item.icon}</span>
                <span className="text-white font-mono font-bold text-xs sm:text-sm">{item.text}</span>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Enhanced Holographic Terminal - Mobile Responsive */}
        <div className="mb-8 sm:mb-12 transform-gpu perspective-1000">
          <div className="bg-black/80 border-2 border-cyan-500/50 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden transform hover:rotateX-2 hover:rotateY-2 transition-all duration-500 hover:shadow-cyan-500/25 group">
            {/* Terminal Header */}
            <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-cyan-500/30">
              <div className="flex space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-cyan-400 text-xs sm:text-sm font-mono">quantum_portfolio.exe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 sm:p-8 font-mono">
              <div className="flex items-center mb-3 sm:mb-4 text-xs sm:text-base">
                <span className="text-cyan-400">root@kishlaya</span>
                <span className="text-white">:</span>
                <span className="text-purple-400">~/quantum-portfolio</span>
                <span className="text-white">$ </span>
                <span className="text-green-400 ml-1 sm:ml-2">./initialize_greatness.sh</span>
              </div>
              <div className="text-white min-h-[24px] sm:min-h-[32px] text-sm sm:text-lg">
                <span className="text-yellow-400">[INFO]</span> {displayText}
                <span className="animate-pulse text-cyan-400">█</span>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3 sm:mt-4 w-full bg-gray-800 rounded-full h-1.5 sm:h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1.5 sm:h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Hero Content - Mobile Responsive */}
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold font-mono leading-tight">
            <div className="relative inline-block group">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                KISHLAYA
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity"></div>
            </div>
            <br />
            <div className="relative inline-block group">
              <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                MISHRA
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity" style={{ animationDelay: '1s' }}></div>
            </div>
          </h1>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 font-mono">
              <span className="text-cyan-400 font-bold">Quantum Developer</span> × 
              <span className="text-purple-400 font-bold"> AI Architect</span> × 
              <span className="text-pink-400 font-bold"> Security Engineer</span>
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-mono max-w-3xl mx-auto leading-relaxed px-4">
              Architecting the future with <span className="text-cyan-400">quantum algorithms</span>, 
              <span className="text-purple-400"> neural networks</span>, and 
              <span className="text-pink-400"> bulletproof security</span>
            </p>
          </div>

          {/* Enhanced CTA Buttons - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12 px-4">
            <button
              onClick={scrollToAbout}
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-mono font-bold text-black text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Explore My Universe
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
            </button>
            
            <div className="flex space-x-3 sm:space-x-4">
              {[
                { icon: Github, href: "https://github.com/kishlayamishra02", color: "hover:from-gray-600 hover:to-gray-800", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/kishlayamishra", color: "hover:from-blue-600 hover:to-blue-800", label: "LinkedIn" },
                { icon: Mail, href: "mailto:kishlayamishra@gmail.com", color: "hover:from-green-600 hover:to-green-800", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 sm:p-4 bg-black/50 border border-gray-700 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 hover:border-cyan-500/50 ${social.color}`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Scroll Indicator - Mobile Responsive */}
          <div className="mt-12 sm:mt-16">
            <button
              onClick={scrollToAbout}
              className="group animate-bounce text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs sm:text-sm font-mono text-center px-4">Scroll to explore the quantum realm</span>
                <div className="relative">
                  <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .floating-3d {
          animation: float3d 8s ease-in-out infinite;
        }
        
        @keyframes float3d {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          25% { 
            transform: translateY(-20px) rotateX(5deg) rotateY(5deg);
          }
          50% { 
            transform: translateY(-10px) rotateX(-5deg) rotateY(10deg);
          }
          75% { 
            transform: translateY(-30px) rotateX(10deg) rotateY(-5deg);
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
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (max-width: 640px) {
          .floating-3d {
            animation: float3d 6s ease-in-out infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;