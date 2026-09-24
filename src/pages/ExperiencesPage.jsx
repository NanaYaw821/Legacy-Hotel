import React from 'react';
import { Sparkles, Clock, Calendar } from 'lucide-react';
import { HOTEL_EXPERIENCES } from '../data/experiencesData';
import { useCurrency } from '../context/CurrencyContext';

export const ExperiencesPage = () => {
  const { formatPrice } = useCurrency();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          Curated VIP Packages
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Hotel Experiences
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Enhance your stay with romantic candlelight dinners, authentic Ghanaian spa rituals, and Tema zero-meridian tours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOTEL_EXPERIENCES.map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-luxury flex flex-col justify-between">
            <div className="h-64 relative">
              <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-full uppercase">
                {exp.category}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">{exp.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{exp.description}</p>
              
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-500" /> {exp.duration}</span>
                <span className="font-serif-luxury font-bold text-lg text-amber-600 dark:text-amber-400">{formatPrice(exp.priceGHS)}</span>
              </div>

              <button onClick={() => alert(`Experience ${exp.title} reserved! Concierge will arrange details.`)} className="w-full py-3 rounded-2xl bg-sky-600 text-white font-bold text-xs shadow-md">
                BOOK EXPERIENCE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencesPage;
