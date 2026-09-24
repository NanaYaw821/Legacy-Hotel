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

  // ── Print receipt in a fresh blank window (no navbar / footer) ──
  const printReceipt = (confirmation) => {
    const logoUrl = `${window.location.origin}/legacy_logo.jpg`;
    const w = window.open('', '_blank', 'width=800,height=600');
    if (!w) return;
    w.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Legacy Hotel – Booking Receipt</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      color: #111827;
      padding: 40px;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .header img {
      height: 72px;
      object-fit: contain;
      border-radius: 12px;
      border: 1px solid #e8d5b7;
      padding: 4px;
      background: #faf7f5;
      margin-bottom: 12px;
    }
    .header h1 {
      font-size: 2.2rem;
      font-weight: 900;
      color: #111827;
      margin-bottom: 6px;
    }
    .header p {
      font-size: 0.78rem;
      color: #6b7280;
    }
    .header .phone {
      color: #dc2626;
      font-weight: 600;
    }
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      padding: 28px;
      max-width: 680px;
      margin: 0 auto;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f3f4f6;
    }
    .logo-row img {
      height: 48px;
      object-fit: contain;
      border-radius: 10px;
      border: 1px solid #e8d5b7;
      padding: 3px;
      background: #faf7f5;
    }
    .logo-text {
      font-size: 1.1rem;
      font-weight: 900;
      letter-spacing: 0.05em;
      color: #9b2c2c;
    }
    .logo-sub {
      font-size: 0.6rem;
      color: #9ca3af;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .inner {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 24px;
      background: #f9fafb;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    .label {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .value {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
    }
    .value.blue { color: #0284c7; }
    .divider {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 0 0 20px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .total-label {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 4px;
      text-align: right;
    }
    .total-amount {
      font-size: 2.6rem;
      font-weight: 900;
      color: #d97706;
      text-align: right;
    }
    @media print {
      body { padding: 20px; }
      @page { margin: 1cm; size: A4; }
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${logoUrl}" alt="Legacy Hotel Logo" />
    <h1>Legacy Hotel!</h1>
    <p>
      Tema Community 11, Opposite PRESEC &nbsp;•&nbsp; 8km from Tema Harbour
      &nbsp;&nbsp;<span class="phone">📞 ${HOTEL_INFO.contacts.phonePrimary}</span>
    </p>
  </div>

  <div class="card">
    <div class="logo-row">
      <img src="${logoUrl}" alt="Legacy Hotel Logo" />
      <div>
        <div class="logo-text">LEGACY</div>
        <div class="logo-sub">Hotel &amp; Resort</div>
      </div>
    </div>

    <div class="inner">
      <div class="grid">
        <div>
          <div class="label">Guest Name</div>
          <div class="value">${confirmation.guestDetails.firstName} ${confirmation.guestDetails.lastName}</div>
        </div>
        <div>
          <div class="label">Check-in</div>
          <div class="value">${confirmation.checkIn}</div>
        </div>
        <div>
          <div class="label">Check-out</div>
          <div class="value">${confirmation.checkOut}</div>
        </div>
        <div>
          <div class="label">Room Booked</div>
          <div class="value blue">${confirmation.room.name}</div>
        </div>
      </div>

      <hr class="divider"/>

      <div class="bottom">
        <div>
          <div class="label">Payment Method</div>
          <div class="value" style="text-transform:capitalize">${confirmation.paymentMethod}</div>
        </div>
        <div>
          <div class="total-label">Total Amount Paid</div>
          <div class="total-amount">GH¢ ${Number(confirmation.totalAmountGHS).toLocaleString()}</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; }
  </script>
</body>
</html>`);
    w.document.close();
  };

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
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-fadeIn">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 text-xl font-light shadow-sm">
              ✓
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest block">
              RESERVATION CONFIRMED
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Thank You for Choosing Legacy Hotel!
            </h2>
            <p className="text-xs text-[#b89552] dark:text-[#d4af37] font-medium flex items-center justify-center gap-2 flex-wrap pt-1">
              <span>Tema Community 11, Opposite PRESEC</span>
              <span>•</span>
              <span>8km from Tema Harbour</span>
              <span className="flex items-center gap-1 font-semibold">📞 {HOTEL_INFO.contacts.phonePrimary}</span>
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-2">
              <Logo size="sm" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => printReceipt(completedConfirmation)}
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
        </div>
      )}


    </div>
  );
};

export default BookingPage;

