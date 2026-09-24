import React, { createContext, useContext, useState } from 'react';
import { MOCK_USER_LOYALTY } from '../data/loyaltyData';

const AuthContext = createContext();

const MOCK_CUSTOMER = {
  id: "USR-9921",
  name: "Nana Yaw",
  email: "kwame.boateng@example.com",
  phone: "0505149092",
  role: "customer",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  loyalty: MOCK_USER_LOYALTY,
  favoriteRoomIds: ["exec-301", "pres-501"],
  vipStatus: "Gold Crest VIP"
};

const MOCK_ADMIN = {
  id: "ADM-001",
  name: "Mr. Kofi Kyere",
  email: "adofokofikyere@gmail.com",
  phone: "0505149092",
  role: "admin",
  staffRoleTitle: "Hotel General Manager",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('legacy_hotel_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('legacy_hotel_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const loginAsCustomer = (customUser) => {
    const newUser = customUser || {
      id: "USR-001",
      name: "Guest",
      email: "guest@legacyhotel.com",
      role: "customer",
      vipStatus: "VIP Member",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    };
    setUser(newUser);
    try {
      localStorage.setItem('legacy_hotel_auth', JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
  };

  const loginAsAdmin = () => {
    setUser(MOCK_ADMIN);
    try {
      localStorage.setItem('legacy_hotel_auth', JSON.stringify(MOCK_ADMIN));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('legacy_hotel_auth');
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = (roomId) => {
    setFavorites(prev => {
      const updated = prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId];
      try {
        localStorage.setItem('legacy_hotel_favs', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      loginAsCustomer, 
      loginAsAdmin, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      favorites,
      toggleFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
