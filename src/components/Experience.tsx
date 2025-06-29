import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink, Building, Code, Briefcase } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences = [
    {
      company: "Microsoft | TechSaksham",
      role: "AI Research Intern",
      period: "2024",
      location: "Remote",
      description: "Developed image classification systems using advanced machine learning algorithms. Worked on computer vision projects and implemented deep learning models for real-world applications.",
      technologies: ["Python", "TensorFlow", "OpenCV", "Machine Learning"],
      type: "internship",
      color: "from-blue-500 to-cyan-500"
    },
    {
      company: "NxtJob.ai",
      role: "HR Operations Intern",
      period: "2024",
      location: "Remote",
      description: "Helped clients find jobs and land interviews through strategic guidance and process optimization. Streamlined recruitment workflows and improved candidate matching algorithms.",
      technologies: ["Data Analysis", "Process Optimization", "Client Relations"],
      type: "internship",
      color: "from-purple-500 to-pink-500"
    },
    {
      company: "IBM | Edunet Foundation",
      role: "Cybersecurity Intern",
      period: "2023",
      location: "Remote",
      description: "Implemented security protocols with data hiding techniques. Developed steganography tools and worked on digital forensics projects to enhance data protection.",
      technologies: ["Cybersecurity", "Steganography", "Digital Forensics", "Python"],
      type: "internship",
      color: "from-green-500 to-emerald-500"
    },
    {
      company: "EY | AICTE",
      role: "MERN Stack Developer Intern",
      period: "2023",
      location: "Remote",
      description: "Built full-stack web applications with modern frameworks. Developed responsive user interfaces and implemented robust backend APIs for various client projects.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      type: "internship",
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('experience');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [experiences.length]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-7xl font-bold font-mono mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-cyan-400">git</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              log
            </span>{' '}
            <span className="text-cyan-400">--experience</span>
          </h2>
          <p className={`text-xl text-gray-400 mb-6 font-mono transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            Always trying something different :)
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Interactive Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/50"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Node */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} shadow-lg z-20 ${
                  activeIndex === index ? 'scale-150 shadow-2xl' : 'scale-100'
                } transition-all duration-500`}>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.color} blur-lg opacity-50 ${
                    activeIndex === index ? 'scale-150' : 'scale-100'
                  } transition-all duration-500`}></div>
                </div>

                {/* Experience Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} ml-8 md:ml-0`}>
                  <div className={`group relative bg-black/40 border-2 ${
                    activeIndex === index ? `border-cyan-500/60 shadow-2xl shadow-cyan-500/20` : 'border-gray-700/50'
                  } rounded-2xl p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105`}>
                    
                    {/* Holographic Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-5 rounded-2xl transition-opacity duration-500 ${
                      activeIndex === index ? 'opacity-10' : 'group-hover:opacity-10'
                    }`}></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors">
                            {exp.company}
                          </h3>
                          <h4 className={`text-xl font-semibold mb-3 font-mono bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.role}
                          </h4>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-mono border bg-gradient-to-r ${exp.color} bg-clip-text text-transparent border-current`}>
                          <Briefcase className="w-4 h-4 inline mr-2" />
                          {exp.type}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center text-gray-400 mb-6 space-x-6 font-mono text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-3">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-4 py-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-mono hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative bg-black/40 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl max-w-2xl mx-auto hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <Code className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
              <h3 className="text-2xl font-bold mb-4 font-mono text-white">
                <span className="text-cyan-400">Ready to</span>{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Collaborate?
                </span>
              </h3>
              <p className="text-gray-300 mb-6 font-mono">
                I'm always open to discussing new opportunities and innovative projects.
              </p>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-mono font-bold text-black text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Let's Connect
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;