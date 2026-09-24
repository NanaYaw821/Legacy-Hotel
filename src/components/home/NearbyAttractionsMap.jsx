import React, { useState } from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { NEARBY_ATTRACTIONS, HOTEL_INFO } from '../../data/hotelData';

export const NearbyAttractionsMap = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Education", "Attraction", "Business", "Shopping", "Beaches", "Airport"];

  const filtered = selectedCategory === "All"
    ? NEARBY_ATTRACTIONS
    : NEARBY_ATTRACTIONS.filter(a => a.category === selectedCategory);

  return (
    <section className="py-20 bg-[#f0ebe8] dark:bg-[#1c1917] text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#9b2c2c] dark:text-amber-400 uppercase tracking-widest block mb-2 flex items-center justify-center gap-2">
            <Compass className="w-4 h-4" /> Strategic Port Location
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold">
            Nearby Landmarks & Port Hubs
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Situated in Tema Community 11/12, directly opposite PRESEC and just 8km from Tema Harbour.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#9b2c2c] text-white shadow-md'
                  : 'bg-[#faf7f5] dark:bg-[#292524] text-slate-700 dark:text-slate-300 border border-[#f5e8d2] dark:border-[#44403c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Map Visual + Places Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Map Representation Visual Box */}
          <div className="lg:col-span-1 bg-[#faf7f5] dark:bg-[#292524] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl p-6 shadow-luxury">
            <div className="relative h-72 rounded-2xl overflow-hidden bg-[#1c1917] flex items-center justify-center border border-[#44403c]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#9b2c2c_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 text-center animate-bounce">
                <div className="w-12 h-12 rounded-2xl bg-[#9b2c2c] text-white flex items-center justify-center font-bold shadow-gold mx-auto mb-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="bg-[#1c1917] text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-[#c5a880]/50">
                  LEGACY HOTEL (COMMUNITY 11)
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Address:</span>
                <span>{HOTEL_INFO.location.address}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Harbour Distance:</span>
                <span className="text-[#9b2c2c] dark:text-amber-400 font-bold">8km from Tema Port</span>
              </div>
            </div>
          </div>

          {/* Places List Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((place) => (
              <div
                key={place.id}
                className="bg-[#faf7f5] dark:bg-[#292524] border border-[#f5e8d2] dark:border-[#44403c] rounded-2xl p-5 shadow-sm hover:border-[#9b2c2c] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#fdf2d6] dark:bg-[#1c1917] text-[#9b2c2c] dark:text-amber-300 uppercase">
                    {place.category}
                  </span>
                  <span className="text-xs font-semibold text-[#b45309] dark:text-amber-400 flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> {place.distance}
                  </span>
                </div>
                <h4 className="font-serif-luxury font-bold text-base text-slate-900 dark:text-white">
                  {place.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {place.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyAttractionsMap;
