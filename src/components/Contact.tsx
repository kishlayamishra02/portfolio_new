import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, MessageSquare, Zap, Globe, Heart } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xblyoyob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kishlayamishra@gmail.com",
      href: "mailto:kishlayamishra@gmail.com",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8000363769",
      href: "tel:+918000363769",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Sujangarh, Rajasthan, India",
      href: "#",
      color: "from-orange-500 to-red-500"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/kishlayamishra02",
      color: "from-gray-600 to-gray-800",
      hoverColor: "hover:from-emerald-500 hover:to-cyan-500"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kishlayamishra",
      color: "from-blue-600 to-blue-800",
      hoverColor: "hover:from-cyan-500 hover:to-purple-500"
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

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Quantum Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900/20 via-transparent to-emerald-900/20"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-7xl font-bold font-mono mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-cyan-400">quantum</span>{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              connect
            </span>
            <span className="text-cyan-400">.init()</span>
          </h2>
          <p className={`text-xl text-gray-400 mb-6 font-mono transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            Let's build something extraordinary together
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-emerald-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="relative bg-black/40 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-6 font-mono">
                  <span className="text-cyan-400">{'>'}</span> Let's Connect
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, innovative projects, and ways to make a positive impact through technology. Whether you're looking for a collaborator, have a question about my work, or just want to say hello, I'd love to hear from you.
                </p>

                {/* Contact Details */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="group flex items-center p-6 bg-black/40 border border-gray-700/50 rounded-xl backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-white" />
                          <div className={`absolute inset-0 bg-gradient-to-r ${info.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-400 font-mono mb-1">
                            {info.label}
                          </div>
                          <div className="text-lg font-semibold text-white font-mono group-hover:text-cyan-400 transition-colors">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-white mb-6 font-mono">
                    <span className="text-cyan-400">{'>'}</span> Follow My Journey
                  </h4>
                  <div className="flex space-x-6">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group relative w-16 h-16 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110`}
                          title={social.label}
                        >
                          <IconComponent className="w-8 h-8 text-white relative z-10" />
                          <div className={`absolute inset-0 bg-gradient-to-r ${social.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}></div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative bg-black/40 border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-emerald-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white font-mono">
                    <span className="text-emerald-400">{'>'}</span> Send Message
                  </h3>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-8 p-6 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex items-center animate-pulse">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mr-4" />
                    <div>
                      <div className="text-emerald-400 font-mono font-bold">Message Sent Successfully!</div>
                      <div className="text-emerald-300 font-mono text-sm">I'll get back to you soon.</div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-8 p-6 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center animate-pulse">
                    <AlertCircle className="w-6 h-6 text-red-400 mr-4" />
                    <div>
                      <div className="text-red-400 font-mono font-bold">Failed to Send Message</div>
                      <div className="text-red-300 font-mono text-sm">Please try again or contact me directly.</div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-emerald-400 mb-3 font-mono">
                        <Zap className="w-4 h-4 inline mr-2" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 bg-black/50 text-white transition-all duration-300 font-mono ${
                          focusedField === 'name' 
                            ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' 
                            : 'border-emerald-500/30 hover:border-emerald-500/50'
                        }`}
                        placeholder="Enter your name"
                      />
                      {focusedField === 'name' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl pointer-events-none animate-pulse"></div>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-medium text-emerald-400 mb-3 font-mono">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 bg-black/50 text-white transition-all duration-300 font-mono ${
                          focusedField === 'email' 
                            ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' 
                            : 'border-emerald-500/30 hover:border-emerald-500/50'
                        }`}
                        placeholder="Enter your email"
                      />
                      {focusedField === 'email' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl pointer-events-none animate-pulse"></div>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block text-sm font-medium text-emerald-400 mb-3 font-mono">
                        <Heart className="w-4 h-4 inline mr-2" />
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={6}
                        className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 bg-black/50 text-white transition-all duration-300 resize-none font-mono ${
                          focusedField === 'message' 
                            ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' 
                            : 'border-emerald-500/30 hover:border-emerald-500/50'
                        }`}
                        placeholder="Tell me about your project or just say hello!"
                      />
                      {focusedField === 'message' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl pointer-events-none animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-4 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-mono font-bold text-black text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 mr-3" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;