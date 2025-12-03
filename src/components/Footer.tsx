import React, { useState, useEffect } from 'react';
import { Heart, Code, Coffee, Terminal, Zap, Star, Rocket, Brain } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const currentYear = new Date().getFullYear();

  const inspirationalQuotes = [
    "Code is poetry written in logic",
    "Debugging is like being a detective in a crime movie where you're also the murderer",
    "The best error message is the one that never shows up",
    "Programming isn't about what you know; it's about what you can figure out",
    "Code never lies, comments sometimes do",
    "First, solve the problem. Then, write the code",
    "The only way to learn a new programming language is by writing programs in it"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [inspirationalQuotes.length]);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-black border-t border-emerald-500/30 text-white py-16 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/10 via-transparent to-cyan-900/10"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Grid */}
        <div className={`grid md:grid-cols-3 gap-12 mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

          {/* Brand */}
          <div className="space-y-6">
            <div className="group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Terminal className="w-6 h-6 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                  KM.dev
                </h3>
              </div>
              <p className="text-gray-400 font-mono leading-relaxed">
                Building the Future, One Algorithm at a Time. Transforming ideas into digital reality through code, creativity, and innovation.
              </p>
            </div>

            {/* Icons */}
            <div className="flex space-x-4">
              {[
                { icon: Brain, color: "from-purple-500 to-pink-500", label: "AI/ML" },
                { icon: Code, color: "from-emerald-500 to-cyan-500", label: "Full Stack" },
                { icon: Zap, color: "from-orange-500 to-red-500", label: "Performance" },
                { icon: Star, color: "from-yellow-500 to-orange-500", label: "Quality" }
              ].map((tech, index) => (
                <div
                  key={index}
                  className="group relative w-10 h-10 rounded-lg bg-black/50 border border-gray-700 flex items-center justify-center hover:border-emerald-500/50 transition-all duration-300 transform hover:scale-110"
                  title={tech.label}
                >
                  <tech.icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-emerald-400 font-mono mb-6">
              <span className="text-cyan-400">{'>'}</span> Navigation
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Home', id: '#home' },
                { label: 'About', id: '#about' },
                { label: 'Experience', id: '#experience' },
                { label: 'Projects', id: '#projects' },
                { label: 'Skills', id: '#skills' },
                { label: 'Certifications', id: '#certifications' },
                { label: 'Contact', id: '#contact' },
                { label: 'Services', url: 'https://kishlayaservices.netlify.app' }
              ].map((link, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (link.url) {
                      window.open(link.url, "_blank");
                    } else {
                      scrollToSection(link.id);
                    }
                  }}
                  className="group text-left text-gray-400 hover:text-emerald-400 transition-colors font-mono text-sm py-2 px-3 rounded-lg hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30"
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quotes */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-emerald-400 font-mono mb-6">
              <span className="text-cyan-400">{'>'}</span> Daily Inspiration
            </h4>

            <div className="relative bg-black/40 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-xl hover:border-emerald-500/60 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <Rocket className="w-5 h-5 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 text-sm font-mono">Quote #{currentQuote + 1}</span>
                </div>

                <p className="text-gray-300 font-mono text-sm leading-relaxed italic min-h-[60px] flex items-center">
                  "{inspirationalQuotes[currentQuote]}"
                </p>

                <div className="flex justify-center mt-4">
                  <div className="flex space-x-2">
                    {inspirationalQuotes.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentQuote
                            ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Made With Love */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative bg-black/40 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-xl max-w-2xl mx-auto hover:border-emerald-500/60 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3 text-gray-400 mb-4 font-mono">
                <span>Crafted with</span>
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <span>and</span>
                <Code className="w-5 h-5 text-emerald-400" />
                <span>and lots of</span>
                <Coffee className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-gray-500 text-sm font-mono">
                Powered by React, TypeScript, Tailwind CSS, and endless curiosity
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t border-emerald-500/30 pt-8 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm font-mono">© {currentYear} Kishlaya Mishra. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1 font-mono">Designed and developed with modern web technologies</p>
            </div>

            <p className="text-gray-500 text-xs italic font-mono bg-black/30 px-4 py-2 rounded-lg border border-gray-700">
              "Ok Google! How to center a div in 2025? 🤔"
            </p>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 12}s`
              }}
            />
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% { opacity: 0.8; }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 1;
          }
          75% { opacity: 0.6; }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
