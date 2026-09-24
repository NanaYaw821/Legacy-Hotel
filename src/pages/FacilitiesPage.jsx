import React from 'react';
import { HOTEL_FACILITIES } from '../data/hotelData';
import { Waves, Utensils, Sparkles, Dumbbell, Briefcase, UserCheck, ShieldCheck, Car } from 'lucide-react';

const iconMap = { Waves, Utensils, Sparkles, Dumbbell, Briefcase, UserCheck, ShieldCheck, Car };

export const FacilitiesPage = ({ onReserveFacility }) => {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          5-Star Resort Amenities
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Facilities & Guest Services
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Legacy Hotel provides an array of wellness, dining, recreation, business, and transportation services in Tema.
        </p>
      </div>

      <div className="space-y-12">
        {HOTEL_FACILITIES.map((facility, index) => {
          const Icon = iconMap[facility.icon] || Sparkles;
          const isEven = index % 2 === 0;

          return (
            <div
              key={facility.id}
              className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-luxury grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              <div className={`h-80 lg:h-96 ${isEven ? '' : 'lg:col-start-2'}`}>
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-8 lg:p-12 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-500">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                  {facility.category}
                </span>
                <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 dark:text-white">
                  {facility.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {facility.description}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => alert(`Inquiry sent for ${facility.name}. Our Concierge team will contact you.`)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-sky-600 font-semibold text-xs transition-colors"
                  >
                    INQUIRE / BOOK FACILITY
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilitiesPage;
