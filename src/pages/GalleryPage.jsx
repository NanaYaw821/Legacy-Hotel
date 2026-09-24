import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryPage = () => {
  const galleryItems = [
    { id: 1, title: "Legacy Hotel Exterior Night View", category: "Exterior", src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" },
    { id: 2, title: "Infinity Swimming Pool & VIP Cabanas", category: "Pool", src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80" },
    { id: 3, title: "Royal Presidential Master Bedroom", category: "Rooms", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80" },
    { id: 4, title: "Executive Business Suite Lounge", category: "Rooms", src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80" },
    { id: 5, title: "Legacy Fine Dining & Grill Salon", category: "Restaurant", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
    { id: 6, title: "Royal Ghana Wellness Spa Session", category: "Facilities", src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" },
    { id: 7, title: "The Royal Legacy Grand Ballroom Setup", category: "Events", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80" },
    { id: 8, title: "Romantic Poolside Candlelit Setup", category: "Experiences", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" }
  ];

  const categories = ["All", "Exterior", "Rooms", "Restaurant", "Pool", "Facilities", "Events", "Experiences"];

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLightBoxIndex, setActiveLightBoxIndex] = useState(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory);

  const openLightbox = (index) => setActiveLightBoxIndex(index);
  const closeLightbox = () => setActiveLightBoxIndex(null);

  const nextLightbox = () => setActiveLightBoxIndex((activeLightBoxIndex + 1) % filtered.length);
  const prevLightbox = () => setActiveLightBoxIndex((activeLightBoxIndex - 1 + filtered.length) % filtered.length);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          Visual Tour & Media Gallery
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Legacy Hotel Gallery
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Immerse yourself in high-resolution photography showcasing our architecture, suites, restaurant, infinity pool, and events in Tema.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-luxury border border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">{item.category}</span>
              <h3 className="font-serif-luxury font-bold text-sm leading-snug">{item.title}</h3>
            </div>
            <div className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeLightBoxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <button onClick={closeLightbox} className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950">
            <X className="w-6 h-6" />
          </button>

          <button onClick={prevLightbox} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button onClick={nextLightbox} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[80vh] text-center space-y-4">
            <img
              src={filtered[activeLightBoxIndex].src}
              alt={filtered[activeLightBoxIndex].title}
              className="max-h-[70vh] max-w-full mx-auto rounded-2xl shadow-2xl object-contain"
            />
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              {filtered[activeLightBoxIndex].title} ({filtered[activeLightBoxIndex].category})
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
