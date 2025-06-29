import React, { useState, useEffect } from 'react';
import { Brain, Heart, Code, Zap } from 'lucide-react';

const About = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const funFacts = [
    "Can debug code and cheer up friends before breakfast ☕",
    "Collects certifications like rare Pokemon cards 🎓",
    "Ctrl+Z expert in life and code ↩️",
    "Dreams in binary and wakes up in Java ☕",
    "Believes every problem has a recursive solution 🔄",
    "Can explain AI to both computers and grandparents 🤖",
    "My best code was written in emotional damage mode 😐💔",
    "Known for terrible puns and great code 😄",
    "Knows the difference between == and === in relationships 😅",
    "Silent superhero in a hoodie 🦸‍♂️",
    "Dark mode is my only personality 🌚",
    "Turns coffee into algorithms ⚡",
    "Still don't know - How to center a 'div' in 2025 😮‍💨",
    "If life throws exceptions, I catch them all 🧯",
    "Speaks fluent Python and broken English 🐍",
    "Kuch bhi ho jaye, deploy Friday ko nahi karega bhai 😤",
    "Pushes code and karma with same energy ⚡🧘",
    "Professional bug whisperer 🐛",
    "Lives on Stack Overflow and Google 📚",
    "Professional midnight coder 🌙",
    "Git commit message poet 📝",
    "Thinks in loops and speaks in functions 🔁",
    "Writes CSS that even Chrome respects 💅",
    "Has more Git branches than social plans 🌿",
    "Can turn a null pointer into a full stack 🙃",
    "Writes bugs professionally, fixes them recreationally 🐞",
    "Treats semicolons like punctuation in life ;)",
    "Can seduce AI models with clean data sets 🤖❤️",
    "Reads changelogs like bedtime stories 📜",
    "Code bhi karta hoon, bhai bhi hoon 😎",
    "Bug fix karte karte chai bhi bana deta hoon ☕🛠️",
    "Chappal me hole ho sakta hai, code me nahi 🩴🚫",
    "Main code karne aaya hoon, compromise nahi 🚀",
    "Feeds strays and ships features with love 🐾💻",
    "Organizes fundraisers like they're sprint reviews 💸✅",
    "Can CSS a webpage and clothe a stranger 👕",
    "Debugs errors and discrimination both 👊",
    "Cares for commits and communities equally 💙",
    "Can crash code and survive on Maggi 🍜💥",
    "Thinks API docs are optional until they're not 📚😵",
    "My repo is cleaner than my room 🧼📁",
    "Will panic, then fix it perfectly 🧠🔥",
    "Tried to fix a bug and ended up fixing my life 🧘‍♂️",
    "Says 'interesting' when everything is on fire 🔥🙂",
    "Accidentally deleted prod once. Learned a lot. 🤡"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [funFacts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className={`text-3xl sm:text-5xl md:text-7xl font-bold font-mono mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-cyan-400">class</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AboutMe
            </span>
            <span className="text-cyan-400"> {`{`}</span>
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          {/* Main Bio */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="group relative bg-black/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4 sm:mb-6 font-mono">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mr-2 sm:mr-3" />
                  <span className="text-cyan-400 text-sm sm:text-base">constructor()</span>
                  <span className="text-white ml-2">{`{`}</span>
                </div>
                
                <div className="space-y-4 sm:space-y-6 text-gray-300 leading-relaxed pl-4 sm:pl-8">
                  <p className="text-base sm:text-lg">
                    <span className="text-purple-400 font-mono">this.name = </span>
                    <span className="text-yellow-400">"Kishlaya Mishra"</span>;
                  </p>
                  <p className="text-base sm:text-lg">
                    <span className="text-purple-400 font-mono">this.university = </span>
                    <span className="text-yellow-400">"BITS Pilani"</span>;
                  </p>
                  <p className="text-base sm:text-lg">
                    <span className="text-purple-400 font-mono">this.specializations = </span>
                    <span className="text-yellow-400">[</span>
                    <span className="text-green-400">"AI/ML"</span>,
                    <span className="text-green-400"> "Full-Stack"</span>,
                    <span className="text-green-400"> "Cybersecurity"</span>
                    <span className="text-yellow-400">]</span>;
                  </p>
                  <p className="text-base sm:text-lg">
                    <span className="text-purple-400 font-mono">this.mission = </span>
                    <span className="text-yellow-400">"Building solutions that matter"</span>;
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pl-4 sm:pl-8 space-y-3 sm:space-y-4 text-gray-300">
                  <p className="text-base sm:text-lg leading-relaxed">
                    My journey in tech is driven by an insatiable curiosity and a passion for creating meaningful impact. 
                    Whether it's developing AI models that can classify images with precision, building secure web applications, 
                    or implementing cybersecurity protocols, I approach each project with the same enthusiasm and attention to detail.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Outside of code, I'm the go-to person for friends' tech crises, community fundraising, and caring for stray animals — 
                    because solving problems doesn't end at the keyboard. I believe in using technology not just to build products, 
                    but to build a better world.
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 font-mono text-white">
                  <span>{`}`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts Hologram */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="group relative bg-black/40 border border-purple-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl h-full hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
              {/* Holographic Header */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-purple-400 text-xs sm:text-sm font-mono ml-3 sm:ml-4">random_facts.exe</span>
              </div>

              <div className="font-mono text-purple-400 text-xs sm:text-sm mb-3 sm:mb-4">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                ./generate_fun_fact.sh
              </div>

              <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg animate-pulse"></div>
                <p className="relative z-10 text-gray-300 leading-relaxed transition-all duration-500 ease-in-out font-mono text-xs sm:text-sm px-2">
                  {funFacts[currentFactIndex]}
                </p>
              </div>

              <div className="flex justify-center mt-4 sm:mt-6">
                <div className="flex space-x-1 sm:space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        i === currentFactIndex % 5
                          ? 'bg-purple-400 shadow-lg shadow-purple-400/50'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center mt-3 sm:mt-4">
                <span className="text-gray-500 text-xs font-mono">Auto-updating every 4s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className={`mt-12 sm:mt-16 md:mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: "15+", label: "Projects", icon: Code, color: "from-cyan-400 to-blue-500" },
              { value: "12+", label: "Certifications", icon: Brain, color: "from-purple-400 to-pink-500" },
              { value: "4+", label: "Internships", icon: Zap, color: "from-green-400 to-emerald-500" },
              { value: "24/7", label: "Learning", icon: Heart, color: "from-orange-400 to-red-500" }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-black/40 border border-gray-700 rounded-xl p-4 sm:p-6 text-center backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-1 sm:mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-mono text-xs sm:text-sm">
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

export default About;