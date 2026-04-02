import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi there! I'm Aura, your wellness assistant. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/chat', { message: userMessage.text });
      const botMessage = { sender: 'bot', text: res.data.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: "I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 sm:bottom-6 right-6 z-50 p-4 bg-wellness-primary text-white rounded-full shadow-[0_10px_25px_rgba(123,163,136,0.4)] hover:shadow-[0_10px_35px_rgba(123,163,136,0.5)] transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 sm:bottom-24 right-6 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-wellness-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Aura AI</h3>
                <p className="text-wellness-hero-light text-xs">Always here to listen</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-wellness-hero-light hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-wellness-primary text-white rounded-br-sm shadow-sm' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 text-slate-500 rounded-2xl rounded-bl-sm px-4 py-3 text-sm shadow-sm flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-wellness-primary-light rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-wellness-primary-light rounded-full animate-bounce delay-100"></div>
                   <div className="w-1.5 h-1.5 bg-wellness-primary-light rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="How are you feeling..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-primary/30 focus:border-wellness-primary transition-all text-slate-700"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 p-2 bg-wellness-primary text-white rounded-full flex items-center justify-center hover:bg-wellness-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                <Send size={16} className="ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
