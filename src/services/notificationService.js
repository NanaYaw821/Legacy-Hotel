/**
 * Legacy Hotel Notification Service Interface
 * Prepared integration points for:
 * - Email confirmation (SMTP / SendGrid)
 * - WhatsApp API (Meta WhatsApp Business API)
 * - SMS Gateway (Hubtel SMS / Twilio)
 * - Real-time Admin Notifications
 */

export const sendBookingNotifications = async (bookingDetails) => {
  console.log("[Notification Service] Sending booking confirmation...", bookingDetails);
  
  // Return simulation payload
  return {
    emailSent: true,
    emailAddress: bookingDetails.guestDetails?.email || "guest@example.com",
    whatsAppSent: true,
    whatsAppPhone: bookingDetails.guestDetails?.phone || "0232457609",
    smsSent: true,
    adminNotified: true,
    timestamp: new Date().toISOString()
  };
};

export const sendConciergeUpdateNotification = async (requestDetails) => {
  console.log("[Notification Service] Sending concierge update...", requestDetails);
  return { success: true };
};
