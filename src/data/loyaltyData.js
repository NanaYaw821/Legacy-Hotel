export const LOYALTY_TIERS = [
  {
    id: "silver",
    name: "Silver Crest",
    minPoints: 0,
    maxPoints: 999,
    badgeColor: "from-slate-400 to-slate-600",
    textColor: "text-slate-600 dark:text-slate-300",
    benefits: [
      "Welcome Drink upon arrival",
      "Complimentary High-Speed Wi-Fi",
      "Earn 10 Legacy Points per GH₵ 100 spent",
      "Member-Only Special Rates"
    ]
  },
  {
    id: "gold",
    name: "Gold Crest VIP",
    minPoints: 1000,
    maxPoints: 2499,
    badgeColor: "from-amber-400 to-yellow-600",
    textColor: "text-amber-600 dark:text-amber-400",
    benefits: [
      "All Silver Crest Benefits",
      "12:00 PM Early Check-In & 2:00 PM Late Check-Out",
      "Complimentary Buffet Breakfast",
      "15% Discount at Legacy Grill & Restaurant",
      "Earn 12 Legacy Points per GH₵ 100 spent"
    ]
  },
  {
    id: "platinum",
    name: "Platinum Crest VIP",
    minPoints: 2500,
    maxPoints: 4999,
    badgeColor: "from-sky-400 to-blue-600",
    textColor: "text-sky-600 dark:text-sky-400",
    benefits: [
      "All Gold Crest Benefits",
      "Free Room Upgrade upon availability",
      "Executive Lounge Access",
      "Free Airport Shuttle Pickup",
      "Birthday Gift & Complimentary Wine Bottle",
      "Earn 15 Legacy Points per GH₵ 100 spent"
    ]
  },
  {
    id: "diamond",
    name: "Royal Diamond Crest VIP",
    minPoints: 5000,
    maxPoints: 99999,
    badgeColor: "from-amber-300 via-yellow-400 to-amber-600",
    textColor: "text-yellow-600 dark:text-yellow-400",
    benefits: [
      "Guaranteed Room Upgrade to Suite",
      "Dedicated 24/7 Personal Butler",
      "Complimentary Chauffeur Airport Pickups",
      "Free Spa & Wellness Session",
      "25% Discount across all Hotel Outlets",
      "Earn 20 Legacy Points per GH₵ 100 spent"
    ]
  }
];

export const MOCK_USER_LOYALTY = {
  tier: "Gold Crest VIP",
  tierId: "gold",
  pointsBalance: 1850,
  nextTierPoints: 2500,
  memberSince: "January 2024",
  membershipId: "LGC-883921",
  rewardsAvailable: [
    { id: "rew-1", title: "Free Spa Shea Butter Massage", pointsRequired: 800, icon: "Sparkles" },
    { id: "rew-2", title: "Complimentary Romantic Poolside Dinner", pointsRequired: 1200, icon: "Utensils" },
    { id: "rew-3", title: "One Night Deluxe Suite Upgrade", pointsRequired: 1500, icon: "Bed" }
  ]
};
