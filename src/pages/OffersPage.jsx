import React from 'react';
import SpecialOffers from '../components/home/SpecialOffers';
import { useBooking } from '../context/BookingContext';

export const OffersPage = ({ setActiveTab }) => {
  const { openQuickBooking } = useBooking();

  return (
    <div className="py-12 animate-fadeIn">
      <SpecialOffers
        onBookOffer={() => {
          openQuickBooking();
        }}
      />
    </div>
  );
};

export default OffersPage;
