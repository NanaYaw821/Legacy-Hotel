export const CONCIERGE_CATEGORIES = [
  { id: "housekeeping", title: "Housekeeping & Linens", icon: "Sparkles", desc: "Extra towels, pillow choices, room cleaning, bed turn-down" },
  { id: "room_service", title: "In-Room Dining", icon: "Utensils", desc: "Midnight snacks, wine delivery, breakfast in bed" },
  { id: "laundry", title: "Express Laundry & Dry Cleaning", icon: "Shirt", desc: "Same-day pressing, delicate suit dry cleaning" },
  { id: "transport", title: "Airport & Local Transport", icon: "Car", desc: "Kotoka shuttle, Tema port ride, private driver" },
  { id: "amenities", title: "Room Setup & Decoration", icon: "Gift", desc: "Romantic rose petals, birthday cake, fruit basket" }
];

export const MOCK_GUEST_CONCIERGE_REQUESTS = [
  {
    id: "REQ-8021",
    guestName: "Kwame Boateng",
    roomNumber: "301 (Executive Suite)",
    requestType: "Housekeeping",
    description: "Please provide 2 additional memory foam pillows and extra bath sheets.",
    priority: "Medium",
    assignedStaff: "Grace Mensah (Housekeeping Lead)",
    status: "In Progress",
    createdTime: "10 mins ago",
    updatedTime: "2 mins ago"
  },
  {
    id: "REQ-8022",
    guestName: "Sarah Jenkins",
    roomNumber: "501 (Presidential Suite)",
    requestType: "Transport",
    description: "Chauffeured Land Cruiser requested for Kotoka Airport departure at 4:00 PM.",
    priority: "High",
    assignedStaff: "Kofi Owusu (Head Chauffeur)",
    status: "Assigned",
    createdTime: "25 mins ago",
    updatedTime: "15 mins ago"
  },
  {
    id: "REQ-8020",
    guestName: "David Osei",
    roomNumber: "201 (Deluxe Suite)",
    requestType: "Room Setup",
    description: "Romantic birthday setup with red roses, champagne, and chocolate strawberries.",
    priority: "High",
    assignedStaff: "Ama Serwaa (Concierge)",
    status: "Completed",
    createdTime: "2 hours ago",
    updatedTime: "30 mins ago"
  }
];
