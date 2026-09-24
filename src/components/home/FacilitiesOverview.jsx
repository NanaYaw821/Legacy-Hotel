import React from 'react';
import { Waves, Utensils, Sparkles, Dumbbell, Briefcase, UserCheck, ShieldCheck, Car } from 'lucide-react';
import { HOTEL_FACILITIES } from '../../data/hotelData';

const iconMap = {
  Waves,
  Utensils,
  Sparkles,
  Dumbbell,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Car
};

export const FacilitiesOverview = ({ onFacilityClick }) => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          World-Class Resort Amenities
        </span>
        <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Hotel Facilities & Services
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Designed for maximum comfort, productivity, wellness, and relaxation during your stay in Tema.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HOTEL_FACILITIES.map((facility) => {
          const IconComponent = iconMap[facility.icon] || Sparkles;
          return (
            <div
              key={facility.id}
              onClick={() => onFacilityClick && onFacilityClick(facility)}
              className="group relative rounded-3xl overflow-hidden shadow-luxury border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-80 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300"
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    {facility.category}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold group-hover:text-amber-300 transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed opacity-90">
                    {facility.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FacilitiesOverview;
