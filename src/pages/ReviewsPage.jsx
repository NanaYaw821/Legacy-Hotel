import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, Send } from 'lucide-react';
import { HOTEL_REVIEWS } from '../data/reviewsData';

export const ReviewsPage = () => {
  const [reviewsList, setReviewsList] = useState(HOTEL_REVIEWS);
  const [form, setForm] = useState({
    author: "Kwame Mensah",
    location: "Accra, Ghana",
    rating: 5,
    roomType: "Executive Suite",
    title: "Outstanding Stay!",
    comment: "The staff went above and beyond for our anniversary stay. The food at Legacy Grill was fantastic."
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRev = {
      id: `rev-${Date.now()}`,
      author: form.author,
      location: form.location,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      rating: Number(form.rating),
      date: "Just now",
      roomType: form.roomType,
      verifiedGuest: true,
      title: form.title,
      comment: form.comment,
      helpfulCount: 0,
      managerResponse: "Thank you for taking the time to share your feedback with Legacy Hotel!"
    };
    setReviewsList([newRev, ...reviewsList]);
    alert("Thank you! Your guest review has been submitted for verification.");
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          Verified Guest Feedback
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Guest Reviews & Experience
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Read genuine reviews from local Ghanaian and international guests who have stayed at Legacy Hotel in Tema.
        </p>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-luxury mb-16 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        
        <div className="md:col-span-2 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-6 md:pb-0 md:pr-6">
          <span className="font-serif-luxury font-bold text-6xl text-sky-600 dark:text-sky-400">4.9</span>
          <div className="flex justify-center md:justify-start gap-1 text-amber-400 my-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
          </div>
          <span className="text-xs text-slate-500 font-semibold">Based on 184 verified guest reviews</span>
        </div>

        <div className="md:col-span-3 space-y-3 text-xs">
          {[
            { label: "Cleanliness & Sanitation", score: "5.0 / 5" },
            { label: "Location & Accessibility (Opposite PRESEC)", score: "5.0 / 5" },
            { label: "Service & Butler Hospitality", score: "4.9 / 5" },
            { label: "Value & Amenities", score: "4.8 / 5" }
          ].map((cat, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300 font-medium">{cat.label}</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{cat.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List & Write Review Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Review Cards */}
        <div className="lg:col-span-2 space-y-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                      {rev.author}
                      {rev.verifiedGuest && <CheckCircle2 className="w-4 h-4 text-sky-500" />}
                    </h4>
                    <span className="text-[11px] text-slate-400">{rev.location} • Stayed in {rev.roomType}</span>
                  </div>
                </div>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                </div>
              </div>

              <h5 className="font-serif-luxury font-bold text-base text-slate-900 dark:text-white">"{rev.title}"</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">"{rev.comment}"</p>

              {rev.managerResponse && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block">Response from Hotel Management:</span>
                  <p>{rev.managerResponse}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Col: Write Review Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl h-fit space-y-4">
          <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">
            Leave a Review
          </h3>
          <p className="text-xs text-slate-500">Only verified guests are permitted to post reviews.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1">Star Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-amber-500"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Outstanding)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1">Review Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-300 block mb-1">Your Comments</label>
              <textarea
                rows={4}
                required
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-amber-500 text-white font-bold text-xs shadow-gold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> SUBMIT VERIFIED REVIEW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
