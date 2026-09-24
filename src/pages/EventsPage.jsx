import React, { useState } from 'react';
import { Calendar, Users, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { EVENT_SPACES, EVENT_PACKAGES } from '../data/eventsData';
import { useCurrency } from '../context/CurrencyContext';

export const EventsPage = () => {
  const { formatPrice } = useCurrency();

  const [selectedSpace, setSelectedSpace] = useState(EVENT_SPACES[0]);
  const [eventForm, setEventForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding Reception",
    guestsCount: 50,
    date: "",
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Event Request Submitted for ${eventForm.eventType}${eventForm.date ? ` on ${eventForm.date}` : ''}! Reference: LGC-EVT-${Date.now().toString().slice(-4)}. Our Event Manager will call you shortly.`);
    setEventForm({
      name: "",
      email: "",
      phone: "",
      eventType: "Wedding Reception",
      guestsCount: 50,
      date: "",
      notes: ""
    });
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          Weddings, Banquets & Conferences
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Events & Celebrations
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Host high-profile corporate conferences, executive board meetings, luxury weddings, and birthday galas at Legacy Hotel Tema.
        </p>
      </div>

      {/* Event Spaces Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {EVENT_SPACES.map((space) => (
          <div
            key={space.id}
            onClick={() => setSelectedSpace(space)}
            className={`bg-white dark:bg-slate-900 border-2 rounded-3xl overflow-hidden shadow-luxury transition-all cursor-pointer ${
              selectedSpace.id === space.id
                ? 'border-amber-500 shadow-2xl scale-105'
                : 'border-slate-200 dark:border-slate-800 hover:border-amber-300'
            }`}
          >
            <div className="h-56 relative">
              <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-slate-950/80 text-amber-400 font-bold text-[10px] px-3 py-1 rounded-full uppercase backdrop-blur-md">
                {space.type}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">
                {space.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {space.description}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Users className="w-4 h-4 text-sky-500" /> {space.capacity}
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-serif-luxury text-lg">
                  {formatPrice(space.pricePerDayGHS)} / day
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 text-white border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
            Personalized Event Planning
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold mb-4">
            Request Event Space & Catering
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            Our dedicated Event Coordinators will customize your seating layout, audio/visual setup, multi-course banquet menu, and guest accommodation packages.
          </p>

          <div className="space-y-3 text-xs">
            {EVENT_PACKAGES[0].includes.map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Kwame Mensah"
                value={eventForm.name}
                onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Phone Number</label>
              <input
                type="text"
                required
                placeholder="e.g. 0244123456"
                value={eventForm.phone}
                onChange={(e) => setEventForm({ ...eventForm, phone: e.target.value })}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1">Event Type</label>
              <select
                value={eventForm.eventType}
                onChange={(e) => setEventForm({ ...eventForm, eventType: e.target.value })}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
              >
                <option value="Wedding Reception">Wedding Reception</option>
                <option value="Corporate Conference">Corporate Conference</option>
                <option value="Executive Boardroom Meeting">Executive Boardroom Meeting</option>
                <option value="Birthday Gala / Party">Birthday Gala / Party</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Expected Guests</label>
              <input
                type="number"
                value={eventForm.guestsCount}
                onChange={(e) => setEventForm({ ...eventForm, guestsCount: Number(e.target.value) })}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Event Date</label>
            <input
              type="date"
              value={eventForm.date}
              onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
              className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-gold hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> SUBMIT EVENT INQUIRY
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventsPage;
