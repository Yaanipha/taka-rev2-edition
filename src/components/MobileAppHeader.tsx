import React from 'react';
import { CreditCard, ShoppingBag, Wifi, Battery, Signal, Bell } from 'lucide-react';
import { TierLevel } from '../types';
import { TIERS_DATA } from '../data/mockData';

interface MobileAppHeaderProps {
  currentTier: TierLevel;
  cartCount: number;
  onOpenPass: () => void;
  onOpenCart: () => void;
  title?: string;
  rosePoints: number;
}

export const MobileAppHeader: React.FC<MobileAppHeaderProps> = ({
  currentTier,
  cartCount,
  onOpenPass,
  onOpenCart,
  title,
  rosePoints,
}) => {
  const tier = TIERS_DATA[currentTier];

  return (
    <header className="sticky top-0 z-30 bg-[#FFF8F7]/95 backdrop-blur-md border-b border-[#EEDCD4]/70">
      {/* Smartphone Status Bar */}
      <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[11px] font-semibold text-[#201A1A] select-none tracking-tight">
        <span>9:41</span>
        {/* Dynamic Island / Speaker Pill */}
        <div className="w-20 h-4 bg-black rounded-full mx-auto" />
        <div className="flex items-center gap-1.5 text-[#201A1A]">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* App Bar Zone */}
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Left: Member Tier Avatar & Quick Access */}
        <button
          onClick={onOpenPass}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-serif font-bold text-xs shadow-xs ring-1 ring-white/60"
            style={{ backgroundColor: tier.accentColor }}
          >
            髙
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xs font-bold text-[#201A1A] tracking-tight leading-none">
              TAKASHIMAYA
            </span>
            <span
              className="text-[9px] uppercase font-bold tracking-wider mt-0.5"
              style={{ color: tier.accentColor }}
            >
              {tier.name.split(' ')[0]} VIP
            </span>
          </div>
        </button>

        {/* Center: Title if provided */}
        {title && (
          <div className="hidden sm:block text-xs font-serif font-bold text-[#201A1A]">
            {title}
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Points badge */}
          <button
            onClick={onOpenPass}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7EDE8] border border-[#DEBFBE] text-[#7A1520] text-[11px] font-bold cursor-pointer hover:bg-[#F2E5E5] transition-colors"
          >
            <CreditCard className="w-3 h-3 text-[#7A1520]" />
            <span className="tabular-nums">{rosePoints.toLocaleString()}</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-[#F7EDE8] text-[#201A1A] transition-colors cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#7A1520]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#7A1520] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
