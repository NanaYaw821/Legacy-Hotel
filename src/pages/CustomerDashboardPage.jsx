import React from 'react';
import { User, Calendar, Award, Heart, Printer, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { INITIAL_ROOMS } from '../data/roomsData';

export const CustomerDashboardPage = ({ setActiveTab, setSelectedRoomDetail }) => {
  const { user, logout, favorites } = useAuth();
  const { completedBookings } = useBooking();
  const { formatPrice } = useCurrency();

  const favRooms = INITIAL_ROOMS.filter(r => favorites.includes(r.id));

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Header Profile Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-luxury mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"} alt={user?.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-400" />
          <div>
            <h1 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              {user?.name} <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-400/40">{user?.vipStatus || 'Gold VIP'}</span>
            </h1>
            <span className="text-xs text-slate-500">{user?.email} • {user?.phone}</span>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            setActiveTab('home');
          }}
          className="px-5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout Account
        </button>
      </div>

      {/* Bookings History Section */}
      <div className="space-y-6 mb-16">
        <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
          My Hotel Reservations & Receipts
        </h2>

        <div className="space-y-4">
          {completedBookings.map((b) => (
            <div key={b.referenceNumber} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img src={b.room.primaryPhoto} alt={b.room.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block">{b.referenceNumber}</span>
                  <h3 className="font-serif-luxury font-bold text-lg text-slate-900 dark:text-white">{b.room.name}</h3>
                  <span className="text-xs text-slate-500">{b.checkIn} to {b.checkOut} ({b.nights} Nights)</span>
                </div>
              </div>

              <div className="text-right space-y-2">
                <span className="font-serif-luxury font-bold text-2xl text-amber-500 block">{formatPrice(b.totalAmountGHS)}</span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 uppercase">● {b.paymentStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Favorites */}
      <div>
        <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white mb-6">
          Saved Favorite Rooms
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favRooms.map((room) => (
            <div key={room.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={room.primaryPhoto} alt={room.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{room.name}</h4>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{formatPrice(room.pricePerNightGHS)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedRoomDetail(room);
                  setActiveTab('room_detail');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
