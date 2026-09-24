import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Award, MapPin } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const AboutPage = () => {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          Our Heritage & Passion
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          About Legacy Hotel
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
          Founded with a vision to redefine Ghanaian luxury hospitality, Legacy Hotel blends boutique elegance, world-class business facilities, and resort-style relaxation in Tema Community 11.
        </p>
      </div>

      {/* Story & Welcome Message */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
            alt="Legacy Hotel Structure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-bold text-amber-400 uppercase">Tema Landmark</span>
            <h3 className="font-serif-luxury text-2xl font-bold">Opposite Tema PRESEC Senior High</h3>
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
            Welcome Message from Management
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 dark:text-white">
            "Your Comfort & Peace of Mind is Our Highest Honor"
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
            "At Legacy Hotel, we believe true luxury is found in the details—from the warmth of your greeting upon arrival to the flawless precision of our butler service and fine Ghanaian culinary delicacies. Whether visiting Tema for international business, a coastal getaway, or a special wedding celebration, we promise a stay of unforgettable comfort."
          </p>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-serif-luxury font-bold text-base text-slate-900 dark:text-white">Executive Management</h4>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Legacy Hotel Tema, Ghana</span>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-luxury space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            To deliver an extraordinary luxury hospitality experience in Tema, combining rich Ghanaian culture, impeccable modern accommodations, gourmet dining, and executive corporate services.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-luxury space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            To be recognized globally as the leading boutique resort and executive business hub in the Greater Accra region of Ghana, renowned for trust, elegance, and service excellence.
          </p>
        </div>
      </div>

      {/* Team / Staff Architecture Placeholders */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl text-center">
        <h3 className="font-serif-luxury text-3xl font-bold mb-3">Dedicated Professional Team</h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto mb-8">
          Our team includes experienced front office managers, executive chefs, certified wellness therapists, and bilingual VIP concierge staff.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { role: "General Manager", name: "Executive Office", desc: "Overseeing 5-star guest relations and operational standards." },
            { role: "Executive Chef", name: "Legacy Kitchen Team", desc: "Crafting fine Ghanaian heritage and continental menus." },
            { role: "Head of Concierge", name: "VIP Butler Services", desc: "Ensuring 24/7 personal guest assistance & transport." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">{item.role}</span>
              <h4 className="font-bold text-base mb-2">{item.name}</h4>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
