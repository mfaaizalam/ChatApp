import { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ChatWithNavbar() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  // Load theme and listen for changes
  useEffect(() => {
    // Initial load
    try {
      const savedTheme = localStorage.getItem('vTalkTheme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('localStorage not available');
    }

    // Listen for theme change events
    const handleThemeChange = (e) => {
      setIsDarkMode(e.detail.isDark);
    };

    window.addEventListener('themeChanged', handleThemeChange);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { type: 'bot', text: "Error occurred!" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <style>{`
        /* Hide ALL scrollbars */
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center pt-20 pb-6 px-4 overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0B1220] via-[#070D1A] to-[#020617]'
          : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
      }`}>
        {/* Header */}
        <div className="w-full max-w-4xl mb-6 relative z-10">
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-2xl blur-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-500/90 to-cyan-500/90 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/10">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" opacity="0.95">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="12" cy="18" r="3" />
                  <path d="M8 7.5l3.5 8" strokeWidth="2" />
                  <path d="M16 7.5l-3.5 8" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className={`text-3xl font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                vTalk AI
              </h1>
              <p className={`text-sm transition-colors ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
               Always here to help ✨
              </p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="w-full max-w-4xl flex-1 flex flex-col relative z-10 min-h-0">
          <div className={`h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl border-2 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-900/40 border-slate-700/50' 
              : 'bg-white/60 border-white/50'
          }`}>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Empty State */}
              {messages.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  {/* <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl transition-colors ${
                    isDarkMode ? 'bg-gradient-to-br from-blue-600 to-cyan-600' : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}>
                    <Bot className="w-12 h-12 text-white" strokeWidth={2} />
                  </div> */}
                  <div className="text-center space-y-3">
                    <h3 className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome! How can I help you today?
                    </h3>
                    <p className={`text-sm max-w-md transition-colors ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      Ask me anything - I'm here to assist with information, answer questions, and have engaging conversations.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    {['Tell me a fun fact', 'Help me brainstorm', 'Explain something', 'Creative writing'].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(suggestion)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 ${
                          isDarkMode 
                            ? 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                            : 'bg-white/80 hover:bg-white text-gray-700 border border-gray-200'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {msg.type === 'bot' && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                      <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-5 py-3.5 max-w-[75%] shadow-lg transition-colors ${
                    msg.type === 'user'
                      ? 'rounded-tr-sm bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                      : isDarkMode 
                        ? 'rounded-tl-sm bg-slate-800/80 text-white border border-slate-700/50'
                        : 'rounded-tl-sm bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {msg.type === 'user' && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
                      <User className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading */}
              {loading && (
                <div className="flex gap-4 justify-start animate-fadeIn">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                    <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className={`rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg transition-colors ${
                    isDarkMode ? 'bg-slate-800/80 border border-slate-700/50' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="flex gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full animate-bounce transition-colors ${
                        isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'
                      }`} style={{ animationDelay: "0ms" }}></div>
                      <div className={`w-2.5 h-2.5 rounded-full animate-bounce transition-colors ${
                        isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'
                      }`} style={{ animationDelay: "150ms" }}></div>
                      <div className={`w-2.5 h-2.5 rounded-full animate-bounce transition-colors ${
                        isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'
                      }`} style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`border-t p-5 backdrop-blur-xl transition-colors ${
              isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-gray-200 bg-white/50'
            }`}>
              <div className="flex gap-3">
                <textarea
                  rows="1"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className={`flex-1 rounded-2xl px-5 py-3.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800/80 text-white placeholder:text-slate-500 border-2 border-slate-700'
                      : 'bg-white text-gray-900 placeholder:text-gray-400 border-2 border-gray-200 shadow-sm'
                  }`}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              <p className={`mt-3 text-xs text-center transition-colors ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                Press <kbd className={`px-2 py-0.5 rounded transition-colors ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>Enter</kbd> to send • <kbd className={`px-2 py-0.5 rounded transition-colors ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>Shift + Enter</kbd> for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}