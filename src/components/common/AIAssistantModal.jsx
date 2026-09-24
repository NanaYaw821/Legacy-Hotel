import React, { useState } from 'react';
import { X, Bot, Send, User, Sparkles, PhoneCall } from 'lucide-react';
import { queryAIAssistant } from '../../services/aiAssistantService';
import { HOTEL_INFO } from '../../data/hotelData';

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I am your **Legacy Hotel AI Assistant**. I can answer questions about room rates, availability, Sky Bar & restaurant menus, pool & spa facilities, or our location in Tema Community 11 (8km from Tema Harbour).`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiReplyText = await queryAIAssistant(textToSend);
    setIsTyping(false);

    const aiMsg = { id: Date.now() + 1, sender: 'ai', text: aiReplyText };
    setMessages(prev => [...prev, aiMsg]);
  };

  const quickPrompts = [
    "What are your room rates?",
    "Distance from Tema Harbour?",
    "Check-in and Check-out times?",
    "Sky Bar and restaurant menu?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col h-[580px]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1c1917] via-[#9b2c2c] to-[#1c1917] p-4 border-b border-[#44403c] flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#9b2c2c]/40 border border-[#c5a880]/40 flex items-center justify-center text-amber-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-base flex items-center gap-2">
                Legacy AI Concierge <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </h3>
              <p className="text-[11px] text-amber-200">24/7 Smart Hotel Support</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#292524] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f0ebe8]/60 dark:bg-[#1c1917]/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#9b2c2c] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                  AI
                </div>
              )}
              <div className={`p-3.5 rounded-2xl text-xs max-w-[82%] leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-[#9b2c2c] text-white rounded-tr-none shadow-sm'
                  : 'bg-[#faf7f5] dark:bg-[#292524] text-slate-800 dark:text-slate-100 rounded-tl-none border border-[#f5e8d2] dark:border-[#44403c] shadow-sm'
              }`}>
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                    {line.includes('**') ? (
                      <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ) : line}
                  </p>
                ))}
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#292524] text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-[#faf7f5] dark:bg-[#292524] p-3 rounded-2xl w-fit border border-[#f5e8d2] dark:border-[#44403c]">
              <span className="w-2 h-2 rounded-full bg-[#9b2c2c] animate-bounce" />
              <span>Legacy AI is typing...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-[#faf7f5] dark:bg-[#1c1917] border-t border-[#f5e8d2] dark:border-[#44403c] overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#fdf2d6] dark:bg-[#292524] hover:bg-[#f5e8d2] dark:hover:bg-[#44403c] text-slate-800 dark:text-slate-200 border border-[#f5e8d2] dark:border-[#44403c] transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-[#faf7f5] dark:bg-[#1c1917] border-t border-[#f5e8d2] dark:border-[#44403c] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rooms, rates, location, Sky Bar..."
            className="flex-1 bg-white dark:bg-[#292524] text-slate-900 dark:text-white placeholder-slate-400 text-xs px-4 py-3 rounded-2xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none focus:ring-2 focus:ring-[#9b2c2c]"
          />
          <button
            type="submit"
            className="p-3 rounded-2xl bg-gradient-to-r from-[#9b2c2c] to-[#b45309] text-white hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Human Assistance Bar */}
        <div className="bg-[#f0ebe8] dark:bg-[#1c1917] px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-[#f5e8d2] dark:border-[#44403c]">
          <span>Need human staff?</span>
          <a href={`tel:${HOTEL_INFO.contacts.phonePrimary}`} className="text-[#9b2c2c] dark:text-amber-400 font-bold hover:underline flex items-center gap-1">
            <PhoneCall className="w-3 h-3" /> Call Reception: {HOTEL_INFO.contacts.phonePrimary}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantModal;
