import React from 'react';
import { Award, Star, Gift, Check, Sparkles, ChevronRight } from 'lucide-react';
import { LOYALTY_TIERS, MOCK_USER_LOYALTY } from '../data/loyaltyData';
import { useAuth } from '../context/AuthContext';

export const LoyaltyVIPPage = ({ setActiveTab }) => {
  const { user } = useAuth();

  const handleRedeem = (reward) => {
    alert(`Reward Claimed: ${reward.title}! Voucher sent to ${user?.email || 'your account'}.`);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-2 flex items-center justify-center gap-2">
          <Award className="w-4 h-4" /> VIP Privilege Program
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Legacy VIP Crest Club
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Earn points with every stay, dining experience, and spa session. Unlock tier upgrades, birthday gifts, and suite perks.
        </p>
      </div>

      {/* Member Points Balance Banner */}
      {user ? (
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Membership Status: {user.vipStatus || 'VIP Member'}
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold">
              Welcome, {user.name}
            </h2>
            <span className="text-xs text-slate-400 block mt-1">
              Member ID: {user.id || 'LGC-VIP-001'}
            </span>
          </div>

          <div className="text-center md:text-right bg-slate-950/80 p-6 rounded-2xl border border-slate-800 min-w-[220px]">
            <span className="text-xs text-slate-400 block uppercase">Points Balance</span>
            <span className="font-serif-luxury font-bold text-4xl text-amber-400">{user.loyalty?.pointsBalance || 500}</span>
            <span className="text-[10px] text-sky-400 block mt-1">Active VIP Points</span>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-slate-900 via-stone-900 to-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              VIP Club Privileges
            </span>
            <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold">
              Join the Legacy VIP Crest Club
            </h2>
            <p className="text-xs text-slate-400 max-w-lg mt-2 leading-relaxed">
              Log in or create an account to start earning points, complimentary suite upgrades, early check-in, and private dining perks on every booking.
            </p>
          </div>
          <button
            onClick={() => {
              if (setActiveTab) setActiveTab('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-gold shrink-0 transition-all"
          >
            Sign In / Register
          </button>
        </div>
      )}

      {/* Reward Redemption Cards */}
      <div className="mb-16">
        <h3 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white mb-6">
          Redeem Points for Exclusive Rewards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_USER_LOYALTY.rewardsAvailable.map((rew) => (
            <div key={rew.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase block mb-1">{rew.pointsRequired} Points</span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{rew.title}</h4>
              </div>
              <button onClick={() => handleRedeem(rew)} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-gold">
                REDEEM REWARD NOW
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Levels Comparison */}
      <h3 className="font-serif-luxury font-bold text-2xl text-slate-900 dark:text-white mb-6 text-center">
        VIP Crest Membership Tiers
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LOYALTY_TIERS.map((tier) => (
          <div key={tier.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-luxury space-y-4 flex flex-col justify-between">
            <div>
              <div className={`h-2 rounded-full bg-gradient-to-r ${tier.badgeColor} mb-4`} />
              <h4 className={`font-serif-luxury font-bold text-xl ${tier.textColor}`}>{tier.name}</h4>
              <span className="text-[11px] text-slate-400 block mb-4">{tier.minPoints} - {tier.maxPoints} Points</span>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {tier.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltyVIPPage;
