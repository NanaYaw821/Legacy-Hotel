import React, { useState } from 'react';
import { 
  Check, Calendar, Users, Bed, CreditCard, ShieldCheck, 
  Printer, ArrowRight, ArrowLeft, Sparkles, Smartphone, Building, Banknote 
} from 'lucide-react';
import Logo from '../components/common/Logo';
import { useBooking } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { INITIAL_ROOMS } from '../data/roomsData';
import { HOTEL_INFO } from '../data/hotelData';
import { PAYMENT_METHODS, processPayment } from '../services/paymentService';
import { sendBookingNotifications } from '../services/notificationService';

export const BookingPage = ({ onBookingSuccess }) => {
  const { 
    searchParams, 
    setSearchParams, 
    selectedRoom, 
    setSelectedRoom, 
    selectedAddons, 
    toggleAddon, 
    nights, 
    calculateTotal,
    addBooking,
    ADDON_SERVICES
  } = useBooking();

  const { formatPrice } = useCurrency();

  const [step, setStep] = useState(1); // 1: Dates/Room, 2: Addons & Info, 3: Payment, 4: Confirmation
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedConfirmation, setCompletedConfirmation] = useState(null);

  const [guestForm, setGuestForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    momoNumber: ""
  });

  const totalGHS = calculateTotal(selectedRoom, selectedAddons);

  const handleCompleteBooking = async () => {
    setIsProcessing(true);

    const refNum = `LGC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const paymentResult = await processPayment({
      bookingReference: refNum,
      methodId: selectedPaymentMethod,
      amountGHS: totalGHS,
      guestDetails: guestForm
    });

    const bookingObject = {
      referenceNumber: refNum,
      room: selectedRoom,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      nights,
      adults: searchParams.adults,
      children: searchParams.children,
      addons: selectedAddons,
      totalAmountGHS: totalGHS,
      guestDetails: guestForm,
      paymentMethod: selectedPaymentMethod,
      paymentStatus: paymentResult.status,
      transactionId: paymentResult.transactionId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    await sendBookingNotifications(bookingObject);

    addBooking(bookingObject);
    setCompletedConfirmation(bookingObject);
    setIsProcessing(false);
    setStep(4);
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 animate-fadeIn">
      
      {/* Wizard Progress Bar */}
      {step < 4 && (
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <span className={step >= 1 ? 'text-sky-600 dark:text-sky-400' : ''}>1. Room & Dates</span>
            <span className={step >= 2 ? 'text-sky-600 dark:text-sky-400' : ''}>2. Add-ons & Guest</span>
            <span className={step >= 3 ? 'text-sky-600 dark:text-sky-400' : ''}>3. Payment</span>
            <span className={step >= 4 ? 'text-amber-500' : ''}>4. Confirmation</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <div className={`h-full bg-sky-500 transition-all duration-300 ${
              step === 1 ? 'w-1/4' : step === 2 ? 'w-2/4' : step === 3 ? 'w-3/4' : 'w-full bg-amber-500'
            }`} />
          </div>
        </div>
      )}

      {/* STEP 1: Select Room & Dates */}
      {step === 1 && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury">
            <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white mb-6">
              Step 1: Select Check-In Dates & Room
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                  className="w-full bg-white dark:bg-slate-800 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                  className="w-full bg-white dark:bg-slate-800 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Adults</label>
                <select
                  value={searchParams.adults}
                  onChange={(e) => setSearchParams({ ...searchParams, adults: Number(e.target.value) })}
                  className="w-full bg-white dark:bg-slate-800 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Duration</label>
                <div className="p-2.5 font-bold text-xs text-sky-600 dark:text-sky-400">
                  {nights} Night{nights > 1 ? 's' : ''} Stay
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">
                Choose Room Category
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INITIAL_ROOMS.map((room) => {
                  const isSelected = selectedRoom.id === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/60 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={room.primaryPhoto} alt={room.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">{room.name}</h4>
                          <span className="text-[10px] text-slate-400">{room.bedType}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-serif-luxury font-bold text-lg text-sky-600 dark:text-sky-400">{formatPrice(room.pricePerNightGHS)}</span>
                        <span className="block text-[10px] text-slate-400">/ night</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
              >
                <span>Continue to Add-ons</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Optional Add-ons & Guest Details */}
      {step === 2 && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-6">
            <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
              Step 2: Enhance Your Stay & Guest Information
            </h2>

            {/* Addons Grid */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block mb-3">
                Optional Luxury Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDON_SERVICES.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border cursor-pointer flex justify-between items-center ${
                        isChecked ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">+{formatPrice(addon.priceGHS)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Form */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">
                Lead Guest Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-500 block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame"
                    value={guestForm.firstName}
                    onChange={(e) => setGuestForm({ ...guestForm, firstName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mensah"
                    value={guestForm.lastName}
                    onChange={(e) => setGuestForm({ ...guestForm, lastName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-500 block mb-1">Email (For Instant Confirmation)</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. guest@example.com"
                    value={guestForm.email}
                    onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Phone / Mobile Money Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0244123456"
                    value={guestForm.phone}
                    onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value, momoNumber: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Special Requests & Flight Details</label>
                <textarea
                  rows={3}
                  placeholder="Optional: Flight details, pillow preferences, arrival time..."
                  value={guestForm.specialRequests}
                  onChange={(e) => setGuestForm({ ...guestForm, specialRequests: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
              >
                <span>Proceed to Payment</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Payment Options */}
      {step === 3 && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-6">
            <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
              Step 3: Select Secure Payment Method
            </h2>

            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-500 block">Total Amount to Pay:</span>
                <span className="font-serif-luxury font-bold text-3xl text-sky-600 dark:text-sky-400">{formatPrice(totalGHS)}</span>
              </div>
              <div className="text-right text-slate-500">
                <span>{selectedRoom.name}</span>
                <span className="block">{nights} Night{nights > 1 ? 's' : ''} Stay</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedPaymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 shadow-md' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 ${isSelected ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-400'}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{method.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{method.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                disabled={isProcessing}
                onClick={handleCompleteBooking}
                className="px-9 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white font-bold text-sm shadow-gold flex items-center gap-2 transition-transform hover:scale-105 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Security Token...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>CONFIRM & COMPLETE BOOKING ({formatPrice(totalGHS)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Successful Confirmation & Receipt */}
      {step === 4 && completedConfirmation && (
        <>
          {/* ── visible on screen only ── */}
          <div className="print-hide bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 animate-fadeIn">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 text-xl font-light shadow-sm">
                ✓
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest block">
                RESERVATION CONFIRMED
              </span>
            </div>
          </div>

          {/* ── receipt root — hidden on screen, shown when printing ── */}
          <div className="print-receipt-root" style={{ display: 'none' }}>
            {/* Hotel header */}
            <div className="print-receipt-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', margin: '0 0 6px' }}>Legacy Hotel!</h1>
              <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                Tema Community 11, Opposite PRESEC &nbsp;•&nbsp; 8km from Tema Harbour &nbsp;📞&nbsp; {HOTEL_INFO.contacts.phonePrimary}
              </p>
            </div>

            {/* Receipt card */}
            <div className="print-receipt-card" style={{
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
              background: '#ffffff',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              {/* Logo row + buttons (buttons hidden via print-hide) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px' }}>
                <Logo size="sm" />
                <div className="print-hide" style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => window.print()}
                    style={{ padding: '6px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: '#fff' }}
                  >
                    <Printer style={{ width: '14px', height: '14px' }} />
                    Print
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    style={{ padding: '6px 18px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: '#fff' }}
                  >
                    Book
                  </button>
                </div>
              </div>

              {/* Details grid */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '14px', padding: '24px', background: '#f9fafb' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div>
                    <span style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Guest Name</span>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>
                      {completedConfirmation.guestDetails.firstName} {completedConfirmation.guestDetails.lastName}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Check-in</span>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{completedConfirmation.checkIn}</span>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Check-out</span>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{completedConfirmation.checkOut}</span>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Room Booked</span>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#0284c7' }}>{completedConfirmation.room.name}</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', margin: '20px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Payment Method</span>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827', textTransform: 'capitalize' }}>
                      {completedConfirmation.paymentMethod}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Total Amount Paid</span>
                    <span style={{ fontWeight: 900, fontSize: '2.5rem', color: '#d97706' }}>
                      {formatPrice(completedConfirmation.totalAmountGHS)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── also show receipt card visually on screen below confirm banner ── */}
          <div className="print-hide bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center pb-2">
              <Logo size="sm" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Book
                </button>
              </div>
            </div>

            <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/40 dark:bg-slate-900/40">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">Guest Name</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {completedConfirmation.guestDetails.firstName} {completedConfirmation.guestDetails.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">Check-in</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{completedConfirmation.checkIn}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">Check-out</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{completedConfirmation.checkOut}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">Room Booked</span>
                  <span className="font-bold text-sm text-[#0284c7] dark:text-sky-400">{completedConfirmation.room.name}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 my-5" />

              <div className="flex justify-between items-end">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">Payment Method</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                    {completedConfirmation.paymentMethod}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">Total Amount Paid</span>
                  <span className="font-serif-luxury font-bold text-3xl sm:text-4xl text-[#d97706] dark:text-amber-500">
                    {formatPrice(completedConfirmation.totalAmountGHS)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default BookingPage;
