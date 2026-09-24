export const HOTEL_INFO = {
  name: "Legacy Hotel",
  tagline: "Where Luxury Meets Ghanaian Hospitality",
  subtagline: "Luxury Hotel • Boutique Resort • Executive Business Hub • Tema Community 11",
  location: {
    address: "Tema Community 11, Opposite PRESEC",
    city: "Tema",
    region: "Greater Accra Region",
    country: "Ghana",
    landmark: "Opposite Tema PRESEC Senior High School",
    coordinates: { lat: 5.6698, lng: 0.0014 } // Tema coordinates
  },
  contacts: {
    phonePrimary: "0505149092",
    phoneSecondary: "0232457609",
    whatsApp: "0232457609",
    whatsAppUrl: "https://wa.me/233232457609",
    email: "adofokofikyere@gmail.com"
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    snapchat: "https://snapchat.com"
  },
  operatingHours: {
    frontDesk: "24 Hours / 7 Days",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    restaurant: "6:00 AM - 11:00 PM",
    bar: "10:00 AM - 1:00 AM"
  },
  currencies: [
    { code: "GHS", symbol: "GH₵", name: "Ghanaian Cedi", rateAgainstGHS: 1.0 },
    { code: "USD", symbol: "$", name: "US Dollar", rateAgainstGHS: 0.065 },
    { code: "EUR", symbol: "€", name: "Euro", rateAgainstGHS: 0.060 },
    { code: "GBP", symbol: "£", name: "British Pound", rateAgainstGHS: 0.051 }
  ]
};

export const HOTEL_FACILITIES = [
  {
    id: "pool",
    name: "Infinity Swimming Pool & Cabanas",
    category: "Recreation",
    description: "Olympic-style climate-controlled pool with VIP sun loungers, private cabanas, and poolside cocktail service.",
    icon: "Waves",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "restaurant",
    name: "Legacy Fine Dining & Grill",
    category: "Dining",
    description: "Gourmet Ghanaian dishes, international buffet, wood-fired pizza, and vintage wine cellar curated by award-winning chefs.",
    icon: "Utensils",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "spa",
    name: "Royal Ghana Wellness Spa",
    category: "Wellness",
    description: "Therapeutic shea butter massages, hot stone treatments, steam sauna, and traditional holistic beauty rituals.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "fitness",
    name: "State-of-the-Art Gym",
    category: "Wellness",
    description: "Fully equipped cardio and heavy weightlifting suite with personal trainers and morning yoga terrace sessions.",
    icon: "Dumbbell",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "conference",
    name: "Executive Conference Centre",
    category: "Business",
    description: "High-tech audio/visual conference rooms, 300-guest ballroom, fast fiber internet, and dedicated event planners.",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "concierge",
    name: "24/7 VIP Concierge & Butler Service",
    category: "Services",
    description: "In-room dining, personal errand runner, private tour booking, and valet parking.",
    icon: "UserCheck",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "security",
    name: "High-Level Security & CCTV",
    category: "Security",
    description: "24/7 armed security patrols, electronic room access keys, and secure perimeter perimeter.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "transport",
    name: "Luxury Chauffeur & Airport Shuttle",
    category: "Transport",
    description: "Direct Kotoka International Airport (ACC) pickups, Tema port transfers, and luxury SUV rentals.",
    icon: "Car",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80"
  }
];

export const NEARBY_ATTRACTIONS = [
  {
    id: "presec",
    name: "Tema PRESEC Senior High School",
    category: "Education",
    distance: "Directly Opposite (1 min walk)",
    description: "Prominent educational landmark located right across from Legacy Hotel."
  },
  {
    id: "greenwich",
    name: "Greenwich Meridian Line (0° Longitude)",
    category: "Attraction",
    distance: "5 mins drive (approx 2.5 km)",
    description: "The official longitude zero line passing right through the heart of Tema."
  },
  {
    id: "tema_port",
    name: "Tema Harbour & Maritime Port",
    category: "Business",
    distance: "10 mins drive",
    description: "Ghana's premier commercial sea port and maritime logistics center."
  },
  {
    id: "junction_mall",
    name: "Junction Mall Nungua / Tema",
    category: "Shopping",
    distance: "12 mins drive",
    description: "Major shopping center with cinema, supermarket, clothing stores, and food court."
  },
  {
    id: "sakumono_beach",
    name: "Sakumono Beach & Lagoon Sanctuary",
    category: "Beaches",
    distance: "8 mins drive",
    description: "Scenic coastline with golden ocean sands, fresh sea breeze, and bird sanctuary."
  },
  {
    id: "airport",
    name: "Kotoka International Airport (Accra)",
    category: "Airport",
    distance: "25-30 mins via Motorway",
    description: "Ghana's main international aviation hub with direct hotel shuttle connections."
  }
];
