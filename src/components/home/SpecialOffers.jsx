import React from 'react';
import { Tag, Sparkles, Calendar, ArrowRight } from 'lucide-react';

export const SpecialOffers = ({ onBookOffer }) => {
  const offers = [
    {
      id: "off-1",
      title: "Weekend Luxury Escape Package",
      tagline: "Save 25% on 2+ Nights Stay",
      description: "Includes complimentary buffet breakfast for 2, 12:00 PM early check-in, and 20% discount on spa treatments.",
      validity: "Valid through Nov 2026",
      code: "WEEKEND25",
      badge: "POPULAR"
    },
    {
      id: "off-2",
      title: "Honeymoon & Romantic Package",
      tagline: "Complimentary Champagne & Suite Upgrade",
      description: "Stay in our Deluxe or Executive Suite and receive candlelit poolside dining, rose decor, and late check-out.",
      validity: "Year-Round Offer",
      code: "ROMANCE",
      badge: "EXCLUSIVE"
    },
    {
      id: "off-3",
      title: "Port Business Delegation Special",
      tagline: "Free Airport Shuttle & Sky Bar Access",
      description: "Book Executive Lounge Suite and enjoy direct Kotoka Airport transfer plus complimentary 2 items laundry daily.",
      validity: "Weekdays Only",
      code: "LEGACYBIZ",
      badge: "CORPORATE"
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-[#9b2c2c] dark:text-amber-400 uppercase tracking-widest block mb-2 flex items-center justify-center gap-2">
          <Tag className="w-4 h-4" /> Exclusive Packages
        </span>
        <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Special Promotions & Offers
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Take advantage of our seasonal promotions and luxury curated stay packages at Legacy Hotel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl p-8 shadow-luxury flex flex-col justify-between hover:border-[#9b2c2c] dark:hover:border-amber-400 transition-all duration-300 relative group"
          >
            <div>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#9b2c2c]/10 text-[#9b2c2c] dark:text-amber-400 uppercase tracking-wider block w-fit mb-4">
                {offer.badge}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {offer.title}
              </h3>
              <p className="text-xs font-semibold text-[#b45309] dark:text-amber-300 mb-4">
                {offer.tagline}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {offer.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#f5e8d2] dark:border-[#44403c] space-y-4">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Code: <strong className="text-[#9b2c2c] dark:text-amber-400">{offer.code}</strong></span>
                <span>{offer.validity}</span>
              </div>

              <button
                onClick={() => onBookOffer(offer)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#9b2c2c] to-[#b45309] text-white font-bold text-xs shadow-gold hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>CLAIM THIS OFFER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
