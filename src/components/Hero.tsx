import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  
  const welcomeMessages = [
    "Crafting digital experiences that inspire.",
    "Where innovation meets elegant design.",
    "Building tomorrow's interfaces today.",
    "Transforming complex ideas into simple solutions.",
    "Creating meaningful connections through code."
  ];

  const floatingElements = [
    { text: "AI/ML", position: "top-16 left-10", delay: "0s" },
    { text: "React", position: "top-32 right-16", delay: "1s" },
    { text: "Python", position: "bottom-20 left-10", delay: "2s" },
    { text: "Security", position: "bottom-20 right-10", delay: "3s" },
    { text: "Node.js", position: "top-1/2 left-5", delay: "4s" },
    { text: "Design", position: "top-1/2 right-5", delay: "5s" }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // Organic particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: `rgba(${139 + Math.random() * 20}, ${155 + Math.random() * 20}, ${125 + Math.random() * 20}, ${0.1 + Math.random() * 0.3})`
        });
      }
    };

    initParticles();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw organic particles
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Update particle position with organic movement
        particle.x += particle.vx + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.1;
        particle.y += particle.vy + Math.cos(Date.now() * 0.001 + particle.y * 0.01) * 0.1;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
    }

    const interval = setInterval(draw, 50);

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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100">
      {/* Organic Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ zIndex: 1 }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {floatingElements.map((item, index) => (
          <div
            key={index}
            className={`floating-element absolute ${item.position} transform-gpu transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: item.delay }}
          >
            <div className="bg-sage-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-sage-200/50 shadow-soft group hover:scale-110 transition-all duration-300 hover:bg-terracotta-100/80 hover:border-terracotta-200/50">
              <span className="text-charcoal-700 font-body font-medium text-sm group-hover:text-terracotta-700">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Typing Terminal */}
        <div className={`mb-12 transform-gpu transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-charcoal-800/90 border border-charcoal-700 rounded-2xl shadow-large backdrop-blur-xl overflow-hidden max-w-2xl mx-auto">
            {/* Terminal Header */}
            <div className="flex items-center px-6 py-4 bg-charcoal-900/50 border-b border-charcoal-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-sage-400 text-sm font-mono">portfolio.sh</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center mb-4 text-sm">
                <span className="text-terracotta-400">kishlaya@portfolio</span>
                <span className="text-sage-400">:</span>
                <span className="text-moss-400">~/creative-space</span>
                <span className="text-sage-400">$ </span>
                <span className="text-cream-300 ml-2">./inspire.sh</span>
              </div>
              <div className="text-cream-200 min-h-[32px] text-base">
                <span className="text-terracotta-400">[OUTPUT]</span> {displayText}
                <span className="animate-pulse text-terracotta-400">█</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="space-y-8">
          {/* Name */}
          <h1 className={`text-hero font-display font-light text-charcoal-900 leading-none transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="block">Kishlaya</span>
            <span className="block text-terracotta-600">Mishra</span>
          </h1>

          {/* Subheading */}
          <div className={`space-y-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-2xl md:text-3xl text-charcoal-700 font-body font-light">
              Digital Craftsman & Innovation Architect
            </p>
            
            <p className="text-lg md:text-xl text-charcoal-600 font-body max-w-3xl mx-auto leading-relaxed">
              Transforming complex challenges into elegant solutions through 
              <span className="text-terracotta-600 font-medium"> AI innovation</span>, 
              <span className="text-moss-600 font-medium"> full-stack mastery</span>, and 
              <span className="text-sage-700 font-medium"> security expertise</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={scrollToAbout}
              className="group relative px-8 py-4 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-full font-body font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-medium hover:shadow-large"
            >
              <span className="relative z-10 flex items-center">
                Explore My Work
                <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta-600 to-terracotta-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "https://github.com/kishlayamishra02", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/kishlayamishra", label: "LinkedIn" },
                { icon: Mail, href: "mailto:kishlayamishra@gmail.com", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-sage-100/80 backdrop-blur-sm border border-sage-200 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-terracotta-100/80 hover:border-terracotta-200 shadow-soft hover:shadow-medium"
                  title={social.label}
                >
                  <social.icon className="w-6 h-6 text-charcoal-700 group-hover:text-terracotta-700 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={scrollToAbout}
              className="group animate-bounce text-charcoal-600 hover:text-terracotta-600 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm font-body">Discover more</span>
                <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .floating-element {
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotateZ(0deg);
          }
          25% { 
            transform: translateY(-15px) rotateZ(1deg);
          }
          50% { 
            transform: translateY(-8px) rotateZ(-1deg);
          }
          75% { 
            transform: translateY(-20px) rotateZ(0.5deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;