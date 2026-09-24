import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, MessageSquare, User, Calendar, 
  Sparkles, Award, Shield, Utensils, BedDouble, Car, 
  Info, Mail, LayoutDashboard, ChevronDown
} from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import CurrencySelector from './CurrencySelector';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { HOTEL_INFO } from '../../data/hotelData';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const { user, isAdmin, logout } = useAuth();
  const { openQuickBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'restaurant', label: 'Dining & Sky Bar' },
    { id: 'events', label: 'Conferences & Events' },
    { id: 'offers', label: 'Promotions' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const subNavLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'restaurant', label: 'Gastronomy' },
    { id: 'events', label: 'Meetings' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'cars', label: 'Transport & Fleet' },
    { id: 'concierge', label: 'VIP Concierge' }
  ];

  const moreLinks = [
    { id: 'gallery', label: 'Media Gallery', icon: Sparkles },
    { id: 'reviews', label: 'Guest Reviews', icon: Award },
    { id: 'experiences', label: 'VIP Experiences', icon: Sparkles },
    { id: 'cars', label: 'Car Rental & Transport', icon: Car },
    { id: 'concierge', label: 'Butler Concierge', icon: Shield },
    { id: 'loyalty', label: 'Loyalty VIP Crest', icon: Award }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /* Unified Locked Sticky Header System - Stays fixed on scroll with Dark Luxury Backdrop for Gold Logo Contrast */
    <header className="sticky top-0 z-50 transition-all duration-300 shadow-2xl bg-[#1c1917] text-white">
      
      {/* Top Bar - Contact & Global Settings */}
      <div className="bg-[#141211] text-slate-300 text-xs py-2 px-4 border-b border-[#292524] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-200/90 font-mono-custom text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Tema Community 11, Opposite PRESEC • 8km from Tema Harbour
            </span>
            <a href={`tel:${HOTEL_INFO.contacts.phonePrimary}`} className="hover:text-amber-400 transition-colors hidden sm:flex items-center gap-1 font-semibold text-slate-300">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              {HOTEL_INFO.contacts.phonePrimary}
            </a>
            <a href={HOTEL_INFO.contacts.whatsAppUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors hidden md:flex items-center gap-1 font-semibold text-slate-300">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp: {HOTEL_INFO.contacts.whatsApp}
            </a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <CurrencySelector />
            <ThemeToggle />

            {/* Account / Login or Admin */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { if (isAdmin) { logout(); handleNavClick('login'); } else { handleNavClick('account'); } }}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#292524] hover:bg-[#44403c] text-amber-300 font-bold transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user.name.split(' ')[0]} ({isAdmin ? 'Admin' : 'VIP'})</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="hover:text-amber-300 font-bold transition-colors flex items-center gap-1 text-amber-400"
              >
                <User className="w-3.5 h-3.5" />
                Login
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => {
                  logout();
                  handleNavClick('login');
                }}
                className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-bold flex items-center gap-1"
              >
                <LayoutDashboard className="w-3 h-3" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Logo & Primary Nav Bar */}
      <div className={`transition-all duration-300 bg-[#1c1917] ${
        isScrolled ? 'py-2.5 backdrop-blur-md bg-[#1c1917]/95' : 'py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo Container */}
          <div onClick={() => handleNavClick('home')} className="p-1 rounded-xl bg-[#141211]/60 border border-[#44403c]/40 shadow-inner">
            <Logo size="md" />
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-amber-300 bg-[#292524] font-bold shadow-md border border-[#c5a880]/30'
                      : 'text-slate-200 hover:text-amber-300 hover:bg-[#292524]/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:text-amber-300 transition-colors"
              >
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#292524] rounded-2xl shadow-2xl border border-[#44403c] py-2 z-50 text-white">
                  {moreLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-[#44403c] hover:text-amber-300 flex items-center gap-2.5 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-amber-400" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Prominent Book Now CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#9b2c2c] via-[#b91c1c] to-[#b45309] hover:from-[#7f1d1d] hover:to-[#92400e] text-white font-bold text-sm shadow-gold transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK NOW</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openQuickBooking()}
              className="px-3.5 py-1.5 rounded-lg bg-[#9b2c2c] text-white font-bold text-xs shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-white hover:bg-[#292524]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Bar (Signature Alisa Style) */}
      <div className="hidden md:block bg-[#141211] border-t border-[#292524] py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-xs uppercase tracking-widest font-semibold text-slate-300">
          {subNavLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors hover:text-amber-400 ${
                activeTab === item.id ? 'text-amber-300 font-bold underline underline-offset-4' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile App Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1c1917] border-b border-[#292524] px-4 pt-3 pb-6 space-y-2 animate-fadeIn text-white">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#292524] text-amber-300 font-bold border border-[#c5a880]/30'
                    : 'text-slate-200 hover:bg-[#292524]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#292524] pt-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2 px-2">
              VIP Services
            </span>
            <div className="grid grid-cols-2 gap-2">
              {moreLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-[#292524] flex items-center gap-2"
                >
                  <item.icon className="w-3.5 h-3.5 text-amber-400" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('book');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9b2c2c] to-[#b45309] text-white font-bold text-center shadow-gold"
            >
              BOOK YOUR STAY NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
