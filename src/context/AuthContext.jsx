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
  const [user, setUser] = useState(MOCK_CUSTOMER); // default demo logged in
  const [favorites, setFavorites] = useState(MOCK_CUSTOMER.favoriteRoomIds);

  const loginAsCustomer = () => {
    setUser(MOCK_CUSTOMER);
  };

  const loginAsAdmin = () => {
    setUser(MOCK_ADMIN);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (roomId) => {
    setFavorites(prev => 
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
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
