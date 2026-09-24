import React, { useState } from 'react';
import { Car, Users, Luggage, Shield, Calendar, ArrowRight } from 'lucide-react';
import { CAR_LISTINGS } from '../data/carsData';
import { useCurrency } from '../context/CurrencyContext';

export const CarRentalPage = () => {
  const { formatPrice } = useCurrency();
  const [selectedCar, setSelectedCar] = useState(CAR_LISTINGS[0]);

  const handleBookCar = (car) => {
    alert(`Rental request sent for ${car.name} (${formatPrice(car.dailyPriceGHS)} / day). Chauffeur team will confirm schedule.`);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          Executive Chauffeur & VIP Fleet
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Luxury Car Rental & Airport Transfers
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Chauffeured Land Cruiser Prado V8s, Mercedes E-Class, and VIP group shuttles available for Tema port, business meetings, and Kotoka International Airport transfers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CAR_LISTINGS.map((car) => (
          <div key={car.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-luxury flex flex-col justify-between">
            <div className="h-56 relative">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-slate-950/80 text-amber-400 font-bold text-[10px] px-3 py-1 rounded-full uppercase">
                {car.category}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">{car.name}</h3>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 border-y border-slate-100 dark:border-slate-800 py-3">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-sky-500" /> {car.seats} Seats</span>
                <span className="flex items-center gap-1"><Luggage className="w-3.5 h-3.5 text-amber-500" /> {car.luggage}</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Daily Rate</span>
                  <span className="font-serif-luxury font-bold text-xl text-sky-600 dark:text-sky-400">{formatPrice(car.dailyPriceGHS)}</span>
                </div>
                <button onClick={() => handleBookCar(car)} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-gold">
                  BOOK CAR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRentalPage;
