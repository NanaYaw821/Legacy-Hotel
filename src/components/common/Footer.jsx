import React from 'react';
import { 
  MapPin, Phone, Mail, MessageSquare, 
  Send, Shield, Heart, ArrowUp, Calendar
} from 'lucide-react';
import Logo from './Logo';
import { HOTEL_INFO } from '../../data/hotelData';

export const Footer = ({ setActiveTab }) => {
  const handleNavClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-75" />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        {/* Col 1: Hotel Logo & Bio */}
        <div className="lg:col-span-2 space-y-4">
          <Logo size="lg" />
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Legacy Hotel presents a refined synthesis of luxury accommodation, boutique resort tranquility, and executive business services. Located in Tema Community 11, opposite PRESEC, Ghana.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href={HOTEL_INFO.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-colors">
              <span className="text-xs font-bold">IG</span>
            </a>
            <a href={HOTEL_INFO.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-colors">
              <span className="text-xs font-bold">FB</span>
            </a>
            <a href={HOTEL_INFO.socials.tiktok} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-colors">
              <span className="text-xs font-bold">TT</span>
            </a>
            <a href={HOTEL_INFO.socials.snapchat} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-colors">
              <span className="text-xs font-bold">SC</span>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-sm text-amber-400 uppercase tracking-wider">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {['home', 'rooms', 'facilities', 'restaurant', 'gallery', 'offers'].map(id => (
              <li key={id}>
                <button onClick={() => handleNavClick(id)} className="hover:text-amber-400 transition-colors capitalize">
                  {id}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: VIP Experiences */}
        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-sm text-amber-400 uppercase tracking-wider">
            VIP Experiences
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {[
              { id: 'events', label: 'Weddings & Conferences' },
              { id: 'cars', label: 'Chauffeur & Car Rental' },
              { id: 'experiences', label: 'Romantic & Spa Experiences' },
              { id: 'loyalty', label: 'Loyalty & VIP Membership' },
              { id: 'concierge', label: 'Guest Concierge Portal' },
              { id: 'admin', label: 'Admin Management' }
            ].map(item => (
              <li key={item.id}>
                <button onClick={() => handleNavClick(item.id)} className="hover:text-amber-400 transition-colors">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Info & Map */}
        <div className="space-y-3">
          <h4 className="font-heading font-semibold text-sm text-amber-400 uppercase tracking-wider">
            Hotel Information
          </h4>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{HOTEL_INFO.location.address}, {HOTEL_INFO.location.city}, Ghana</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{HOTEL_INFO.contacts.phonePrimary} / {HOTEL_INFO.contacts.phoneSecondary}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={HOTEL_INFO.contacts.whatsAppUrl} target="_blank" rel="noreferrer" className="hover:underline">
                WhatsApp: {HOTEL_INFO.contacts.whatsApp}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`mailto:${HOTEL_INFO.contacts.email}`} className="hover:underline">
                {HOTEL_INFO.contacts.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-white mb-1">
              Join the Legacy VIP Club
            </h4>
            <p className="text-xs text-slate-400">
              Receive exclusive promotional rates, seasonal room upgrades, and dining invites.
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Legacy Hotel VIP Club!'); }} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="bg-slate-950 text-white placeholder-slate-500 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400 w-full md:w-72"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} Legacy Hotel Tema, Ghana. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => alert('Legacy Hotel Privacy Policy: Your personal and booking data is safeguarded according to Ghana Data Protection Regulations.')} className="hover:text-slate-300">
            Privacy Policy
          </button>
          <button onClick={() => alert('Legacy Hotel Terms & Conditions: Standard check-in 3:00 PM, cancellation up to 24 hours prior without penalty.')} className="hover:text-slate-300">
            Terms & Conditions
          </button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-amber-400 hover:text-amber-300 flex items-center gap-1">
            Back to top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
