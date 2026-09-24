import React from 'react';
import HeroSlideshow from '../components/home/HeroSlideshow';
import BookingSearchBanner from '../components/home/BookingSearchBanner';
import FeaturedRoomsSection from '../components/home/FeaturedRoomsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FacilitiesOverview from '../components/home/FacilitiesOverview';
import RestaurantTeaser from '../components/home/RestaurantTeaser';
import SpecialOffers from '../components/home/SpecialOffers';
import NearbyAttractionsMap from '../components/home/NearbyAttractionsMap';
import ReviewsCarousel from '../components/home/ReviewsCarousel';
import { useBooking } from '../context/BookingContext';

export const HomePage = ({ setActiveTab, setSelectedRoomDetail }) => {
  const { openQuickBooking } = useBooking();

  const handleSearchSubmit = () => {
    setActiveTab('rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (room) => {
    setSelectedRoomDetail(room);
    setActiveTab('room_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Slideshow */}
      <HeroSlideshow
        onBookNowClick={() => openQuickBooking()}
        onSearchClick={() => {
          setActiveTab('rooms');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Booking Availability Search Banner */}
      <BookingSearchBanner onSearchSubmit={handleSearchSubmit} />

      {/* Featured Rooms & Suites */}
      <FeaturedRoomsSection
        onViewAllRooms={() => {
          setActiveTab('rooms');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewDetails={handleViewDetails}
      />

      {/* Why Choose Legacy Hotel */}
      <WhyChooseUs />

      {/* Resort & Business Facilities */}
      <FacilitiesOverview
        onFacilityClick={() => {
          setActiveTab('facilities');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Restaurant & Fine Dining Teaser */}
      <RestaurantTeaser
        onOrderFood={() => {
          setActiveTab('restaurant');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onReserveTable={() => {
          setActiveTab('restaurant');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewMenu={() => {
          setActiveTab('restaurant');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Special Promotions & Offers */}
      <SpecialOffers
        onBookOffer={() => {
          openQuickBooking();
        }}
      />

      {/* Nearby Attractions Map */}
      <NearbyAttractionsMap />

      {/* Guest Reviews & Testimonials */}
      <ReviewsCarousel
        onWriteReview={() => {
          setActiveTab('reviews');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default HomePage;
