import React, { createContext, useContext, useState } from 'react';
import { INITIAL_ROOMS } from '../data/roomsData';

const BookingContext = createContext();

export const ADDON_SERVICES = [
  { id: "addon-breakfast", name: "Daily Gourmet Buffet Breakfast", priceGHS: 120, perNight: true, icon: "Utensils" },
  { id: "addon-shuttle", name: "VIP Airport Transfer (Kotoka ACC)", priceGHS: 250, perNight: false, icon: "Car" },
  { id: "addon-romantic", name: "Romantic Champagne & Rose Decor", priceGHS: 350, perNight: false, icon: "Heart" },
  { id: "addon-extrabed", name: "Extra Orthopedic Bed", priceGHS: 150, perNight: true, icon: "Bed" },
  { id: "addon-spa", name: "Royal Shea Butter Spa Massage", priceGHS: 400, perNight: false, icon: "Sparkles" }
];

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days later
    adults: 2,
    children: 0,
    roomType: "all"
  });

  const [selectedRoom, setSelectedRoom] = useState(INITIAL_ROOMS[1]); // Default Deluxe
  const [selectedAddons, setSelectedAddons] = useState(["addon-breakfast"]);
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);

  const [completedBookings, setCompletedBookings] = useState([
    {
      referenceNumber: "LGC-2026-9812",
      room: INITIAL_ROOMS[2], // Executive
      checkIn: "2026-10-05",
      checkOut: "2026-10-08",
      nights: 3,
      adults: 2,
      children: 0,
      addons: ["addon-breakfast", "addon-shuttle"],
      totalAmountGHS: 4600,
      paymentMethod: "MTN Mobile Money",
      paymentStatus: "PAID",
      createdAt: "2026-09-18"
    }
  ]);

  const [currentBookingStep, setCurrentBookingStep] = useState(1); // 1: Search, 2: Room, 3: Addons & Info, 4: Payment, 5: Confirmation

  const calculateNights = (inDate, outDate) => {
    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);

  const calculateTotal = (room, addonIds) => {
    if (!room) return 0;
    const roomTotal = room.pricePerNightGHS * nights;
    const addonsTotal = addonIds.reduce((acc, id) => {
      const addon = ADDON_SERVICES.find(a => a.id === id);
      if (!addon) return acc;
      return acc + (addon.perNight ? addon.priceGHS * nights : addon.priceGHS);
    }, 0);
    return roomTotal + addonsTotal;
  };

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const openQuickBooking = (room = null) => {
    if (room) setSelectedRoom(room);
    setIsQuickBookingOpen(true);
  };

  const closeQuickBooking = () => {
    setIsQuickBookingOpen(false);
  };

  const addBooking = (newBooking) => {
    setCompletedBookings(prev => [newBooking, ...prev]);
  };

  return (
    <BookingContext.Provider value={{
      searchParams,
      setSearchParams,
      selectedRoom,
      setSelectedRoom,
      selectedAddons,
      toggleAddon,
      isQuickBookingOpen,
      openQuickBooking,
      closeQuickBooking,
      nights,
      calculateTotal,
      completedBookings,
      addBooking,
      currentBookingStep,
      setCurrentBookingStep,
      ADDON_SERVICES
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
