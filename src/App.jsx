import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AIAssistantModal from './components/common/AIAssistantModal';
import LiveChatWidget from './components/common/LiveChatWidget';
import QuickBookingModal from './components/common/QuickBookingModal';

import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import FacilitiesPage from './pages/FacilitiesPage';
import RestaurantPage from './pages/RestaurantPage';
import GalleryPage from './pages/GalleryPage';
import OffersPage from './pages/OffersPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import LoyaltyVIPPage from './pages/LoyaltyVIPPage';
import ConciergeGuestPage from './pages/ConciergeGuestPage';
import ExperiencesPage from './pages/ExperiencesPage';
import CarRentalPage from './pages/CarRentalPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRoomDetail, setSelectedRoomDetail] = useState(null);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} setSelectedRoomDetail={setSelectedRoomDetail} />;
      case 'rooms':
        return <RoomsPage setActiveTab={setActiveTab} setSelectedRoomDetail={setSelectedRoomDetail} />;
      case 'room_detail':
        return (
          <RoomDetailPage
            room={selectedRoomDetail}
            onBack={() => {
              setActiveTab('rooms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'facilities':
        return <FacilitiesPage />;
      case 'restaurant':
        return <RestaurantPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'offers':
        return <OffersPage setActiveTab={setActiveTab} />;
      case 'events':
        return <EventsPage />;
      case 'about':
        return <AboutPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'book':
        return (
          <BookingPage
            onBookingSuccess={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'login':
        return <LoginPage setActiveTab={setActiveTab} />;
      case 'account':
        return <CustomerDashboardPage setActiveTab={setActiveTab} setSelectedRoomDetail={setSelectedRoomDetail} />;
      case 'loyalty':
        return <LoyaltyVIPPage />;
      case 'concierge':
        return <ConciergeGuestPage />;
      case 'experiences':
        return <ExperiencesPage />;
      case 'cars':
        return <CarRentalPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage setActiveTab={setActiveTab} setSelectedRoomDetail={setSelectedRoomDetail} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Main Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Content View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Widgets & Modals */}
      <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <LiveChatWidget onOpenAI={() => setIsAIOpen(true)} />
      <QuickBookingModal
        onNavigateToBooking={() => {
          setActiveTab('book');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <BookingProvider>
            <AppContent />
          </BookingProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
