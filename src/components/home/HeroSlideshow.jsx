import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Sparkles, Star, MapPin, Anchor, BedDouble, Users } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

export const HeroSlideshow = ({ onBookNowClick, onSearchClick }) => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80",
      headline: "Welcome to Legacy Hotel Tema",
      subtitle: "Your Modern Gateway to Tema Harbour & Commercial Port",
      badge: "Tema Harbour Excellence • 5-Star Corporate Resort"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2000&q=80",
      headline: "Sky Bar & Atlantic Gastronomy",
      subtitle: "Rooftop Skylines, Infinity Pool Oasis & Ghanaian Fine Dining",
      badge: "Exclusive Poolside & Sky Bar Dining"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=2000&q=80",
      headline: "The Royal Presidential Suite",
      subtitle: "Opulent Suites, Restorative Bedding & Dedicated Butler Services",
      badge: "Opulence & Luxury Reimagined"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full min-h-[640px] h-[88vh] max-h-[920px] overflow-hidden bg-[#1c1917]">
      
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Overlay Gradient Matching Alisa Theme */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1c1917]/90 via-[#1c1917]/70 to-[#8b7355]/40 z-10" />
          
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
          />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 flex flex-col justify-center items-center text-center text-white pb-12">
        
        {/* Section Label Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1917]/80 border border-[#c5a880]/50 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-gold animate-fadeIn">
          <Star className="w-3.5 h-3.5 fill-amber-300" />
          <span>{slides[currentSlide].badge}</span>
          <Star className="w-3.5 h-3.5 fill-amber-300" />
        </div>

        {/* Main Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 max-w-4xl text-white drop-shadow-lg leading-tight">
          {slides[currentSlide].headline}
        </h1>

        {/* Supporting Message */}
        <p className="font-heading text-lg sm:text-2xl text-amber-100/90 font-light max-w-2xl mb-6 leading-relaxed drop-shadow">
          {slides[currentSlide].subtitle}
        </p>

        {/* Location Subtext */}
        <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-8 bg-[#292524]/80 px-4 py-1.5 rounded-xl border border-[#44403c]">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>{HOTEL_INFO.location.address}, Ghana • Opposite PRESEC</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <button
            onClick={onBookNowClick}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-[#9b2c2c] via-[#b91c1c] to-[#b45309] hover:from-[#7f1d1d] hover:to-[#92400e] text-white font-bold text-base shadow-gold hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>RESERVE YOUR STAY NOW</span>
          </button>
          
          <button
            onClick={onSearchClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1c1917]/80 hover:bg-[#292524] text-amber-100 border border-[#c5a880]/40 font-semibold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Explore Rooms & Suites</span>
          </button>
        </div>

        {/* Alisa-Style Stat Counters */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 bg-[#1c1917]/80 border border-[#44403c] backdrop-blur-md px-6 sm:px-10 py-3 rounded-2xl shadow-luxury">
          <div className="text-center">
            <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-amber-400 block">50+</span>
            <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider">Luxury Guest Rooms</span>
          </div>
          <div className="text-center border-x border-[#44403c] px-4 sm:px-8">
            <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-amber-400 block">400</span>
            <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider">Seat Conference Hall</span>
          </div>
          <div className="text-center">
            <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-amber-400 block">8km</span>
            <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider">From Tema Harbour</span>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-[#1c1917]/70 text-white border border-[#44403c] hover:bg-[#9b2c2c] transition-colors hidden md:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-2xl bg-[#1c1917]/70 text-white border border-[#44403c] hover:bg-[#9b2c2c] transition-colors hidden md:block"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeroSlideshow;
