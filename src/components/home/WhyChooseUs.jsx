import React from 'react';
import { ShieldCheck, MapPin, HeartHandshake, Sparkles, Coffee, Clock } from 'lucide-react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: "Uncompromising Luxury",
      description: "Custom orthopedic bedding, single-origin Ghanaian chocolate amenities, marble spa bathrooms, and curated interior aesthetics."
    },
    {
      icon: MapPin,
      title: "Gateway to Tema Harbour",
      description: "Strategically located in Community 11/12, just 8km from Tema Harbour, purpose-built for maritime, business, and leisure guests."
    },
    {
      icon: HeartHandshake,
      title: "Authentic Ghanaian Hospitality",
      description: "Warm, welcoming, and attentive 24/7 butler staff dedicated to exceeding every guest's expectation."
    },
    {
      icon: ShieldCheck,
      title: "Vigilant Security & Privacy",
      description: "24/7 CCTV surveillance, electronic keycard access, discreet private VIP entrances, and armed security guards."
    },
    {
      icon: Coffee,
      title: "Corporate Amenities & Sky Bar",
      description: "High-speed fiber internet, executive lounge, 400-seat conference centre, and rooftop Sky Bar networking."
    },
    {
      icon: Clock,
      title: "Supreme Restorative Comfort",
      description: "Soundproofed windows, climate-controlled infinity pool cabanas, and peaceful landscaped garden courtyards."
    }
  ];

  return (
    <section className="py-20 bg-[#1c1917] text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9b2c2c]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b45309]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            Harbour Excellence
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold mb-4 text-white">
            Experience the Gate to Global Port
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Combining the warmth of traditional African hospitality with modern five-star corporate amenities for maritime delegations, business executives, and luxury travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#292524]/80 border border-[#44403c] hover:border-[#c5a880] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-luxury group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#9b2c2c]/20 border border-[#c5a880]/30 flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
