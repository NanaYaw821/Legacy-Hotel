import React, { createContext, useContext, useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState('GHS');

  const currentCurrency = HOTEL_INFO.currencies.find(c => c.code === currencyCode) || HOTEL_INFO.currencies[0];

  const formatPrice = (amountInGHS) => {
    if (currencyCode === 'GHS') {
      return `GH₵ ${amountInGHS.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    const converted = amountInGHS * currentCurrency.rateAgainstGHS;
    return `${currentCurrency.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currencyCode, setCurrencyCode, currentCurrency, formatPrice, currencies: HOTEL_INFO.currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
