export const RESTAURANT_CATEGORIES = [
  { id: "all", name: "Full Menu" },
  { id: "ghanaian", name: "Ghanaian Heritage" },
  { id: "chef_specials", name: "Chef's Signature Specials" },
  { id: "grill", name: "Steaks & Ocean Grill" },
  { id: "starters", name: "Gourmet Starters" },
  { id: "desserts", name: "Pastries & Desserts" },
  { id: "drinks", name: "Cocktails & Fine Wines" }
];

export const RESTAURANT_ITEMS = [
  {
    id: "rest-01",
    name: "Legacy Royal Jollof Rice Supreme",
    category: "ghanaian",
    priceGHS: 140,
    priceUSD: 9.50,
    chefSpecial: true,
    spicyLevel: "Medium",
    prepTime: "25 mins",
    description: "Smoky firewood-infused Ghanaian Jollof rice served with grilled jumbo prawns, fried sweet plantains, shito, and tender spiced goat meat.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-02",
    name: "Grilled Charcoal Tilapia & Hot Banku",
    category: "ghanaian",
    priceGHS: 160,
    priceUSD: 10.50,
    chefSpecial: true,
    spicyLevel: "Hot",
    prepTime: "30 mins",
    description: "Fresh Volta Lake tilapia seasoned with local spices, flame-grilled to perfection, accompanied by steaming corn & cassava banku and raw pepper salsa.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-03",
    name: "Slow-Cooked Goat Light Soup with Fufu",
    category: "ghanaian",
    priceGHS: 130,
    priceUSD: 8.50,
    chefSpecial: false,
    spicyLevel: "Hot",
    prepTime: "20 mins",
    description: "Pounded cassava and plantain fufu served in a rich aromatic tomato, ginger, and habanero goat soup.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-04",
    name: "Prime Angus Ribeye Steak (300g)",
    category: "grill",
    priceGHS: 320,
    priceUSD: 21.00,
    chefSpecial: true,
    spicyLevel: "Mild",
    prepTime: "25 mins",
    description: "Grain-fed Angus ribeye seared with rosemary garlic butter, served with truffle mashed potatoes and grilled asparagus.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-05",
    name: "Pan-Seared Atlantic Salmon Fillet",
    category: "grill",
    priceGHS: 290,
    priceUSD: 19.00,
    chefSpecial: false,
    spicyLevel: "None",
    prepTime: "20 mins",
    description: "Crispy skin salmon with lemon-herb butter sauce, wild rice pilaf, and steamed baby vegetables.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-06",
    name: "Truffle Mushroom Bruschetta",
    category: "starters",
    priceGHS: 85,
    priceUSD: 5.50,
    chefSpecial: false,
    spicyLevel: "None",
    prepTime: "15 mins",
    description: "Artisanal sourdough topped with sautéed wild mushrooms, white truffle oil, shaved parmesan, and fresh thyme.",
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-07",
    name: "Golden Ghanaian Chocolate Lava Cake",
    category: "desserts",
    priceGHS: 95,
    priceUSD: 6.20,
    chefSpecial: true,
    spicyLevel: "None",
    prepTime: "15 mins",
    description: "Warm molten cake made with 70% single-origin Ghanaian cocoa, paired with vanilla bean gelato.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-08",
    name: "Legacy Signature Gold Cocktail",
    category: "drinks",
    priceGHS: 110,
    priceUSD: 7.20,
    chefSpecial: true,
    spicyLevel: "None",
    prepTime: "5 mins",
    description: "Infused spiced rum, passion fruit puree, gold dust, elderflower liqueur, and fresh lime juice.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
  }
];

export const RESTAURANT_INFO = {
  name: "Legacy Grill & Fine Dining",
  openingHours: "Daily 6:00 AM – 11:00 PM",
  breakfastHours: "6:00 AM – 10:30 AM",
  dinnerHours: "6:00 PM – 11:00 PM",
  capacitySeats: 150,
  promotions: [
    {
      title: "Sunday Ghanaian Heritage Buffet",
      discount: "20% OFF for Hotel Guests",
      description: "Live highlife band performance, live cooking stations, unlimited Fufu, Jollof, and roasted lamb."
    },
    {
      title: "Romantic Dinner under the Stars",
      discount: "GH₵ 650 per couple",
      description: "Private poolside candlelit table, 4-course menu, and complimentary champagne bottle."
    }
  ]
};
