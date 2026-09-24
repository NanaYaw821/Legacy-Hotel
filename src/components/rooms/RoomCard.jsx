import React from 'react';
import { Users, Bed, Maximize, Star, Heart, ArrowRight } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

export const RoomCard = ({ room, onViewDetails }) => {
  const { formatPrice } = useCurrency();
  const { favorites, toggleFavorite } = useAuth();
  const { openQuickBooking } = useBooking();

  const isFav = favorites.includes(room.id);

  return (
    <div className="group bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Image Container with Badges */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.primaryPhoto}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/90 via-transparent to-black/20" />

        {/* Featured Badge */}
        {room.featured && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-[#9b2c2c] to-[#b45309] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            EXECUTIVE SUITE
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(room.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
            isFav ? 'bg-[#9b2c2c] text-white' : 'bg-[#1c1917]/60 text-white hover:bg-[#1c1917]'
          }`}
          aria-label="Save Room"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
        </button>

        {/* Rating & Size Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 font-bold bg-[#1c1917]/80 px-2.5 py-1 rounded-lg backdrop-blur-md text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> {room.rating} ({room.reviewCount})
          </span>
          <span className="flex items-center gap-1 bg-[#1c1917]/80 px-2.5 py-1 rounded-lg backdrop-blur-md font-medium text-amber-100">
            <Maximize className="w-3.5 h-3.5 text-amber-400" /> {room.sizeSqm} m²
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#9b2c2c] dark:text-amber-400 uppercase tracking-widest">
              {room.category}
            </span>
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
              Available
            </span>
          </div>

          <h3 className="font-serif-luxury text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#9b2c2c] dark:group-hover:text-amber-300 transition-colors">
            {room.name}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {room.description}
          </p>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-[#f5e8d2] dark:border-[#44403c]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#9b2c2c] dark:text-amber-400" />
              <span>{room.capacityAdults} Adults, {room.capacityChildren} Kids</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#b45309] dark:text-amber-400" />
              <span className="truncate">{room.bedType}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-4 border-t border-[#f5e8d2] dark:border-[#44403c] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block tracking-wider">From</span>
            <span className="font-serif-luxury font-bold text-2xl text-[#9b2c2c] dark:text-amber-400">
              {formatPrice(room.pricePerNightGHS)}
            </span>
            <span className="text-[10px] text-slate-400"> / night</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(room)}
              className="px-3 py-2.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] hover:bg-[#fdf2d6] dark:hover:bg-[#292524] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              Details
            </button>
            
            <button
              onClick={() => openQuickBooking(room)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9b2c2c] to-[#b45309] hover:from-[#7f1d1d] hover:to-[#92400e] text-white font-bold text-xs shadow-gold transition-all transform hover:scale-105 flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
