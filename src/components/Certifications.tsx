import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, Calendar, Building, Shield, Star, Trophy, Zap, CheckCircle, Crown } from 'lucide-react';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const certifications = [
    {
      title: "Front-End Software Engineering",
      issuer: "Skyscanner",
      date: "2024",
      category: "Web Development",
      description: "Advanced front-end development practices and modern web technologies",
      level: "Intermediate",
      verified: true,
      verificationUrl: "https://www.linkedin.com/in/kishlayamishra/details/experience/"
    },
    {
      title: "Prompt Engineering Specialization",
      issuer: "Vanderbilt University",
      date: "2024",
      category: "AI/ML",
      description: "Comprehensive training in AI prompt design and optimization techniques",
      level: "Specialization",
      verified: true,
      verificationUrl: "https://coursera.org/verify/specialization/W9VWKCHWIZZM"
    },
    {
      title: "Professional Certificate in Artificial Intelligence",
      issuer: "Harvard University",
      date: "2024",
      category: "AI/ML",
      description: "Comprehensive AI fundamentals and practical applications",
      level: "Professional",
      verified: true,
      verificationUrl: "https://credentials.edx.org/credentials/2895f9977ad8460e82dda1d82f963ca2/"
    },
    {
      title: "Professional Certificate in Data Science",
      issuer: "Harvard University",
      date: "2024",
      category: "Data Science",
      description: "Statistical analysis, machine learning, and data visualization",
      level: "Professional",
      verified: true,
      verificationUrl: "https://credentials.edx.org/credentials/5fb46872424f4bbf9d3425d480d2d378/"
    },
    {
      title: "Programming with Generative AI",
      issuer: "IIT Guwahati",
      date: "2024",
      category: "AI/ML",
      description: "Useful techniques in generative AI and programming applications",
      level: "Foundation",
      verified: true,
      verificationUrl: "https://coursera.org/verify/EFYFEMIL9AMD"
    },
    {
      title: "Cybersecurity Analyst",
      issuer: "Mastercard",
      date: "2023",
      category: "Security",
      description: "Cybersecurity fundamentals and threat analysis methodologies",
      level: "Foundation",
      verified: true,
      verificationUrl: "https://www.linkedin.com/in/kishlayamishra/details/experience/"
    },
    {
      title: "MySQL for Data Engineering",
      issuer: "Duke University",
      date: "2023",
      category: "Database",
      description: "Basic database design and data engineering with MySQL",
      level: "Intermediate",
      verified: true,
      verificationUrl: "https://coursera.org/verify/VIXCOU9SWKNT"
    },
    {
      title: "AI Powered Data Analysis",
      issuer: "University of Michigan",
      date: "2023",
      category: "AI/ML",
      description: "Leveraging AI for advanced data analysis and insights",
      level: "Foundation",
      verified: true,
      verificationUrl: "https://coursera.org/verify/AFRR5UH3WBT8"
    },
    {
      title: "Developer and Technology",
      issuer: "Accenture",
      date: "2023",
      category: "Technology",
      description: "Modern development practices and technology trends",
      level: "Professional",
      verified: true,
      verificationUrl: "https://www.linkedin.com/in/kishlayamishra/details/experience/"
    },
    {
      title: "Effective Leadership",
      issuer: "HP Life",
      date: "2023",
      category: "Leadership",
      description: "Leadership principles and team management strategies",
      level: "Foundation",
      verified: true,
      verificationUrl: "https://www.life-global.org/certificate/93b3fc89-ee2f-43ed-8281-d0b96e1174e8"
    },
    {
      title: "Rocket Science for Everyone",
      issuer: "Yale University",
      date: "2023",
      category: "Science",
      description: "Fundamentals of space, engineering and rocket science",
      level: "Foundation",
      verified: true,
      verificationUrl: "https://www.coursera.org/account/accomplishments/verify/LV97DTZ14F85"
    },
    {
      title: "Social Work",
      issuer: "University of Alaska Fairbanks",
      date: "2023",
      category: "Social Impact",
      description: "Community service and social impact methodologies",
      level: "Professional",
      verified: true,
      verificationUrl: "https://courses.edx.org/certificates/4b90b114f5444c8dbcc77e6ca7346c71"
    }
  ];

  const categories = ['All', 'AI/ML', 'Web Development', 'Security', 'Data Science', 'Database', 'Technology', 'Leadership', 'Science', 'Social Impact'];

  const categoryColors = {
    "Web Development": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "AI/ML": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Data Science": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Security": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Database": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "Technology": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    "Leadership": "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "Science": "bg-red-500/20 text-red-400 border-red-500/30",
    "Social Impact": "bg-teal-500/20 text-teal-400 border-teal-500/30"
  };

  const levelColors = {
    "Professional": "from-emerald-500 to-cyan-500",
    "Specialization": "from-purple-500 to-pink-500",
    "Advanced": "from-orange-500 to-red-500",
    "Foundation": "from-blue-500 to-indigo-500",
    "Intermediate": "from-yellow-500 to-red-500"
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI/ML":
      case "Data Science":
        return "🧠";
      case "Web Development":
        return "💻";
      case "Security":
        return "🔒";
      case "Database":
        return "🗄️";
      case "Leadership":
        return "👥";
      case "Science":
        return "🚀";
      case "Social Impact":
        return "🤝";
      default:
        return "⚡";
    }
  };

  const filteredCertifications = activeFilter === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('certifications');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="py-32 relative overflow-hidden">
      {/* Quantum Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-7xl font-bold font-mono mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-orange-400">digital</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              credentials
            </span>
            <span className="text-orange-400">.vault</span>
          </h2>
          <p className={`text-xl text-gray-400 mb-6 font-mono transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <a 
              href="https://www.linkedin.com/in/kishlayamishra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors hover:underline"
            >
              Verified achievements across multiple domains
            </a>
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Achievement Stats Dashboard */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="group relative bg-black/40 border border-orange-500/30 rounded-xl p-6 text-center backdrop-blur-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-xl"></div>
              </div>
              <div className="text-4xl font-bold text-orange-400 mb-2 font-mono">19+</div>
              <div className="text-gray-400 font-mono text-sm">Total Certifications</div>
            </div>
          </div>
          
          <div className="group relative bg-black/40 border border-purple-500/30 rounded-xl p-6 text-center backdrop-blur-xl hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-xl"></div>
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2 font-mono">5</div>
              <div className="text-gray-400 font-mono text-sm">AI/ML Focused</div>
            </div>
          </div>
          
          <div className="group relative bg-black/40 border border-cyan-500/30 rounded-xl p-6 text-center backdrop-blur-xl hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-xl"></div>
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2 font-mono">8</div>
              <div className="text-gray-400 font-mono text-sm">Universities</div>
            </div>
          </div>
          
          <div className="group relative bg-black/40 border border-emerald-500/30 rounded-xl p-6 text-center backdrop-blur-xl hover:border-emerald-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-xl"></div>
              </div>
              <div className="text-4xl font-bold text-emerald-400 mb-2 font-mono">100%</div>
              <div className="text-gray-400 font-mono text-sm">Verified</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-mono text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-black/40 border border-gray-700 text-gray-400 hover:border-orange-500/50 hover:text-orange-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {filteredCertifications.map((cert, index) => (
            <a
              key={index}
              href={cert.verificationUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105 cursor-pointer block"
              onMouseEnter={() => setHoveredCert(index)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              {/* Holographic Header */}
              <div className={`h-2 bg-gradient-to-r ${levelColors[cert.level as keyof typeof levelColors]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
              
              <div className="p-8">
                {/* Header with Icon and Category */}
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{getCategoryIcon(cert.category)}</div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono border ${categoryColors[cert.category as keyof typeof categoryColors]}`}>
                      {cert.category}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-xs font-mono bg-gradient-to-r ${levelColors[cert.level as keyof typeof levelColors]} text-white`}>
                      {cert.level}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors font-mono leading-tight">
                  {cert.title}
                </h3>

                {/* Issuer and Date */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-400">
                    <Building className="w-5 h-5 mr-3 flex-shrink-0 text-orange-400" />
                    <span className="text-sm font-medium font-mono">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-5 h-5 mr-3 flex-shrink-0 text-purple-400" />
                    <span className="text-sm font-mono">{cert.date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Verification and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-emerald-400">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="text-sm font-mono font-medium">Verified</span>
                  </div>
                  <button className="group/btn relative p-3 bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 rounded-xl text-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                    <ExternalLink className="w-5 h-5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>

              {/* Holographic Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${levelColors[cert.level as keyof typeof levelColors]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              
              {/* Hover Glow Effect */}
              {hoveredCert === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative bg-black/40 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-xl max-w-2xl mx-auto hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-purple-500 flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 blur-xl opacity-50 rounded-2xl"></div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4 font-mono text-white">
                <span className="text-orange-400">Explore</span>{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Complete
                </span>{' '}
                <span className="text-orange-400">Portfolio</span>
              </h3>
              
              <p className="text-gray-300 mb-8 font-mono text-lg">
                Connect with me on LinkedIn for detailed certification verification and professional networking.
              </p>
              
              <a
                href="https://www.linkedin.com/in/kishlayamishra"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl font-mono font-bold text-white text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-3" />
                  View LinkedIn Profile
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;