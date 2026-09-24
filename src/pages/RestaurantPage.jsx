import React, { useState } from 'react';
import { Utensils, Flame, Clock, Calendar, ShoppingBag, Plus, Minus, Check, X } from 'lucide-react';
import { RESTAURANT_CATEGORIES, RESTAURANT_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { useCurrency } from '../context/CurrencyContext';

export const RestaurantPage = () => {
  const { formatPrice } = useCurrency();

  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  // Table reservation form state
  const [tableForm, setTableForm] = useState({
    name: "",
    phone: "",
    date: new Date().toISOString().split('T')[0],
    time: "19:00",
    guests: 2,
    notes: ""
  });

  const filteredItems = activeCategory === "all"
    ? RESTAURANT_ITEMS
    : RESTAURANT_ITEMS.filter(i => i.category === activeCategory);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQty = (itemId, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === itemId) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const cartTotalGHS = cart.reduce((sum, item) => sum + (item.priceGHS * item.qty), 0);

  const handleTableSubmit = (e) => {
    e.preventDefault();
    alert(`Table Reservation Confirmed for ${tableForm.name} on ${tableForm.date} at ${tableForm.time} for ${tableForm.guests} guests! Reference: LGC-TBL-${Date.now().toString().slice(-4)}`);
    setTableForm({
      name: "",
      phone: "",
      date: new Date().toISOString().split('T')[0],
      time: "19:00",
      guests: 2,
      notes: ""
    });
    setIsTableModalOpen(false);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-12 h-80 bg-slate-950 flex items-center justify-center text-center text-white border border-slate-800 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
          alt="Legacy Grill"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-2xl px-4 space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">
            Fine Dining & Culinary Excellence
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold">
            Legacy Grill & Restaurant
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Open Daily 6:00 AM – 11:00 PM • Tema Community 11
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-gold transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Reserve Table
            </button>
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> View Cart ({cart.length})
            </button>
          </div>
        </div>
      </div>

      {/* Menu Categories Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {RESTAURANT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-56">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              {item.chefSpecial && (
                <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow-md">
                  <Flame className="w-3 h-3" /> Chef Special
                </span>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <span className="font-serif-luxury font-bold text-lg text-sky-600 dark:text-sky-400">
                    {formatPrice(item.priceGHS)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {item.prepTime}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Reservation Modal */}
      {isTableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">
                Reserve a Table
              </h3>
              <button onClick={() => setIsTableModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTableSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={tableForm.name}
                  onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Phone / WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0244123456"
                  value={tableForm.phone}
                  onChange={(e) => setTableForm({ ...tableForm, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Reservation Date</label>
                  <input
                    type="date"
                    required
                    value={tableForm.date}
                    onChange={(e) => setTableForm({ ...tableForm, date: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={tableForm.time}
                    onChange={(e) => setTableForm({ ...tableForm, time: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Number of Guests</label>
                <select
                  value={tableForm.guests}
                  onChange={(e) => setTableForm({ ...tableForm, guests: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  {[1, 2, 3, 4, 6, 8, 10, 15].map(n => <option key={n} value={n}>{n} Guests</option>)}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-gold transition-colors"
              >
                CONFIRM TABLE RESERVATION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Online Food Order Cart Drawer */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 w-full max-w-md h-full p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" /> Food Order Cart
                </h3>
                <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4 overflow-y-auto max-h-[60vh]">
                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">Your cart is currently empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</h4>
                        <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold">{formatPrice(item.priceGHS * item.qty)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">-</button>
                        <span className="text-xs font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
                <span>Total Amount:</span>
                <span className="text-amber-500 font-serif-luxury text-2xl">{formatPrice(cartTotalGHS)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => {
                  alert(`Order Placed! Total: ${formatPrice(cartTotalGHS)}. Your meal is being prepared at Legacy Kitchen.`);
                  setCart([]);
                  setIsOrderModalOpen(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors"
              >
                CHECKOUT FOOD ORDER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
