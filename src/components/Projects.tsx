import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code, Database, Shield, Brain, Globe, Zap, Play, Clock, Calendar } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const projects = [
    {
      title: "AI Image Classification",
      description: "Machine learning system for intelligent image recognition and categorization using advanced neural networks and computer vision techniques.",
      technologies: ["Python", "TensorFlow", "OpenCV", "Neural Networks"],
      category: "AI/ML",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Story Writer Assistant",
      description: "Weaving your imagination into beautiful stories, an AI that writes with you, not for you. Interactive storytelling platform with creative AI assistance.",
      technologies: ["Groq API", "JavaScript", "HTML/CSS", "GSAP"],
      category: "Web/AI",
      icon: Code,
      gradient: "from-emerald-500 to-cyan-500",
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Steganography Security System",
      description: "Advanced cybersecurity tool for hiding and protecting sensitive data using sophisticated steganographic techniques and encryption.",
      technologies: ["Python", "Cryptography", "Digital Forensics", "Security Protocols"],
      category: "Cybersecurity",
      icon: Shield,
      gradient: "from-orange-500 to-red-500",
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application with secure payment integration, user authentication, and comprehensive admin dashboard.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      category: "Full Stack",
      icon: Globe,
      gradient: "from-cyan-500 to-teal-500",
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Jira Weather Gadget",
      description: "Real-time weather dashboard gadget for Jira, built using Atlassian Forge with seamless integration and responsive design.",
      technologies: ["React (UI Kit)", "JavaScript", "Atlassian Forge", "OpenWeatherMap API"],
      category: "Integration",
      icon: Zap,
      gradient: "from-indigo-500 to-purple-500",
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Tech Events Dashboard",
      description: "Interactive dashboard to explore and filter student-friendly tech events across 2025 with advanced search and visualization features.",
      technologies: ["CSV Parsing", "JavaScript", "HTML & CSS", "Data Visualization"],
      category: "Frontend",
      icon: Database,
      gradient: "from-yellow-500 to-orange-500",
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const categoryColors = {
    "AI/ML": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Web/AI": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Cybersecurity": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Full Stack": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Integration": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    "Frontend": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  };

  // Fixed Countdown Timer Logic - 858 days FROM June 26, 2025
  useEffect(() => {
    const startDate = new Date('2025-06-26T00:00:00Z');
    const totalDays = 858;
    
    // Calculate target date (858 days AFTER June 26, 2025)
    const targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + totalDays);
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Countdown finished
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute top-32 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-7xl font-bold font-mono mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-cyan-400">ls</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              projects/
            </span>
            <span className="text-cyan-400"> --all</span>
          </h2>
          <p className={`text-xl text-gray-400 mb-6 font-mono transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <a 
              href="https://github.com/kishlayamishra02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
            >
              Visit my GitHub Universe
            </a>
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Simple Countdown Timer */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative bg-black/40 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl max-w-4xl mx-auto hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-bold font-mono text-cyan-400">
                  Final Oppournity, Now or Never
                </h3>
                <Clock className="w-6 h-6 text-cyan-400 ml-3" />
              </div>
              
              <p className="text-gray-300 font-mono mb-8">
                When this timer ends, something has to change 🔥
                <br />
                <span className="text-cyan-400 text-sm">Still becoming 😟 • Just like me 😢</span> {/* june 26 2025 started*/}
              </p>

              {/* Countdown Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {[
                  { label: 'DAYS', value: timeLeft.days, color: 'from-cyan-500 to-blue-500' },
                  { label: 'HOURS', value: timeLeft.hours, color: 'from-purple-500 to-pink-500' },
                  { label: 'MINUTES', value: timeLeft.minutes, color: 'from-emerald-500 to-cyan-500' },
                  { label: 'SECONDS', value: timeLeft.seconds, color: 'from-orange-500 to-red-500' }
                ].map((unit, index) => (
                  <div key={index} className="relative">
                    <div className={`bg-gradient-to-r ${unit.color} p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-transform duration-300`}>
                      <div className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
                        {unit.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm font-mono font-bold text-white/80">
                        {unit.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4 text-gray-400 font-mono text-sm">
                <Calendar className="w-4 h-4" />
                <span>Real-time • Always updating • Never stops</span>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold font-mono mb-8 text-center transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-cyan-400">Featured</span>{' '}
            <span className="text-white">Projects</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-black/40 border-2 border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                  style={{ transitionDelay: `${(index + 3) * 200}ms` }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Holographic Header */}
                  <div className={`h-3 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                  
                  <div className="p-8">
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`relative p-4 rounded-xl bg-gradient-to-r ${project.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                        <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-mono border ${categoryColors[project.category as keyof typeof categoryColors]}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors font-mono">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-mono hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex space-x-4">
                      <a
                        href={project.demoUrl}
                        className={`flex-1 bg-gradient-to-r ${project.gradient} text-white py-3 px-6 rounded-xl font-mono font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:scale-105`}
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex-1 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 py-3 px-6 rounded-xl font-mono font-medium hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300 flex items-center justify-center group-hover:scale-105"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Source
                      </a>
                    </div>
                  </div>

                  {/* Holographic Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold font-mono mb-8 text-center transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-purple-400">Other</span>{' '}
            <span className="text-white">Projects</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-black/40 border border-gray-700/50 rounded-xl p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                  style={{ transitionDelay: `${(index + 7) * 100}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-mono border ${categoryColors[project.category as keyof typeof categoryColors]}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors font-mono">
                    {project.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex space-x-2">
                    <a
                      href={project.demoUrl}
                      className="flex-1 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 py-2 px-3 rounded-lg text-sm font-mono hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex-1 bg-gray-900/50 border border-gray-600 text-gray-400 py-2 px-3 rounded-lg text-sm font-mono hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GitHub CTA with Portfolio Mention */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative bg-black/40 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl max-w-2xl mx-auto hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <Github className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
              <h3 className="text-2xl font-bold mb-4 font-mono text-white">
                <span className="text-cyan-400">Explore</span>{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  More Projects
                </span>
              </h3>
              <p className="text-gray-300 mb-4 font-mono">
                Dive deeper into my complete portfolio of projects, contributions, and open-source work.
              </p>
              <p className="text-emerald-400 mb-6 font-mono text-lg font-bold">
                🚀 This portfolio itself is my biggest project till now! ^_^
              </p>
              <a
                href="https://github.com/kishlayamishra02"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-mono font-bold text-black text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View GitHub Profile
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;