import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import RoomCard from '../components/rooms/RoomCard';
import { INITIAL_ROOMS, ROOM_CATEGORIES } from '../data/roomsData';

export const RoomsPage = ({ setSelectedRoomDetail, setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(4000);
  const [capacityFilter, setCapacityFilter] = useState("all");

  const handleViewDetails = (room) => {
    setSelectedRoomDetail(room);
    setActiveTab('room_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredRooms = INITIAL_ROOMS.filter(room => {
    const matchesCategory = selectedCategory === "all" || room.typeId === selectedCategory;
    const matchesQuery = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = room.pricePerNightGHS <= maxPrice;
    const matchesCapacity = capacityFilter === "all" || room.capacityAdults >= Number(capacityFilter);
    return matchesCategory && matchesQuery && matchesPrice && matchesCapacity;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          Accommodation Inventory
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Rooms & Executive Suites
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Explore our range of standard, deluxe, family, and presidential suites equipped with modern luxury amenities in Tema.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury mb-10 space-y-6">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {ROOM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Search Keyword</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search suite name, amenity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-xs p-3 pl-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Max Price: GH₵ {maxPrice}</label>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Min Guests Capacity</label>
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">Any Capacity</option>
              <option value="2">2+ Guests</option>
              <option value="4">4+ Guests (Family)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onViewDetails={handleViewDetails} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm">No room categories match your filter criteria.</p>
          <button
            onClick={() => { setSelectedCategory("all"); setSearchQuery(""); setMaxPrice(4000); setCapacityFilter("all"); }}
            className="mt-4 px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
