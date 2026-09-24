import React from 'react';
import { X, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useCurrency } from '../../context/CurrencyContext';
import { INITIAL_ROOMS } from '../../data/roomsData';

export const QuickBookingModal = ({ onNavigateToBooking }) => {
  const { 
    isQuickBookingOpen, 
    closeQuickBooking, 
    searchParams, 
    setSearchParams, 
    selectedRoom, 
    setSelectedRoom,
    nights,
    calculateTotal,
    selectedAddons,
    toggleAddon,
    ADDON_SERVICES
  } = useBooking();

  const { formatPrice } = useCurrency();

  if (!isQuickBookingOpen) return null;

  const totalGHS = calculateTotal(selectedRoom, selectedAddons);

  const handleProceed = () => {
    closeQuickBooking();
    onNavigateToBooking();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1c1917] via-[#9b2c2c] to-[#1c1917] p-6 border-b border-[#44403c] flex items-center justify-between text-white">
          <div>
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-1">
              Legacy Hotel Direct Reservation
            </span>
            <h3 className="font-serif-luxury font-bold text-2xl">
              Quick Reservation Engine
            </h3>
          </div>
          <button onClick={closeQuickBooking} className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#292524] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Room Selector Cards */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Select Room Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INITIAL_ROOMS.map((room) => {
                const isSelected = selectedRoom?.id === room.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#9b2c2c] bg-[#fdf2d6] dark:bg-[#292524] shadow-md'
                        : 'border-[#f5e8d2] dark:border-[#44403c] hover:border-[#9b2c2c] bg-white dark:bg-[#292524]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={room.primaryPhoto} alt={room.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{room.name}</h4>
                        <span className="text-[11px] text-slate-500">{room.bedType}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm text-[#9b2c2c] dark:text-amber-400">{formatPrice(room.pricePerNightGHS)}</span>
                      <span className="block text-[10px] text-slate-400">/ night</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dates & Guests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#f0ebe8] dark:bg-[#292524] p-4 rounded-2xl border border-[#f5e8d2] dark:border-[#44403c]">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Check-in</label>
              <input
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                className="w-full bg-white dark:bg-[#1c1917] text-xs text-slate-900 dark:text-white p-2.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Check-out</label>
              <input
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                className="w-full bg-white dark:bg-[#1c1917] text-xs text-slate-900 dark:text-white p-2.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Adults</label>
              <select
                value={searchParams.adults}
                onChange={(e) => setSearchParams({ ...searchParams, adults: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#1c1917] text-xs text-slate-900 dark:text-white p-2.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none"
              >
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Children</label>
              <select
                value={searchParams.children}
                onChange={(e) => setSearchParams({ ...searchParams, children: Number(e.target.value) })}
                className="w-full bg-white dark:bg-[#1c1917] text-xs text-slate-900 dark:text-white p-2.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none"
              >
                {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n} Children</option>)}
              </select>
            </div>
          </div>

          {/* Quick Optional Addons */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Popular Optional Add-ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ADDON_SERVICES.slice(0, 4).map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      isChecked
                        ? 'border-[#9b2c2c] bg-[#fdf2d6] dark:bg-[#292524]'
                        : 'border-[#f5e8d2] dark:border-[#44403c] bg-white dark:bg-[#292524]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-[#9b2c2c] border-[#9b2c2c] text-white' : 'border-slate-300'}`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{addon.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#b45309] dark:text-amber-400">+{formatPrice(addon.priceGHS)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Summary & Action */}
        <div className="bg-[#f0ebe8] dark:bg-[#1c1917] p-6 border-t border-[#f5e8d2] dark:border-[#44403c] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block">Total for {nights} Night{nights > 1 ? 's' : ''}:</span>
            <span className="font-serif-luxury font-bold text-2xl text-[#9b2c2c] dark:text-amber-400">{formatPrice(totalGHS)}</span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3" /> Best Price Guarantee & Free Cancellation
            </span>
          </div>

          <button
            onClick={handleProceed}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#9b2c2c] via-[#b91c1c] to-[#b45309] hover:from-[#7f1d1d] hover:to-[#92400e] text-white font-bold text-sm shadow-gold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
          >
            <span>Proceed to Confirmation</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickBookingModal;
