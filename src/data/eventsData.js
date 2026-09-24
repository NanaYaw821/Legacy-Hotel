export const EVENT_SPACES = [
  {
    id: "ballroom",
    name: "The Royal Legacy Grand Ballroom",
    type: "Wedding & Gala",
    capacity: "350 Guests",
    pricePerDayGHS: 12000,
    pricePerDayUSD: 780,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
    description: "Crystal chandeliers, customizable LED mood lighting, state-of-the-art acoustic sound system, and dedicated banquet kitchen.",
    features: ["Stage & Dancefloor", "High-End Audio/Visual", "Private VIP Dressing Suite", "Banquet Catering", "Valet Parking"]
  },
  {
    id: "executive-boardroom",
    name: "Meridian Executive Boardroom",
    type: "Business Conference",
    capacity: "30 Guests",
    pricePerDayGHS: 4500,
    pricePerDayUSD: 295,
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1000&q=80",
    description: "Designed for high-level corporate board meetings, strategy sessions, and hybrid video conferencing with global hubs.",
    features: ["86-inch Interactive Touchscreen", "4K Video Conferencing Camera", "Ergonomic Leather Chairs", "High-Speed Fiber Wi-Fi", "Coffee & Lunch Station"]
  },
  {
    id: "poolside-terrace",
    name: "Golden Sunset Poolside Terrace",
    type: "Cocktail & Birthday Party",
    capacity: "150 Guests",
    pricePerDayGHS: 7500,
    pricePerDayUSD: 490,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    description: "Open-air luxury poolside venue ideal for evening cocktail receptions, birthday celebrations, and fashion galas.",
    features: ["Outdoor Bar & Grill", "Ambient Torch Lighting", "DJ Booth Setup", "Cabana Lounge Access", "Poolside View"]
  }
];

export const EVENT_PACKAGES = [
  {
    id: "wedding-gold",
    name: "Royal Ghana Wedding Package",
    priceGHS: 18500,
    priceUSD: 1200,
    includes: [
      "Ballroom rental for 8 hours",
      "3-Course Gourmet Buffet for 150 guests",
      "Presidential Suite complimentary night stay for Bride & Groom",
      "Wedding Cake & Sparkling Wine Toast",
      "Dedicated Event Manager"
    ]
  },
  {
    id: "corporate-day",
    name: "Full-Day Executive Conference Package",
    priceGHS: 350, // Per guest
    priceUSD: 23,
    includes: [
      "Boardroom / Hall hire",
      "Morning Coffee & Ghanaian Pastries",
      "Buffet Lunch at Legacy Restaurant",
      "Afternoon Tea & Fresh Fruit Juices",
      "Conference Stationary & AV Equipment"
    ]
  }
];
