import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const ContactPage = () => {
  const [form, setForm] = useState({
    name: "Kwame Boateng",
    email: "kwame.boateng@example.com",
    phone: "0505149092",
    subject: "General Reservation Inquiry",
    message: "I would like to inquire about group discounts for next month."
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${form.name}! Your message has been sent to ${HOTEL_INFO.contacts.email}. Front desk will reach you at ${form.phone}.`);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          24/7 Front Desk & Guest Support
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Contact Legacy Hotel
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Located in Tema Community 11, Ghana. Reach out to our front desk, butler concierge, or management team anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury font-bold text-lg text-slate-900 dark:text-white">Physical Location</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {HOTEL_INFO.location.address}<br />
              {HOTEL_INFO.location.city}, {HOTEL_INFO.location.region}<br />
              <strong className="text-amber-600 dark:text-amber-400">Landmark: {HOTEL_INFO.location.landmark}</strong>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury font-bold text-lg text-slate-900 dark:text-white">Phone & WhatsApp</h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p>Primary: <a href={`tel:${HOTEL_INFO.contacts.phonePrimary}`} className="font-bold text-sky-600 dark:text-sky-400 hover:underline">{HOTEL_INFO.contacts.phonePrimary}</a></p>
              <p>Secondary: <a href={`tel:${HOTEL_INFO.contacts.phoneSecondary}`} className="font-bold text-sky-600 dark:text-sky-400 hover:underline">{HOTEL_INFO.contacts.phoneSecondary}</a></p>
              <p>WhatsApp: <a href={HOTEL_INFO.contacts.whatsAppUrl} target="_blank" rel="noreferrer" className="font-bold text-emerald-500 hover:underline">{HOTEL_INFO.contacts.whatsApp}</a></p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury font-bold text-lg text-slate-900 dark:text-white">Official Email</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <a href={`mailto:${HOTEL_INFO.contacts.email}`} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">
                {HOTEL_INFO.contacts.email}
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
            Send Us a Direct Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1">Message</label>
              <textarea
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-amber-500 text-white font-bold text-xs shadow-gold flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> SEND MESSAGE NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
