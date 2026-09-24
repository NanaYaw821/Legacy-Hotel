import React from 'react';
import { Calendar, Users, BedDouble, Search, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { ROOM_CATEGORIES } from '../../data/roomsData';

export const BookingSearchBanner = ({ onSearchSubmit }) => {
  const { searchParams, setSearchParams } = useBooking();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20">
      <div className="bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          {/* Check-In */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#9b2c2c] dark:text-amber-400" /> Check-In
            </label>
            <input
              type="date"
              value={searchParams.checkIn}
              onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
              className="w-full bg-[#fdf2d6]/50 dark:bg-[#292524] text-slate-900 dark:text-white text-xs font-medium p-3 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none focus:ring-2 focus:ring-[#9b2c2c]"
            />
          </div>

          {/* Check-Out */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#9b2c2c] dark:text-amber-400" /> Check-Out
            </label>
            <input
              type="date"
              value={searchParams.checkOut}
              onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
              className="w-full bg-[#fdf2d6]/50 dark:bg-[#292524] text-slate-900 dark:text-white text-xs font-medium p-3 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none focus:ring-2 focus:ring-[#9b2c2c]"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#b45309] dark:text-amber-400" /> Guests
            </label>
            <select
              value={searchParams.adults}
              onChange={(e) => setSearchParams({ ...searchParams, adults: Number(e.target.value) })}
              className="w-full bg-[#fdf2d6]/50 dark:bg-[#292524] text-slate-900 dark:text-white text-xs font-medium p-3 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none focus:ring-2 focus:ring-[#9b2c2c]"
            >
              <option value={1}>1 Adult</option>
              <option value={2}>2 Adults</option>
              <option value={3}>3 Adults</option>
              <option value={4}>4 Adults (Family)</option>
            </select>
          </div>

          {/* Room Type */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-[#b45309] dark:text-amber-400" /> Room Type
            </label>
            <select
              value={searchParams.roomType}
              onChange={(e) => setSearchParams({ ...searchParams, roomType: e.target.value })}
              className="w-full bg-[#fdf2d6]/50 dark:bg-[#292524] text-slate-900 dark:text-white text-xs font-medium p-3 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none focus:ring-2 focus:ring-[#9b2c2c]"
            >
              {ROOM_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9b2c2c] via-[#b91c1c] to-[#b45309] hover:from-[#7f1d1d] hover:to-[#92400e] text-white font-bold text-xs uppercase tracking-wider shadow-gold transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH AVAILABILITY</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingSearchBanner;
