import React from 'react';
import { Utensils, Clock, Flame, Sparkles, Calendar, ShoppingBag } from 'lucide-react';
import { RESTAURANT_ITEMS, RESTAURANT_INFO } from '../../data/restaurantData';
import { useCurrency } from '../../context/CurrencyContext';

export const RestaurantTeaser = ({ onOrderFood, onReserveTable, onViewMenu }) => {
  const { formatPrice } = useCurrency();
  const chefSpecials = RESTAURANT_ITEMS.filter(i => i.chefSpecial).slice(0, 3);

  return (
    <section className="py-20 bg-[#1c1917] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2 flex items-center gap-2">
              <Utensils className="w-4 h-4" /> Sky Bar & The Atlantic Gastronomy
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold">
              Legacy Grill & Sky Bar
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> {RESTAURANT_INFO.openingHours}
              </span>
              <span>•</span>
              <span>Rooftop Skylines & Poolside Dining</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOrderFood}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#9b2c2c] to-[#b45309] hover:from-[#7f1d1d] hover:to-[#92400e] text-white font-bold text-xs shadow-gold transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDER FOOD ONLINE</span>
            </button>

            <button
              onClick={onReserveTable}
              className="px-5 py-3 rounded-2xl bg-[#292524] hover:bg-[#44403c] border border-[#c5a880]/50 text-amber-300 font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>RESERVE SKY BAR TABLE</span>
            </button>
          </div>
        </div>

        {/* Featured Chef Specials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {chefSpecials.map((item) => (
            <div
              key={item.id}
              className="bg-[#292524]/80 border border-[#44403c] rounded-3xl overflow-hidden shadow-luxury hover:border-[#c5a880] transition-all duration-300 group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-[#9b2c2c] text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow-md">
                  <Flame className="w-3 h-3" /> Chef Special
                </span>
                <span className="absolute bottom-4 right-4 bg-[#1c1917]/90 text-amber-300 font-serif-luxury font-bold text-lg px-3 py-1 rounded-xl backdrop-blur-md">
                  {formatPrice(item.priceGHS)}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 pt-3 border-t border-[#44403c]">
                  <span>Prep time: {item.prepTime}</span>
                  <span className="text-amber-400 font-semibold">{item.spicyLevel} Spice</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotions Banner */}
        <div className="bg-gradient-to-r from-[#9b2c2c]/30 via-[#292524] to-[#b45309]/30 border border-[#c5a880]/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#9b2c2c] text-white flex items-center justify-center font-bold text-xl shrink-0">
              🍷
            </div>
            <div>
              <h4 className="font-serif-luxury text-xl font-bold text-white">
                {RESTAURANT_INFO.promotions[0].title}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {RESTAURANT_INFO.promotions[0].description} ({RESTAURANT_INFO.promotions[0].discount})
              </p>
            </div>
          </div>
          <button
            onClick={onViewMenu}
            className="px-6 py-3 rounded-xl bg-[#faf7f5] text-[#1c1917] font-bold text-xs hover:bg-amber-300 transition-colors shrink-0"
          >
            VIEW FULL RESTAURANT MENU
          </button>
        </div>
      </div>
    </section>
  );
};

export default RestaurantTeaser;
