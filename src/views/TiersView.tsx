import React from 'react';
import {
  Sparkles,
  CreditCard,
  Coffee,
  ShoppingBag,
  Gift,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  Check,
  Crown
} from 'lucide-react';
import { TierLevel, UserProfile } from '../types';
import { TIERS_DATA } from '../data/mockData';

interface TiersViewProps {
  user: UserProfile;
  currentTier: TierLevel;
  onSelectTier: (tier: TierLevel) => void;
  onOpenPass: () => void;
  onNavigate: (tab: string) => void;
}

export const TiersView: React.FC<TiersViewProps> = ({
  user,
  currentTier,
  onSelectTier,
  onOpenPass,
  onNavigate,
}) => {
  const activeTier = TIERS_DATA[currentTier];

  return (
    <div className="space-y-6 pb-24 max-w-[430px] mx-auto px-4">
      {/* Mobile Prestige VIP Pass Card Banner */}
      <div
        onClick={onOpenPass}
        className={`relative w-full aspect-[1.586/1] rounded-2xl p-5 flex flex-col justify-between shadow-xl cursor-pointer bg-gradient-to-br ${activeTier.gradient} border-2 ${activeTier.cardFoil} text-white overflow-hidden transition-transform active:scale-[0.99]`}
      >
        {/* Subtle Watermark */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none text-white">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M50 15 C30 30, 20 60, 50 85 C80 60, 70 30, 50 15 Z" />
          </svg>
        </div>

        {/* Card Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-serif text-xs font-bold shadow-xs">
              髙
            </span>
            <div>
              <span className="font-serif text-[10px] tracking-widest uppercase block font-semibold">
                TAKASHIMAYA
              </span>
              <span className="text-[8px] uppercase tracking-wider opacity-70">
                SINGAPORE · ORCHARD
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 backdrop-blur-xs">
            {activeTier.badgeLabel}
          </span>
        </div>

        {/* Card Center */}
        <div className="relative z-10 my-auto">
          <div className="text-[10px] uppercase tracking-wider opacity-70">
            Prestige Member
          </div>
          <div className="font-serif text-lg font-bold tracking-wide text-white truncate">
            {user.name}
          </div>
          <div className="text-[10px] font-mono tracking-widest opacity-80">
            {user.memberId}
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/20 text-[10px] text-white/90">
          <div>
            <span className="text-[8px] uppercase tracking-wider opacity-70 block">
              Rose Points
            </span>
            <span className="font-bold tabular-nums">
              {user.rosePoints.toLocaleString()} pts
            </span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-[9px] bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
            <CreditCard className="w-3 h-3 text-[#FFB3B2]" />
            <span>Tap to View Barcode</span>
          </div>
        </div>
      </div>

      {/* Spend Meter & Progress */}
      <div className="p-4 bg-white rounded-2xl border border-[#EEDCD4] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#574141]">2026 Qualifying Spend</span>
          <span className="font-bold text-[#7A1520] tabular-nums">
            S${user.annualSpend.toLocaleString()} / S${user.nextTierSpendTarget.toLocaleString()}
          </span>
        </div>

        <div className="w-full h-2 bg-[#F7EDE8] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7A1520] to-[#C59B57] rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(
                100,
                Math.round((user.annualSpend / user.nextTierSpendTarget) * 100)
              )}%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#8A7170]">
          <span>
            Spend <strong>S${(user.nextTierSpendTarget - user.annualSpend).toLocaleString()}</strong> to Platinum
          </span>
          <span className="font-bold text-[#7A1520]">
            {Math.round((user.annualSpend / user.nextTierSpendTarget) * 100)}%
          </span>
        </div>
      </div>

      {/* Quick Action Matrix (Mobile App Grid) */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => onNavigate('lounge')}
          className="p-3 bg-white rounded-2xl border border-[#EEDCD4] flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-1.5">
            <Coffee className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#201A1A]">Lounge</span>
          <span className="text-[9px] text-[#8A7170]">Reserve L3</span>
        </button>

        <button
          onClick={() => onNavigate('depachika')}
          className="p-3 bg-white rounded-2xl border border-[#EEDCD4] flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-1.5">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#201A1A]">Depachika</span>
          <span className="text-[9px] text-[#8A7170]">B2 Food</span>
        </button>

        <button
          onClick={() => onNavigate('vouchers')}
          className="p-3 bg-white rounded-2xl border border-[#EEDCD4] flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-1.5">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#201A1A]">Wallet</span>
          <span className="text-[9px] text-[#8A7170]">Vouchers</span>
        </button>

        <button
          onClick={() => onNavigate('directory')}
          className="p-3 bg-white rounded-2xl border border-[#EEDCD4] flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-1.5">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#201A1A]">Directory</span>
          <span className="text-[9px] text-[#8A7170]">Floors</span>
        </button>
      </div>

      {/* Prestige Tier Carousel Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-sm font-bold text-[#201A1A]">
            Explore 5 Membership Tiers
          </h3>
          <button
            onClick={() => onNavigate('privileges')}
            className="text-[11px] font-semibold text-[#7A1520] flex items-center gap-0.5"
          >
            <span>All Perks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Tier Cards Scroller */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 snap-x">
          {(['bronze', 'silver', 'gold', 'platinum', 'diamond'] as TierLevel[]).map((tierKey) => {
            const tier = TIERS_DATA[tierKey];
            const isSelected = currentTier === tierKey;

            return (
              <div
                key={tierKey}
                onClick={() => onSelectTier(tierKey)}
                className={`snap-start w-[240px] shrink-0 rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white shadow-md ring-2 ring-[#7A1520] border-[#7A1520]'
                    : 'bg-[#F7EDE8]/80 hover:bg-white border-[#EEDCD4]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: tier.accentColor }}
                    >
                      {tier.name}
                    </span>
                    <span className="text-xs font-bold text-[#201A1A] tabular-nums">
                      {tier.spendDisplay}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#574141] line-clamp-2 leading-relaxed">
                    {tier.summary}
                  </p>
                </div>

                <div className="space-y-1 pt-2.5 mt-2.5 border-t border-[#EEDCD4] text-[10px]">
                  {tier.privileges.slice(0, 2).map((p, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[#201A1A]">
                      <Check className="w-3 h-3 text-[#7A1520] shrink-0" />
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Depachika Highlight Card */}
      <div
        onClick={() => onNavigate('depachika')}
        className="rounded-2xl bg-white border border-[#EEDCD4] overflow-hidden shadow-xs cursor-pointer active:scale-[0.99] transition-all"
      >
        <div className="relative aspect-[16/9]">
          <img
            src="/src/assets/images/depachika_gourmet_selection_1791943420127.jpg"
            alt="Depachika"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2.5 left-2.5 bg-[#7A1520] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xs">
            Daily Fresh Flown
          </span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-serif text-sm font-bold text-[#201A1A]">
              Depachika Gourmet Showcase
            </h4>
            <p className="text-[11px] text-[#8A7170]">
              Crown Musk Melons & A5 Miyazaki Wagyu
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#F7EDE8] text-[#7A1520] flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
