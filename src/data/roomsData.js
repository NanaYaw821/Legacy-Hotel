export const INITIAL_ROOMS = [
  {
    id: "std-101",
    typeId: "standard",
    name: "Standard Comfort Room",
    category: "Standard Room",
    pricePerNightGHS: 650,
    pricePerNightUSD: 42,
    sizeSqm: 28,
    capacityAdults: 2,
    capacityChildren: 1,
    bedType: "Queen Size Plush Bed",
    view: "Garden & Courtyard View",
    available: true,
    featured: false,
    rating: 4.8,
    reviewCount: 42,
    description: "Designed for business travelers and short stays. Features plush queen bedding, high-speed fiber Wi-Fi, ergonomic work desk, and a rain shower bathroom.",
    primaryPhoto: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    photos: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "High-Speed Wi-Fi",
      "43-inch Smart TV",
      "Air Conditioning",
      "Rainfall Shower",
      "Tea & Coffee Maker",
      "Work Desk & Chair",
      "Safety Deposit Box",
      "Daily Housekeeping"
    ]
  },
  {
    id: "dlx-201",
    typeId: "deluxe",
    name: "Deluxe Luxury Suite",
    category: "Deluxe Room",
    pricePerNightGHS: 980,
    pricePerNightUSD: 64,
    sizeSqm: 38,
    capacityAdults: 2,
    capacityChildren: 2,
    bedType: "King Size Orthopedic Bed",
    view: "Poolside & Skyline View",
    available: true,
    featured: true,
    rating: 4.9,
    reviewCount: 68,
    description: "An elegant sanctuary featuring a private balcony overlooking the infinity pool, marble bathroom with deep soaking tub, mini-bar, and ambient accent lighting.",
    primaryPhoto: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    photos: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Private Balcony",
      "High-Speed Wi-Fi",
      "55-inch 4K Smart TV",
      "Marble Soaking Tub",
      "Stocked Mini Bar",
      "Nespresso Coffee Machine",
      "Bathrobes & Slippers",
      "24/7 Room Service",
      "Electronic Safe"
    ]
  },
  {
    id: "exec-301",
    typeId: "executive",
    name: "Executive Business Lounge Suite",
    category: "Executive Room",
    pricePerNightGHS: 1450,
    pricePerNightUSD: 95,
    sizeSqm: 48,
    capacityAdults: 2,
    capacityChildren: 2,
    bedType: "Super King Custom Bed",
    view: "Panoramic City & Ocean View",
    available: true,
    featured: true,
    rating: 5.0,
    reviewCount: 84,
    description: "Tailored for diplomats, executives, and discerning guests. Includes access to the private Executive Lounge, complimentary evening cocktails, express check-in, and private butler service.",
    primaryPhoto: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    photos: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Executive Lounge Access",
      "Complimentary Evening Cocktails",
      "Dedicated Butler Service",
      "Super High-Speed Wi-Fi",
      "65-inch Curved OLED TV",
      "Luxury Spa Toiletries",
      "Walk-in Closet",
      "Complimentary Laundry (2 items/day)",
      "Airport Transfer Discount"
    ]
  },
  {
    id: "fam-401",
    typeId: "family",
    name: "Legacy Family Villa Suite",
    category: "Family Room",
    pricePerNightGHS: 1850,
    pricePerNightUSD: 120,
    sizeSqm: 65,
    capacityAdults: 4,
    capacityChildren: 3,
    bedType: "1 King Bed + 2 Twin Beds",
    view: "Resort Pool & Garden View",
    available: true,
    featured: false,
    rating: 4.9,
    reviewCount: 51,
    description: "Spacious dual-bedroom suite with interconnecting doors, large living salon, dining area, kid-friendly entertainment package, and two full luxury bathrooms.",
    primaryPhoto: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    photos: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "2 Separate Bedrooms",
      "Living & Dining Area",
      "2 Luxury En-Suite Bathrooms",
      "Kid's Welcome Pack",
      "2 Smart TVs",
      "Full Mini Kitchenette",
      "High-Speed Wi-Fi",
      "Complimentary Breakfast for Family"
    ]
  },
  {
    id: "pres-501",
    typeId: "presidential",
    name: "The Royal Presidential Suite",
    category: "Presidential Suite",
    pricePerNightGHS: 3500,
    pricePerNightUSD: 230,
    sizeSqm: 120,
    capacityAdults: 4,
    capacityChildren: 2,
    bedType: "Emperor Custom Plush Bed",
    view: "360° Panoramic View of Tema & Coast",
    available: true,
    featured: true,
    rating: 5.0,
    reviewCount: 95,
    description: "The pinnacle of opulence at Legacy Hotel. Features a grand master bedroom, private Jacuzzi spa, private dining hall for 8 guests, bulletproof VIP glass balcony, 24-hour dedicated butler, and complimentary chauffeured Land Cruiser.",
    primaryPhoto: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    photos: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Private Jacuzzi Spa",
      "8-Seater Dining Salon",
      "Personal 24/7 Butler & Chef",
      "Complimentary Chauffeur SUV",
      "Bulletproof Glass Security",
      "75-inch 8K Home Theater",
      "Private VIP Lounge Access",
      "Premium Moët & Chandon Welcome Bottle",
      "Unrestricted Spa Access"
    ]
  }
];

export const ROOM_CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "standard", name: "Standard Room" },
  { id: "deluxe", name: "Deluxe Room" },
  { id: "executive", name: "Executive Room" },
  { id: "family", name: "Family Room" },
  { id: "presidential", name: "Presidential Suite" }
];
