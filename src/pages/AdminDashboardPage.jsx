import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar as CalendarIcon, BedDouble, Utensils, Car, 
  Sparkles, DollarSign, Users, ShieldCheck, CheckCircle2, AlertCircle, 
  BarChart3, Plus, Edit, Trash2, SlidersHorizontal, Lock 
} from 'lucide-react';
import { ADMIN_STATS, MONTHLY_REVENUE_DATA, CALENDAR_ROOM_MATRIX, STAFF_ROLES } from '../data/adminMockData';
import { INITIAL_ROOMS } from '../data/roomsData';
import { MOCK_GUEST_CONCIERGE_REQUESTS } from '../data/conciergeData';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';

export const AdminDashboardPage = () => {
  const { formatPrice } = useCurrency();
  const { isAdmin, logout } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState("overview"); // overview, calendar, rooms, analytics, concierge, staff
  const [roomList, setRoomList] = useState(INITIAL_ROOMS);
  const [conciergeRequests, setConciergeRequests] = useState(MOCK_GUEST_CONCIERGE_REQUESTS);
  const [calendarMatrix, setCalendarMatrix] = useState(CALENDAR_ROOM_MATRIX);

  const [selectedRoomStatusFilter, setSelectedRoomStatusFilter] = useState("all");

  const updateConciergeStatus = (reqId, newStatus) => {
    setConciergeRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: newStatus } : r));
  };

  const filteredCalendar = selectedRoomStatusFilter === "all"
    ? calendarMatrix
    : calendarMatrix.filter(c => c.status.toLowerCase() === selectedRoomStatusFilter.toLowerCase());

  if (!isAdmin) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Admin Access Required</h1>
      <p className="mb-6">Please log in with admin credentials.</p>
      <button onClick={() => { logout(); window.location.reload(); }} className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold">
        Login as Admin
      </button>
    </div>
  );
}
return (
    <div className="py-8 max-w-7xl mx-auto px-4 animate-fadeIn space-y-8">
      
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-serif-luxury font-bold text-2xl">
            LH
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">
              Executive Hotel Control Center
            </span>
            <h1 className="font-serif-luxury text-3xl font-bold">
              Legacy Hotel Management Portal
            </h1>
            <span className="text-xs text-slate-400">Tema Community 11 • Manager Role Authorized</span>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 text-xs">
          {[
            { id: "overview", label: "Dashboard", icon: LayoutDashboard },
            { id: "calendar", label: "Hotel Calendar", icon: CalendarIcon },
            { id: "rooms", label: "Inventory", icon: BedDouble },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "concierge", label: "Concierge Queue", icon: Sparkles },
            { id: "staff", label: "Staff & Security", icon: ShieldCheck }
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeAdminTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveAdminTab(t.id)}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
                  isActive ? 'bg-amber-500 text-slate-950 shadow-gold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW KPI METRICS */}
      {activeAdminTab === "overview" && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* KPI Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury">
              <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">Monthly Revenue</span>
              <span className="font-serif-luxury font-bold text-3xl text-amber-500">{formatPrice(ADMIN_STATS.totalRevenueGHS)}</span>
              <span className="text-[10px] text-emerald-500 font-semibold block mt-1">↑ +14.2% from last month</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury">
              <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">Occupancy Rate</span>
              <span className="font-serif-luxury font-bold text-3xl text-sky-600 dark:text-sky-400">{ADMIN_STATS.occupancyRatePercent}%</span>
              <span className="text-[10px] text-slate-400 block mt-1">{ADMIN_STATS.occupiedRooms} Occupied / {ADMIN_STATS.availableRooms} Available</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury">
              <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">Total Bookings</span>
              <span className="font-serif-luxury font-bold text-3xl text-slate-900 dark:text-white">{ADMIN_STATS.totalBookingsThisMonth}</span>
              <span className="text-[10px] text-amber-500 font-semibold block mt-1">{ADMIN_STATS.pendingBookings} Pending Confirmations</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury">
              <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">Today's Check-ins</span>
              <span className="font-serif-luxury font-bold text-3xl text-emerald-500">{ADMIN_STATS.upcomingCheckInsToday}</span>
              <span className="text-[10px] text-slate-400 block mt-1">{ADMIN_STATS.upcomingCheckOutsToday} Check-outs Today</span>
            </div>
          </div>

          {/* Quick Operations Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-4">
            <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">
              Real-Time Operations Monitor
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block">Restaurant Orders Today</span>
                <span className="font-bold text-lg text-slate-900 dark:text-white">{ADMIN_STATS.restaurantOrdersToday} Orders</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block">Active Chauffeur Rentals</span>
                <span className="font-bold text-lg text-slate-900 dark:text-white">{ADMIN_STATS.activeCarRentals} Vehicles</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block">Pending Butler Requests</span>
                <span className="font-bold text-lg text-amber-500">{ADMIN_STATS.pendingConciergeRequests} Requests</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOTEL CALENDAR GRID */}
      {activeAdminTab === "calendar" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
                Hotel Room Status & Availability Matrix
              </h2>
              <span className="text-xs text-slate-400">Interactive Calendar View</span>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2">
              {['all', 'occupied', 'available', 'reserved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedRoomStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    selectedRoomStatusFilter === st
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="p-3">Room #</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Current Guest</th>
                  <th className="p-3">Check-In</th>
                  <th className="p-3">Check-Out</th>
                  <th className="p-3">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCalendar.map((row) => (
                  <tr key={row.roomNumber} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                    <td className="p-3 font-bold text-sky-600 dark:text-sky-400">{row.roomNumber}</td>
                    <td className="p-3 text-slate-800 dark:text-slate-200">{row.roomCategory}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                        row.status === 'Occupied' ? 'bg-rose-500/10 text-rose-500' :
                        row.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold">{row.guestName}</td>
                    <td className="p-3 text-slate-500">{row.checkIn}</td>
                    <td className="p-3 text-slate-500">{row.checkOut}</td>
                    <td className="p-3 font-bold text-amber-500">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ADMIN ROOM MANAGEMENT */}
      {activeAdminTab === "rooms" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          
          <div className="flex justify-between items-center">
            <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
              Room Category & Pricing Control
            </h2>
            <button
              onClick={() => alert('New Room Category Creator opened!')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-gold"
            >
              <Plus className="w-4 h-4" /> Add Room Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roomList.map((room) => (
              <div key={room.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <img src={room.primaryPhoto} alt={room.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{room.name}</h4>
                    <span className="text-amber-500 font-bold font-serif-luxury text-base">{formatPrice(room.pricePerNightGHS)} / night</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newPrice = prompt(`Enter new night rate in GHS for ${room.name}:`, room.pricePerNightGHS);
                      if (newPrice) {
                        setRoomList(prev => prev.map(r => r.id === room.id ? { ...r, pricePerNightGHS: Number(newPrice) } : r));
                      }
                    }}
                    className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-sky-500 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FINANCIAL ANALYTICS */}
      {activeAdminTab === "analytics" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
            Revenue & Occupancy Financial Analytics
          </h2>

          <div className="space-y-4">
            <span className="text-xs text-slate-400 block font-semibold">Monthly Revenue Trend (GHS)</span>
            <div className="grid grid-cols-9 gap-2 items-end h-64 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              {MONTHLY_REVENUE_DATA.map((d) => {
                const heightPercent = (d.revenueGHS / 300000) * 100;
                return (
                  <div key={d.month} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] text-amber-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">GH₵ {(d.revenueGHS / 1000).toFixed(0)}k</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-sky-600 to-amber-400 rounded-t-lg transition-all group-hover:brightness-110"
                    />
                    <span className="text-[10px] font-bold text-slate-500">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CONCIERGE QUEUE */}
      {activeAdminTab === "concierge" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
            Guest Butler Request Dispatcher
          </h2>

          <div className="space-y-4 text-xs">
            {conciergeRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-sky-600 dark:text-sky-400">{req.id}</span> • <strong>{req.guestName}</strong> ({req.roomNumber})
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{req.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={req.status}
                    onChange={(e) => updateConciergeStatus(req.id, e.target.value)}
                    className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: STAFF ROLES & SECURITY */}
      {activeAdminTab === "staff" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
            Staff Permissions & Security Roles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STAFF_ROLES.map((role) => (
              <div key={role.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{role.title}</h4>
                  <span className="text-slate-400">Access: {role.accessLevel}</span>
                </div>
                <span className="text-emerald-500 font-bold">Authorized</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
