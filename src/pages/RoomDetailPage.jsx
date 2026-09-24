import React, { useState } from 'react';
import { 
  ArrowLeft, Star, Users, Bed, Maximize, Check, ShieldCheck, 
  Calendar, Sparkles, Heart, Share2 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

export const RoomDetailPage = ({ room, onBack, onBookNow }) => {
  const { formatPrice } = useCurrency();
  const { openQuickBooking } = useBooking();
  const { favorites, toggleFavorite } = useAuth();
  
  const [selectedImage, setSelectedImage] = useState(room?.primaryPhoto || (room?.photos && room.photos[0]));

  if (!room) return null;

  const isFav = favorites.includes(room.id);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ALL ROOMS</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Photo Gallery */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <img
              src={selectedImage}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            
            <button
              onClick={() => toggleFavorite(room.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors ${
                isFav ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {room.photos && room.photos.length > 0 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {room.photos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img ? 'border-amber-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description & Story */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-luxury space-y-6">
            <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 dark:text-white">
              Room Overview & Amenities
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {room.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Category</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{room.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Room Size</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{room.sizeSqm} m²</span>
              </div>
              <div>
                <span className="text-slate-400 block">Bed Config</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{room.bedType}</span>
              </div>
              <div>
                <span className="text-slate-400 block">View</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{room.view}</span>
              </div>
            </div>

            {/* Full Amenities List */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white mb-3">
                Included Room Amenities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Booking Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl sticky top-24 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Rates & Pricing
              </span>
              <span className="flex items-center gap-1 font-bold text-xs bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {room.rating} Rating
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl font-bold text-slate-900 dark:text-white">
              {room.name}
            </h2>

            <div>
              <span className="text-xs text-slate-400 block">Rate per night</span>
              <span className="font-serif-luxury font-bold text-4xl text-sky-600 dark:text-sky-400">
                {formatPrice(room.pricePerNightGHS)}
              </span>
              <span className="text-xs text-slate-400 block mt-1">Includes taxes & breakfast</span>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => openQuickBooking(room)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white font-bold text-sm shadow-gold flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK THIS ROOM NOW</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Free Cancellation up to 24h before check-in
              </div>
              <p>• 24/7 Room Service & Butler Access</p>
              <p>• Check-In: 3:00 PM | Check-Out: 11:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
