export const ADMIN_STATS = {
  totalBookingsThisMonth: 148,
  totalRevenueGHS: 245800,
  occupancyRatePercent: 88,
  availableRooms: 12,
  occupiedRooms: 38,
  pendingBookings: 7,
  upcomingCheckInsToday: 9,
  upcomingCheckOutsToday: 6,
  restaurantOrdersToday: 42,
  activeCarRentals: 4,
  upcomingEvents: 3,
  pendingConciergeRequests: 3,
  averageRating: 4.9
};

export const MONTHLY_REVENUE_DATA = [
  { month: "Jan", revenueGHS: 180000, occupancy: 72 },
  { month: "Feb", revenueGHS: 210000, occupancy: 78 },
  { month: "Mar", revenueGHS: 195000, occupancy: 75 },
  { month: "Apr", revenueGHS: 230000, occupancy: 82 },
  { month: "May", revenueGHS: 220000, occupancy: 80 },
  { month: "Jun", revenueGHS: 250000, occupancy: 85 },
  { month: "Jul", revenueGHS: 275000, occupancy: 90 },
  { month: "Aug", revenueGHS: 290000, occupancy: 94 },
  { month: "Sep", revenueGHS: 245800, occupancy: 88 }
];

export const STAFF_ROLES = [
  { id: "super_admin", title: "Super Admin", accessLevel: "Full Access" },
  { id: "manager", title: "Hotel General Manager", accessLevel: "Full Operational Access" },
  { id: "receptionist", title: "Front Desk & Receptionist", accessLevel: "Bookings & Guests" },
  { id: "restaurant_staff", title: "Restaurant & Bar Manager", accessLevel: "Food & Table Orders" },
  { id: "housekeeping", title: "Housekeeping & Facilities", accessLevel: "Room Status & Concierge" },
  { id: "finance", title: "Finance & Accounts", accessLevel: "Payments & Invoices" },
  { id: "event_manager", title: "Events & Wedding Coordinator", accessLevel: "Events & Cars" }
];

export const CALENDAR_ROOM_MATRIX = [
  {
    roomNumber: "101",
    roomCategory: "Standard Room",
    status: "Occupied",
    guestName: "John Doe",
    checkIn: "2026-09-20",
    checkOut: "2026-09-24",
    price: "GH₵ 650"
  },
  {
    roomNumber: "201",
    roomCategory: "Deluxe Suite",
    status: "Occupied",
    guestName: "Dr. Mensah",
    checkIn: "2026-09-21",
    checkOut: "2026-09-25",
    price: "GH₵ 980"
  },
  {
    roomNumber: "301",
    roomCategory: "Executive Suite",
    status: "Occupied",
    guestName: "Kwame Boateng",
    checkIn: "2026-09-22",
    checkOut: "2026-09-26",
    price: "GH₵ 1450"
  },
  {
    roomNumber: "401",
    roomCategory: "Family Villa",
    status: "Available",
    guestName: "-",
    checkIn: "-",
    checkOut: "-",
    price: "GH₵ 1850"
  },
  {
    roomNumber: "501",
    roomCategory: "Presidential Suite",
    status: "Reserved",
    guestName: "Sarah Jenkins",
    checkIn: "2026-09-23",
    checkOut: "2026-09-28",
    price: "GH₵ 3500"
  }
];
