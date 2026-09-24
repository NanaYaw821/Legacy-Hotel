import React, { useState } from 'react';
import { User, Lock, ShieldCheck, LayoutDashboard, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = ({ setActiveTab }) => {
  const { loginAsCustomer, loginAsAdmin } = useAuth();

  const [activeTabMode, setActiveTabMode] = useState("admin"); // default to "admin" or "customer"

  // Guest login state
  const [customerEmail, setCustomerEmail] = useState("kwame.boateng@example.com");
  const [customerPassword, setCustomerPassword] = useState("••••••••");

  // Admin login state (Credentials requested: Username: Legacy26 | Password: Legacy@2026)
  const [adminUsername, setAdminUsername] = useState("Legacy26");
  const [adminPassword, setAdminPassword] = useState("Legacy@2026");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    loginAsCustomer();
    setActiveTab('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError("");
    setAdminSuccess("");

    // Validate Username: Legacy26 and Password: Legacy@2026
    const cleanUsername = adminUsername.trim();
    const cleanPassword = adminPassword.trim();

    if ((cleanUsername === "Legacy26" || cleanUsername.toLowerCase() === "adofokofikyere@gmail.com") && cleanPassword === "Legacy@2026") {
      setAdminSuccess("Access Granted! Redirecting to Executive Admin Dashboard...");
      setTimeout(() => {
        loginAsAdmin();
        setActiveTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);
    } else {
      setAdminError("Invalid Admin credentials! Required Username: Legacy26 | Password: Legacy@2026");
    }
  };

  const autofillAdminCredentials = () => {
    setAdminUsername("Legacy26");
    setAdminPassword("Legacy@2026");
    setAdminError("");
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 animate-fadeIn">
      <div className="bg-[#faf7f5] dark:bg-[#1c1917] border border-[#f5e8d2] dark:border-[#44403c] rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-[#9b2c2c] dark:text-amber-400 uppercase tracking-widest block">
            Legacy Hotel Authentication Portal
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-slate-900 dark:text-white">
            {activeTabMode === 'admin' ? 'Admin Portal Login' : 'Guest Account Login'}
          </h1>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-[#f0ebe8] dark:bg-[#292524] rounded-2xl border border-[#f5e8d2] dark:border-[#44403c] text-xs font-bold">
          <button
            onClick={() => setActiveTabMode('admin')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTabMode === 'admin'
                ? 'bg-[#9b2c2c] text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-[#9b2c2c]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Admin Login
          </button>
          
          <button
            onClick={() => setActiveTabMode('customer')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTabMode === 'customer'
                ? 'bg-[#9b2c2c] text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-[#9b2c2c]'
            }`}
          >
            <User className="w-4 h-4" /> Guest Login
          </button>
        </div>

        {/* MODE 1: ADMIN LOGIN FORM (Username: Legacy26 | Password: Legacy@2026) */}
        {activeTabMode === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs animate-fadeIn">
            
            {/* Credentials Banner */}
            <div className="p-3.5 rounded-2xl bg-[#fdf2d6] dark:bg-[#292524] border border-[#c5a880]/50 text-slate-800 dark:text-slate-200 text-[11px] space-y-1">
              <span className="font-bold text-[#9b2c2c] dark:text-amber-400 block flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5" /> Authorized Admin Credentials:
              </span>
              <p>• <strong>Username:</strong> <code className="font-mono bg-white dark:bg-[#1c1917] px-1.5 py-0.5 rounded text-[#9b2c2c] dark:text-amber-300">Legacy26</code></p>
              <p>• <strong>Password:</strong> <code className="font-mono bg-white dark:bg-[#1c1917] px-1.5 py-0.5 rounded text-[#9b2c2c] dark:text-amber-300">Legacy@2026</code></p>
            </div>

            {adminError && (
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            {adminSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{adminSuccess}</span>
              </div>
            )}

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Admin Username</label>
              <input
                type="text"
                required
                placeholder="Enter Legacy26"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full bg-white dark:bg-[#292524] text-slate-900 dark:text-white p-3.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none focus:ring-2 focus:ring-[#9b2c2c] font-medium"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Admin Password</label>
              <input
                type="password"
                required
                placeholder="Enter Legacy@2026"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-white dark:bg-[#292524] text-slate-900 dark:text-white p-3.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c] focus:outline-none focus:ring-2 focus:ring-[#9b2c2c] font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9b2c2c] via-[#b91c1c] to-[#b45309] hover:from-[#7f1d1d] hover:to-[#92400e] text-white font-bold text-xs shadow-gold flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4" /> LOGIN TO ADMIN DASHBOARD
            </button>

            <button
              type="button"
              onClick={autofillAdminCredentials}
              className="w-full py-2 text-[11px] text-amber-700 dark:text-amber-400 hover:underline font-semibold text-center"
            >
              Autofill Credentials (Legacy26 / Legacy@2026)
            </button>
          </form>
        )}

        {/* MODE 2: GUEST LOGIN FORM */}
        {activeTabMode === 'customer' && (
          <form onSubmit={handleCustomerSubmit} className="space-y-4 text-xs animate-fadeIn">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-white dark:bg-[#292524] text-slate-900 dark:text-white p-3.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c]"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Password</label>
              <input
                type="password"
                required
                value={customerPassword}
                onChange={(e) => setCustomerPassword(e.target.value)}
                className="w-full bg-white dark:bg-[#292524] text-slate-900 dark:text-white p-3.5 rounded-xl border border-[#f5e8d2] dark:border-[#44403c]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#9b2c2c] hover:bg-[#7f1d1d] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" /> LOGIN TO GUEST ACCOUNT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
