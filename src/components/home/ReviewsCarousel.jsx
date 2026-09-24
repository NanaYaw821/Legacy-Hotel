import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { HOTEL_REVIEWS } from '../../data/reviewsData';

export const ReviewsCarousel = ({ onWriteReview }) => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-semibold text-[#9b2c2c] dark:text-amber-400 uppercase tracking-widest block mb-2">
            Verified Guest Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
            What Our Guests Say
          </h2>
        </div>

        <button
          onClick={onWriteReview}
          className="px-5 py-2.5 rounded-xl border border-[#9b2c2c] text-[#9b2c2c] dark:text-amber-400 hover:bg-[#fdf2d6] dark:hover:bg-[#292524] font-semibold text-xs transition-colors"
        >
          SUBMIT GUEST REVIEW
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOTEL_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl p-8 shadow-luxury flex flex-col justify-between relative group"
          >
            <Quote className="w-10 h-10 text-[#9b2c2c]/20 dark:text-amber-400/20 absolute top-6 right-6" />

            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <h4 className="font-serif-luxury font-bold text-lg text-slate-900 dark:text-white mb-2">
                "{rev.title}"
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#f5e8d2] dark:border-[#44403c] flex items-center gap-3">
              <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h5 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                  {rev.author}
                  {rev.verifiedGuest && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </h5>
                <span className="text-[10px] text-slate-400">{rev.location} • Stayed in {rev.roomType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsCarousel;
