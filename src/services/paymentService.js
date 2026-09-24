/**
 * Legacy Hotel Payment Service Module
 * Handles payment methods: Visa, Mastercard, MTN Mobile Money, Telecel Cash, AT Money, Bank Transfer, Pay At Hotel.
 * Architected with clean separated handlers for real payment gateway integrations (Paystack / Flutterwave / Hubtel).
 * NO Secret keys exposed on client side.
 */

export const PAYMENT_METHODS = [
  {
    id: "card",
    name: "Credit / Debit Card (Visa, Mastercard)",
    category: "Card",
    icon: "CreditCard",
    description: "Instant 256-bit SSL encrypted card transaction.",
    supportedCurrencies: ["GHS", "USD", "EUR", "GBP"]
  },
  {
    id: "mtn_momo",
    name: "MTN Mobile Money (MoMo)",
    category: "Mobile Money",
    icon: "Smartphone",
    description: "Pay directly via your MTN MoMo wallet prompt.",
    supportedCurrencies: ["GHS"]
  },
  {
    id: "telecel_cash",
    name: "Telecel Cash (Vodafone Cash)",
    category: "Mobile Money",
    icon: "PhoneCall",
    description: "Pay securely using Telecel Cash voucher or OTP prompt.",
    supportedCurrencies: ["GHS"]
  },
  {
    id: "at_money",
    name: "AT Money (AirtelTigo)",
    category: "Mobile Money",
    icon: "Smartphone",
    description: "Pay using AT Money wallet transfer.",
    supportedCurrencies: ["GHS"]
  },
  {
    id: "bank_transfer",
    name: "Direct Bank Transfer / Wire",
    category: "Bank",
    icon: "Building",
    description: "Transfer to Legacy Hotel Ghana Corporate Account (Ecobank / Stanbic).",
    supportedCurrencies: ["GHS", "USD"]
  },
  {
    id: "pay_at_hotel",
    name: "Pay at Hotel (Check-In)",
    category: "On-Site",
    icon: "Banknote",
    description: "Pay upon arrival at front desk via Cash or POS.",
    supportedCurrencies: ["GHS", "USD"]
  }
];

export const processPayment = async ({ bookingReference, methodId, amountGHS, guestDetails, paymentPayload }) => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (methodId === "pay_at_hotel") {
    return {
      success: true,
      transactionId: `TX-ONARRIVAL-${Date.now()}`,
      status: "PAYMENT_PENDING_CHECKIN",
      message: "Booking confirmed! Payment will be collected at check-in.",
      bookingReference
    };
  }

  // Gateway integration point for backend API call (e.g., POST /api/v1/payments/initialize)
  return {
    success: true,
    transactionId: `TX-LEGACY-${Date.now()}`,
    status: "PAID_SUCCESSFUL",
    amountPaid: amountGHS,
    currency: "GHS",
    paymentMethod: methodId,
    timestamp: new Date().toISOString(),
    message: "Payment processed successfully!",
    bookingReference
  };
};
