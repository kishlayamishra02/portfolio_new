import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Shield, Brain, Wrench, Users, BarChart3, Zap, Star, Cpu, Sparkles } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeOrbit, setActiveOrbit] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      color: "from-emerald-500 to-cyan-500",
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 90 },
        { name: "JavaScript", level: 88 }
      ]
    },
    {
      title: "AI/ML & Data",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Prompt Engineering", level: 94 },
        { name: "Machine Learning", level: 88 },
        { name: "Google Colab", level: 85 }
      ]
    },
    {
      title: "Web Development",
      icon: Zap,
      color: "from-cyan-500 to-teal-500",
      skills: [
        { name: "React", level: 82 },
        { name: "Express.js", level: 80 },
        { name: "MongoDB", level: 78 }
      ]
    },
    {
      title: "Security & Tools",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Cybersecurity", level: 82 },
        { name: "SDLC & STLC", level: 85 },
        { name: "Problem Solving", level: 90 }
      ]
    }
  ];

  const allSkills = [
    { 
      name: "Python", 
      level: 95, 
      category: "Languages", 
      color: "#10b981", 
      description: "Versatile language for AI/ML, web development, and automation. Expert in data science libraries and frameworks.",
      orbit: 0,
      angle: 0
    },
    { 
      name: "Java", 
      level: 90, 
      category: "Languages", 
      color: "#06b6d4", 
      description: "Object-oriented programming for enterprise applications. Strong foundation in Spring framework.",
      orbit: 0,
      angle: Math.PI * 2 / 3
    },
    { 
      name: "JavaScript", 
      level: 88, 
      category: "Languages", 
      color: "#f59e0b", 
      description: "Dynamic language for web development and modern applications. ES6+ and Node.js expertise.",
      orbit: 0,
      angle: Math.PI * 4 / 3
    },
    { 
      name: "React", 
      level: 82, 
      category: "Frameworks", 
      color: "#3b82f6", 
      description: "Component-based library for building user interfaces. Hooks, Context API, and modern patterns.",
      orbit: 1,
      angle: 0
    },
    { 
      name: "Express.js", 
      level: 80, 
      category: "Frameworks", 
      color: "#14b8a6", 
      description: "Fast, minimalist web framework for Node.js. RESTful APIs and middleware expertise.",
      orbit: 1,
      angle: Math.PI * 2 / 4
    },
    { 
      name: "MongoDB", 
      level: 78, 
      category: "Databases", 
      color: "#eab308", 
      description: "NoSQL document database for modern applications. Aggregation pipelines and indexing.",
      orbit: 1,
      angle: Math.PI
    },
    { 
      name: "Machine Learning", 
      level: 88, 
      category: "AI/ML", 
      color: "#a855f7", 
      description: "Building predictive models and intelligent systems. TensorFlow, scikit-learn expertise.",
      orbit: 1,
      angle: Math.PI * 3 / 2
    },
    { 
      name: "Prompt Engineering", 
      level: 94, 
      category: "AI/ML", 
      color: "#ec4899", 
      description: "Crafting effective prompts for AI language models. Advanced techniques and optimization.",
      orbit: 2,
      angle: 0
    },
    { 
      name: "Cybersecurity", 
      level: 82, 
      category: "Security", 
      color: "#f97316", 
      description: "Protecting systems and data from digital threats. Penetration testing and security protocols.",
      orbit: 2,
      angle: Math.PI * 2 / 5
    },
    { 
      name: "Google Colab", 
      level: 85, 
      category: "Tools", 
      color: "#8b5cf6", 
      description: "Interactive computing environment for data science and ML. Jupyter notebooks and GPU acceleration.",
      orbit: 2,
      angle: Math.PI * 4 / 5
    },
    { 
      name: "Problem Solving", 
      level: 90, 
      category: "Soft Skills", 
      color: "#6366f1", 
      description: "Analytical thinking and algorithmic problem-solving. Data structures and algorithms expertise.",
      orbit: 2,
      angle: Math.PI * 6 / 5
    },
    { 
      name: "SDLC & STLC", 
      level: 85, 
      category: "Soft Skills", 
      color: "#8b5cf6", 
      description: "Software development and testing lifecycle methodologies. Agile and DevOps practices.",
      orbit: 2,
      angle: Math.PI * 8 / 5
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

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOrbit((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced 3D Skills Visualization with Reduced Lighting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 700;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const orbits = [
      { radius: 140, speed: 0.8, particles: 12 }, // Reduced particles
      { radius: 200, speed: 0.6, particles: 10 },
      { radius: 260, speed: 0.4, particles: 8 }
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePos({ x: e.clientX, y: e.clientY });

      let foundSkill = null;
      allSkills.forEach(skill => {
        const orbit = orbits[skill.orbit];
        const currentAngle = skill.angle + timeRef.current * orbit.speed * 0.01;
        const skillX = centerX + Math.cos(currentAngle) * orbit.radius;
        const skillY = centerY + Math.sin(currentAngle) * orbit.radius;
        const skillSize = 30 + (skill.level / 100) * 25;
        
        const distance = Math.sqrt((x - skillX) ** 2 + (y - skillY) ** 2);
        if (distance < skillSize + 20) {
          foundSkill = skill;
        }
      });
      
      setHoveredSkill(foundSkill);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      timeRef.current += 1;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle quantum field background - REDUCED INTENSITY
      ctx.fillStyle = 'rgba(16, 185, 129, 0.008)'; // Much more subtle
      for (let i = 0; i < 30; i++) { // Fewer particles
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw enhanced orbital paths with REDUCED energy waves
      orbits.forEach((orbit, index) => {
        const isActive = activeOrbit === index;
        
        // Main orbital ring - REDUCED OPACITY
        ctx.strokeStyle = isActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.15)'; // Much more subtle
        ctx.lineWidth = isActive ? 3 : 1; // Thinner lines
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Energy particles on orbit - REDUCED INTENSITY
        for (let i = 0; i < orbit.particles; i++) {
          const angle = (i / orbit.particles) * Math.PI * 2 + timeRef.current * orbit.speed * 0.02;
          const x = centerX + Math.cos(angle) * orbit.radius;
          const y = centerY + Math.sin(angle) * orbit.radius;
          
          ctx.fillStyle = isActive ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.3)'; // More subtle
          ctx.beginPath();
          ctx.arc(x, y, isActive ? 2 : 1, 0, Math.PI * 2); // Smaller particles
          ctx.fill();
          
          // Remove glow effect for non-hovered state
          if (isActive && hoveredSkill) {
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 5; // Reduced blur
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });
      
      ctx.setLineDash([]);

      // Draw quantum core with REDUCED pulsing energy
      const coreSize = 50 + Math.sin(timeRef.current * 0.05) * 8; // Smaller variation
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
      coreGradient.addColorStop(0, '#10b981');
      coreGradient.addColorStop(0.3, '#06b6d4');
      coreGradient.addColorStop(0.6, '#3b82f6');
      coreGradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)'); // Much more subtle
      
      // Core energy field - REDUCED GLOW
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = hoveredSkill ? 25 : 15; // Only intense when hovering
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core text with holographic effect
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeText('NEURAL', centerX, centerY - 6);
      ctx.strokeText('CORE', centerX, centerY + 10);
      ctx.fillText('NEURAL', centerX, centerY - 6);
      ctx.fillText('CORE', centerX, centerY + 10);

      // Draw skills as quantum orbs with CONDITIONAL LIGHTING
      allSkills.forEach(skill => {
        const orbit = orbits[skill.orbit];
        const currentAngle = skill.angle + timeRef.current * orbit.speed * 0.01;
        const x = centerX + Math.cos(currentAngle) * orbit.radius;
        const y = centerY + Math.sin(currentAngle) * orbit.radius;
        
        const baseSize = 28 + (skill.level / 100) * 22;
        const isHovered = hoveredSkill === skill;
        const skillSize = isHovered ? baseSize * 1.5 : baseSize;

        // Quantum trail effect - ONLY ON HOVER
        if (isHovered) {
          ctx.strokeStyle = skill.color + '60';
          ctx.lineWidth = 4;
          ctx.beginPath();
          for (let i = 0; i < 15; i++) {
            const trailAngle = currentAngle - (i / 15) * 1.0;
            const trailX = centerX + Math.cos(trailAngle) * orbit.radius;
            const trailY = centerY + Math.sin(trailAngle) * orbit.radius;
            const alpha = (15 - i) / 15;
            ctx.globalAlpha = alpha * 0.7;
            if (i === 0) {
              ctx.moveTo(trailX, trailY);
            } else {
              ctx.lineTo(trailX, trailY);
            }
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Quantum connection to core - ONLY ON HOVER
        if (isHovered) {
          ctx.strokeStyle = skill.color + '80';
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Skill orb with CONDITIONAL quantum effects
        ctx.shadowColor = skill.color;
        ctx.shadowBlur = isHovered ? 40 : 8; // Much less glow when not hovered
        
        const skillGradient = ctx.createRadialGradient(x, y, 0, x, y, skillSize);
        skillGradient.addColorStop(0, skill.color);
        skillGradient.addColorStop(0.4, skill.color + (isHovered ? 'CC' : 'AA'));
        skillGradient.addColorStop(0.8, skill.color + (isHovered ? '66' : '44'));
        skillGradient.addColorStop(1, skill.color + (isHovered ? '20' : '10'));
        
        ctx.fillStyle = skillGradient;
        ctx.beginPath();
        ctx.arc(x, y, skillSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Skill name with enhanced visibility
        ctx.fillStyle = '#ffffff';
        ctx.font = isHovered ? 'bold 13px monospace' : 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const displayName = skill.name.length > 10 
          ? skill.name.split(' ').map(word => word[0]).join('')
          : skill.name;
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeText(displayName, x, y);
        ctx.fillText(displayName, x, y);

        // Quantum proficiency ring - ENHANCED ON HOVER
        ctx.strokeStyle = skill.color;
        ctx.lineWidth = isHovered ? 5 : 2; // Thinner when not hovered
        ctx.beginPath();
        ctx.arc(x, y, skillSize + 12, -Math.PI / 2, -Math.PI / 2 + (skill.level / 100) * Math.PI * 2);
        ctx.stroke();

        // Level indicator for hovered skill
        if (isHovered) {
          ctx.fillStyle = skill.color;
          ctx.font = 'bold 11px monospace';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeText(`${skill.level}%`, x, y + skillSize + 28);
          ctx.fillText(`${skill.level}%`, x, y + skillSize + 28);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredSkill, activeOrbit]);

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Quantum Background - REDUCED INTENSITY */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/10 via-transparent to-cyan-900/10"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-7xl font-bold font-mono mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-emerald-400">quantum</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              skills
            </span>
            <span className="text-emerald-400">.exe</span>
          </h2>
          <p className={`text-xl text-gray-400 mb-6 font-mono transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            Neural network of technological expertise
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Skill Categories Matrix */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-black/40 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl hover:border-emerald-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Holographic Header - ONLY ON HOVER */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                    {/* Glow effect ONLY ON HOVER */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-6 font-mono group-hover:text-emerald-400 transition-colors">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-300 font-mono">
                            {skill.name}
                          </span>
                          <span className="text-sm font-bold text-emerald-400 font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${(index * 100) + (skillIndex * 200)}ms`,
                              // Glow effect ONLY ON HOVER
                              boxShadow: `0 0 ${category.color.includes('emerald') ? '8px' : '6px'} ${category.color.includes('emerald') ? '#10b98140' : category.color.includes('purple') ? '#a855f740' : category.color.includes('cyan') ? '#06b6d440' : '#f9731640'}`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quantum Skills Visualization */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} ref={containerRef}>
          <h3 className="text-3xl font-bold text-white mb-8 text-center font-mono">
            <span className="text-emerald-400">Neural</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Network
            </span>{' '}
            <span className="text-emerald-400">Visualization</span>
          </h3>
          
          <div className="relative bg-black/40 border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-xl overflow-hidden hover:border-emerald-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20">
            {/* Quantum Grid Background - REDUCED OPACITY */}
            <div className="absolute inset-0 opacity-5"> {/* Much more subtle */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}
              ></div>
            </div>
            
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-pointer relative z-10"
              style={{ maxHeight: '700px' }}
            />
            
            <div className="absolute bottom-4 left-4 text-gray-400 text-xs font-mono flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4" />
                <span>Skills Neural Network</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Skills Matrix</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Hover for Enhanced Details</span>
              </div>
            </div>
            
            {/* Enhanced Hover Tooltip */}
            {hoveredSkill && (
              <div 
                className="fixed bg-black/95 border-2 border-emerald-500/70 rounded-xl p-6 shadow-2xl pointer-events-none max-w-sm backdrop-blur-md z-50"
                style={{
                  left: mousePos.x + 20,
                  top: mousePos.y - 140,
                  transform: mousePos.x > window.innerWidth - 400 ? 'translateX(-100%) translateX(-40px)' : 'none',
                }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-6 h-6 rounded-full mr-3 shadow-lg animate-pulse"
                    style={{ 
                      backgroundColor: hoveredSkill.color,
                      boxShadow: `0 0 20px ${hoveredSkill.color}80`
                    }}
                  ></div>
                  <h4 className="text-white font-mono font-bold text-lg">{hoveredSkill.name}</h4>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 font-mono leading-relaxed">
                  {hoveredSkill.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-emerald-400 text-sm font-mono bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    {hoveredSkill.category}
                  </span>
                  <span className="text-emerald-400 text-lg font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded">
                    {hoveredSkill.level}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-600">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700 shadow-lg relative overflow-hidden"
                    style={{ 
                      width: `${hoveredSkill.level}%`,
                      boxShadow: '0 0 15px rgba(16, 185, 129, 0.8)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quantum Stats Dashboard */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "12+", label: "Technologies", icon: Code, color: "from-emerald-400 to-cyan-500" },
              { value: "95%", label: "Max Proficiency", icon: Brain, color: "from-purple-400 to-pink-500" },
              { value: "4", label: "Core Domains", icon: Zap, color: "from-cyan-400 to-teal-500" },
              { value: "∞", label: "Learning Mode", icon: Sparkles, color: "from-orange-400 to-red-500" }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-black/40 border border-gray-700 rounded-xl p-6 text-center backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105"
              >
                {/* Glow effect ONLY ON HOVER */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                    {/* Glow effect ONLY ON HOVER */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}></div>
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold font-mono mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-mono text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;