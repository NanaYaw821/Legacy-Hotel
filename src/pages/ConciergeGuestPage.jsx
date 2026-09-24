import React, { useState } from 'react';
import { Shield, Sparkles, Clock, CheckCircle2, AlertCircle, Plus, Send } from 'lucide-react';
import { CONCIERGE_CATEGORIES, MOCK_GUEST_CONCIERGE_REQUESTS } from '../data/conciergeData';

export const ConciergeGuestPage = () => {
  const [requests, setRequests] = useState(MOCK_GUEST_CONCIERGE_REQUESTS);
  const [form, setForm] = useState({
    guestName: "Kwame Boateng",
    roomNumber: "301 (Executive Suite)",
    requestType: "Housekeeping",
    description: "Requesting extra hypoallergenic memory foam pillows and fresh towels.",
    priority: "Medium"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      id: `REQ-${Math.floor(8000 + Math.random() * 999)}`,
      guestName: form.guestName,
      roomNumber: form.roomNumber,
      requestType: form.requestType,
      description: form.description,
      priority: form.priority,
      assignedStaff: "Concierge Duty Officer",
      status: "Pending",
      createdTime: "Just now",
      updatedTime: "Just now"
    };
    setRequests([newReq, ...requests]);
    alert(`Concierge Request #${newReq.id} Submitted! Our butler team has been alerted.`);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2">
          In-Room Guest Assistance
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          VIP Concierge & Butler Requests
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Request extra towels, express laundry, in-room dining, room setup, or luggage assistance directly from your room.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Live Status Tracker */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white">
            Active Guest Requests & Live Tracker
          </h2>

          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-sky-600 dark:text-sky-400">{req.id}</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">({req.roomNumber})</span>
                  </div>

                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                    req.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                    req.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-sky-500/10 text-sky-500'
                  }`}>
                    ● {req.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{req.requestType}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{req.description}</p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                  <span>Assigned: <strong className="text-slate-700 dark:text-slate-200">{req.assignedStaff}</strong></span>
                  <span>{req.createdTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Submit New Request */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl h-fit space-y-4">
          <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">
            New Butler Request
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-500 block mb-1">Guest Name & Room</label>
              <input
                type="text"
                required
                value={form.guestName}
                onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Request Category</label>
              <select
                value={form.requestType}
                onChange={(e) => setForm({ ...form, requestType: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <option value="Housekeeping & Towels">Housekeeping & Towels</option>
                <option value="In-Room Dining">In-Room Dining</option>
                <option value="Express Laundry & Pressing">Express Laundry & Pressing</option>
                <option value="Airport Shuttle / Car Ride">Airport Shuttle / Car Ride</option>
                <option value="Romantic Room Setup">Romantic Room Setup</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Request Details</label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-amber-500 text-white font-bold text-xs shadow-gold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> DISPATCH BUTLER REQUEST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConciergeGuestPage;
