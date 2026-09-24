import { HOTEL_INFO } from "../data/hotelData";
import { INITIAL_ROOMS } from "../data/roomsData";

export const queryAIAssistant = async (userQuery) => {
  const queryLower = userQuery.toLowerCase();
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (queryLower.includes("location") || queryLower.includes("where") || queryLower.includes("address") || queryLower.includes("presec")) {
    return `Legacy Hotel is located at **${HOTEL_INFO.location.address}**, Tema, Greater Accra Region, Ghana. Landmark: Directly opposite Tema PRESEC Senior High School. We are 25-30 minutes from Kotoka International Airport.`;
  }

  if (queryLower.includes("phone") || queryLower.includes("contact") || queryLower.includes("number") || queryLower.includes("call") || queryLower.includes("whatsapp")) {
    return `You can reach Legacy Hotel directly via:\n- **Phone**: ${HOTEL_INFO.contacts.phonePrimary} / ${HOTEL_INFO.contacts.phoneSecondary}\n- **WhatsApp**: ${HOTEL_INFO.contacts.whatsApp}\n- **Email**: ${HOTEL_INFO.contacts.email}`;
  }

  if (queryLower.includes("check-in") || queryLower.includes("checkin") || queryLower.includes("checkout") || queryLower.includes("check out") || queryLower.includes("time")) {
    return `Our standard check-in time is **${HOTEL_INFO.operatingHours.checkIn}** and check-out time is **${HOTEL_INFO.operatingHours.checkOut}**. Front desk is open 24/7. Early check-in and late check-out are available upon request for VIP members!`;
  }

  if (queryLower.includes("room") || queryLower.includes("price") || queryLower.includes("cost") || queryLower.includes("rate") || queryLower.includes("suite")) {
    const roomSummary = INITIAL_ROOMS.map(r => `• **${r.name}**: GH₵ ${r.pricePerNightGHS} / night ($${r.pricePerNightUSD})`).join("\n");
    return `Here are our luxury room categories & rates:\n${roomSummary}\n\nAll rooms include high-speed Wi-Fi, air conditioning, and daily breakfast!`;
  }

  if (queryLower.includes("food") || queryLower.includes("restaurant") || queryLower.includes("menu") || queryLower.includes("jollof") || queryLower.includes("eat")) {
    return `Our **Legacy Fine Dining & Grill** is open daily from 6:00 AM to 11:00 PM. We serve charcoal-grilled Volta tilapia with banku, wood-fired Jollof rice supreme, Prime Angus steak, single-origin Ghanaian chocolate desserts, and fine vintage wines. In-room dining is also available 24/7!`;
  }

  if (queryLower.includes("pool") || queryLower.includes("spa") || queryLower.includes("gym") || queryLower.includes("facility")) {
    return `Legacy Hotel features an infinity pool with cabanas, the Royal Ghana Shea Butter Wellness Spa, a 24/7 fitness gym, and an Executive 350-guest conference ballroom.`;
  }

  if (queryLower.includes("car") || queryLower.includes("shuttle") || queryLower.includes("airport") || queryLower.includes("pick")) {
    return `We offer luxury chauffeur services and airport shuttles to and from Kotoka International Airport. Vehicles include Toyota Land Cruiser Prado V8, Mercedes E-Class, and VIP Shuttles starting from GH₵ 1,100 / day.`;
  }

  return `Thank you for contacting Legacy Hotel! I am your AI Luxury Concierge. How can I assist you today with room reservations, fine dining, event bookings, or transport in Tema? You can also call us directly at ${HOTEL_INFO.contacts.phonePrimary}.`;
};
