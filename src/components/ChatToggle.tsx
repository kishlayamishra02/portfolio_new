import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, Bot, Sparkles, Expand, Shrink } from 'lucide-react';

const ChatToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatSize, setChatSize] = useState<'default' | 'half' | 'fullscreen'>('default');
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // Listen for chat toggle events from other components
  useEffect(() => {
    const handleToggleChat = () => {
      toggleChat();
    };

    window.addEventListener('toggleChat', handleToggleChat);
    return () => window.removeEventListener('toggleChat', handleToggleChat);
  }, []);

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const cycleChatSize = () => {
    if (chatSize === 'default') {
      setChatSize('half');
    } else if (chatSize === 'half') {
      setChatSize('fullscreen');
    } else {
      setChatSize('default');
    }
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen && !isMinimized) {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsLoaded(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [isOpen]);

  const getChatDimensions = () => {
    switch (chatSize) {
      case 'half':
        return 'w-[50vw] h-[50vh]';
      case 'fullscreen':
        return 'w-[95vw] h-[95vh]';
      default:
        return 'w-[420px] h-[650px]';
    }
  };

  const getChatPosition = () => {
    switch (chatSize) {
      case 'half':
        return 'bottom-4 right-4';
      case 'fullscreen':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'bottom-8 right-8';
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-8 right-8 z-50 group bg-terracotta-500 hover:bg-terracotta-600 text-white p-4 rounded-full shadow-large transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute inset-0 bg-terracotta-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className={`fixed z-50 transition-all duration-500 ${getChatPosition()} ${
            isMinimized ? 'w-80 h-20' : getChatDimensions()
          } max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]`}
        >
          <div className="relative bg-sage-50/95 border border-sage-200 rounded-2xl shadow-large backdrop-blur-xl overflow-hidden h-full">
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-4 bg-sage-100/80 border-b border-sage-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-charcoal-900 font-body font-semibold text-sm">AI Assistant</h3>
                  <p className="text-terracotta-600 font-body text-xs">Powered by Mimikree</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={cycleChatSize}
                  className="p-2 text-charcoal-600 hover:text-terracotta-600 transition-colors rounded-lg hover:bg-sage-200/50"
                  title={`Switch to ${chatSize === 'default' ? 'half screen' : chatSize === 'half' ? 'fullscreen' : 'default'}`}
                >
                  {chatSize === 'fullscreen' ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
                </button>
                <button
                  onClick={minimizeChat}
                  className="p-2 text-charcoal-600 hover:text-terracotta-600 transition-colors rounded-lg hover:bg-sage-200/50"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={closeChat}
                  className="p-2 text-charcoal-600 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <div className="relative z-10 h-[calc(100%-4rem)]">
                {!isLoaded ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-full flex items-center justify-center animate-pulse">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-terracotta-600 font-body text-sm">Initializing AI Assistant...</p>
                      <div className="flex justify-center mt-4 space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-terracotta-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={`https://mimikree.com/embed.html?username=kishlayamishra&apiKey=${import.meta.env.VITE_GEMINI_API_KEY}`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title="AI Chat Assistant"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatToggle;