import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import RoomCard from '../rooms/RoomCard';
import { INITIAL_ROOMS } from '../../data/roomsData';

export const FeaturedRoomsSection = ({ onViewAllRooms, onViewDetails }) => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Luxury Accommodations
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Featured Rooms & Presidential Suites
          </h2>
        </div>

        <button
          onClick={onViewAllRooms}
          className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors group"
        >
          <span>EXPLORE ALL ROOM CATEGORIES</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid of Featured Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_ROOMS.slice(0, 3).map((room) => (
          <RoomCard key={room.id} room={room} onViewDetails={onViewDetails} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRoomsSection;
