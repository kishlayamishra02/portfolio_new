import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-sage-50/80 backdrop-blur-xl border-b border-sage-200/50 shadow-soft' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Typography */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="group relative"
            >
              <h1 className="text-3xl lg:text-4xl font-display font-light tracking-wide text-charcoal-900 transition-all duration-500 group-hover:text-terracotta-600">
                Kishlaya
                <span className="block text-lg lg:text-xl font-light text-sage-600 -mt-1 transition-all duration-500 group-hover:text-terracotta-500">
                  Mishra
                </span>
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta-200/0 via-terracotta-200/20 to-terracotta-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-terracotta-600'
                      : 'text-charcoal-700 hover:text-terracotta-600'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className={`absolute inset-0 bg-sage-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 ${
                    activeSection === item.href.slice(1) ? 'opacity-100 scale-100' : ''
                  }`}></div>
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-terracotta-500 transition-all duration-300 ${
                    activeSection === item.href.slice(1) ? 'w-full' : 'group-hover:w-full'
                  }`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group p-3 rounded-xl bg-sage-100/50 backdrop-blur-sm border border-sage-200/50 hover:bg-sage-200/50 transition-all duration-300"
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-charcoal-700" />
                ) : (
                  <Menu className="h-5 w-5 text-charcoal-700" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-6 space-y-2 bg-sage-50/95 backdrop-blur-xl rounded-2xl mt-4 border border-sage-200/50 shadow-soft">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`group relative w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl ${
                    activeSection === item.href.slice(1)
                      ? 'text-terracotta-600 bg-sage-100'
                      : 'text-charcoal-700 hover:text-terracotta-600 hover:bg-sage-100/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;