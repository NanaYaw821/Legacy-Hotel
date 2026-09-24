import React, { useState } from 'react';
import { MessageSquare, Bot, Phone, X, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

export const LiveChatWidget = ({ onOpenAI }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Menu */}
      {isOpen && (
        <div className="mb-4 bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl p-4 shadow-2xl w-64 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#f5e8d2] dark:border-[#44403c]">
            <span className="text-xs font-serif-luxury font-bold text-slate-900 dark:text-white">
              Legacy Guest Support
            </span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* AI Assistant Launcher */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenAI();
            }}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#9b2c2c] to-[#b45309] text-white font-semibold text-xs flex items-center gap-2 shadow-sm hover:opacity-95 transition-opacity"
          >
            <Bot className="w-4 h-4" />
            <span>Chat with AI Concierge</span>
            <Sparkles className="w-3 h-3 text-amber-300 ml-auto" />
          </button>

          {/* WhatsApp Direct */}
          <a
            href={HOTEL_INFO.contacts.whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full p-3 rounded-2xl bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm hover:bg-emerald-800 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          {/* Direct Phone Call */}
          <a
            href={`tel:${HOTEL_INFO.contacts.phonePrimary}`}
            className="w-full p-3 rounded-2xl bg-[#fdf2d6] dark:bg-[#292524] text-slate-800 dark:text-slate-100 font-semibold text-xs flex items-center gap-2 hover:bg-[#f5e8d2] dark:hover:bg-[#44403c] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#9b2c2c] dark:text-amber-400" />
            <span>Call: {HOTEL_INFO.contacts.phonePrimary}</span>
          </a>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#9b2c2c] via-[#b91c1c] to-[#b45309] text-white flex items-center justify-center shadow-gold hover:scale-105 active:scale-95 transition-all relative group"
        aria-label="Open Live Chat Menu"
      >
        <div className="absolute inset-0 rounded-full bg-[#9b2c2c] opacity-25 animate-ping" />
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageSquare className="w-6 h-6 relative z-10" />}
      </button>
    </div>
  );
};

export default LiveChatWidget;
