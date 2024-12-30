import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Bounce animation every 10 seconds
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      if (!isOpen) {
        controls.start({
          y: [0, -20, 0],
          transition: {
            duration: 0.8,
            ease: "easeInOut"
          }
        });
      }
    }, 4000);

    return () => clearInterval(bounceInterval);
  }, [isOpen, controls]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = { type: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const botResponse = await response.json();
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: 'Sorry, I encountered an error. Please try again.'
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4">
        <motion.button
          animate={controls}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#002B5B] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-[#003B7B] transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 right-0 bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-[#002B5B] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <h3 className="font-semibold">RO3 Water Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="text-white hover:text-gray-200 bg-[#003B7B] px-2 py-1 rounded-md text-sm"
                >
                  Clear Chat
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-[#003B7B] p-1 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-gray-500 text-sm">Try asking about:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Store locations",
                      "Product range",
                      "Opening hours",
                      "Contact details",
                      "About RO3 Water"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const userMessage = { type: 'user', content: suggestion };
                          setMessages(prev => [...prev, userMessage]);
                          handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#002B5B]"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-[#002B5B] text-white px-4 py-2 rounded-full hover:bg-[#003B7B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
                {messages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Find a store",
                      "View products",
                      "Opening times",
                      "Contact us"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInput(suggestion);
                          handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
