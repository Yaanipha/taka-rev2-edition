import React from 'react';
import { CreditCard, ShoppingBag, Sparkles } from 'lucide-react';
import { TierLevel } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTier: TierLevel;
  rosePoints: number;
  cartCount: number;
  onOpenPass: () => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentTier,
  rosePoints,
  cartCount,
  onOpenPass,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F7]/95 backdrop-blur-md border-b border-[#EEDCD4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => setActiveTab('tiers')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#7A1520] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm ring-1 ring-[#C59B57]/40">
                髙
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#201A1A] group-hover:text-[#7A1520] transition-colors whitespace-nowrap shrink-0">
                  TAKASHIMAYA
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7170] -mt-1 font-sans">
                  PRESTIGE · NGEE ANN CITY
                </span>
              </div>
            </div>
          </button>

          {/* Zone 2: Single-line Nav Links (4-5 items) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#574141]">
            <button
              onClick={() => setActiveTab('tiers')}
              className={`hover:text-[#7A1520] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'tiers'
                  ? 'text-[#7A1520] font-semibold border-[#7A1520]'
                  : 'border-transparent'
              }`}
            >
              VIP Membership
            </button>
            <button
              onClick={() => setActiveTab('lounge')}
              className={`hover:text-[#7A1520] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'lounge'
                  ? 'text-[#7A1520] font-semibold border-[#7A1520]'
                  : 'border-transparent'
              }`}
            >
              The Rose Lounge
            </button>
            <button
              onClick={() => setActiveTab('depachika')}
              className={`hover:text-[#7A1520] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'depachika'
                  ? 'text-[#7A1520] font-semibold border-[#7A1520]'
                  : 'border-transparent'
              }`}
            >
              Depachika & Salons
            </button>
            <button
              onClick={() => setActiveTab('privileges')}
              className={`hover:text-[#7A1520] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'privileges'
                  ? 'text-[#7A1520] font-semibold border-[#7A1520]'
                  : 'border-transparent'
              }`}
            >
              Privilege Matrix
            </button>
            <button
              onClick={() => setActiveTab('vouchers')}
              className={`hover:text-[#7A1520] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'vouchers'
                  ? 'text-[#7A1520] font-semibold border-[#7A1520]'
                  : 'border-transparent'
              }`}
            >
              Rewards Wallet
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`hover:text-[#7A1520] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'directory'
                  ? 'text-[#7A1520] font-semibold border-[#7A1520]'
                  : 'border-transparent'
              }`}
            >
              Floor Directory
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Utility Affordances */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bag Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg border border-[#EEDCD4] bg-[#FFFFFF] hover:bg-[#F7EDE8] text-[#201A1A] transition-colors flex items-center justify-center cursor-pointer"
              title="Shopping Bag"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#7A1520]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#7A1520] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Member Points Indicator */}
            <div className="hidden sm:flex flex-col text-right pr-1">
              <span className="text-[11px] text-[#8A7170] uppercase font-semibold tracking-wider">
                Rose Points
              </span>
              <span className="text-sm font-bold text-[#7A1520] tabular-nums">
                {rosePoints.toLocaleString()} pts
              </span>
            </div>

            {/* Primary CTA: Member Pass */}
            <button
              onClick={onOpenPass}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#7A1520] hover:bg-[#8E1C27] active:bg-[#58000F] rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 border border-[#C59B57]/30"
            >
              <CreditCard className="w-4 h-4 text-[#FFB3B2]" />
              <span>Member Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Secondary Scrollable Sub-nav */}
      <div className="lg:hidden border-t border-[#EEDCD4]/70 bg-[#FFF8F7] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-5 px-4 py-2.5 text-xs font-medium text-[#574141] whitespace-nowrap min-w-max">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`py-1 border-b-2 ${
              activeTab === 'tiers'
                ? 'text-[#7A1520] font-bold border-[#7A1520]'
                : 'border-transparent'
            }`}
          >
            Membership
          </button>
          <button
            onClick={() => setActiveTab('lounge')}
            className={`py-1 border-b-2 ${
              activeTab === 'lounge'
                ? 'text-[#7A1520] font-bold border-[#7A1520]'
                : 'border-transparent'
            }`}
          >
            Rose Lounge
          </button>
          <button
            onClick={() => setActiveTab('depachika')}
            className={`py-1 border-b-2 ${
              activeTab === 'depachika'
                ? 'text-[#7A1520] font-bold border-[#7A1520]'
                : 'border-transparent'
            }`}
          >
            Depachika & Salons
          </button>
          <button
            onClick={() => setActiveTab('privileges')}
            className={`py-1 border-b-2 ${
              activeTab === 'privileges'
                ? 'text-[#7A1520] font-bold border-[#7A1520]'
                : 'border-transparent'
            }`}
          >
            Privilege Matrix
          </button>
          <button
            onClick={() => setActiveTab('vouchers')}
            className={`py-1 border-b-2 ${
              activeTab === 'vouchers'
                ? 'text-[#7A1520] font-bold border-[#7A1520]'
                : 'border-transparent'
            }`}
          >
            Vouchers
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`py-1 border-b-2 ${
              activeTab === 'directory'
                ? 'text-[#7A1520] font-bold border-[#7A1520]'
                : 'border-transparent'
            }`}
          >
            Directory
          </button>
        </div>
      </div>
    </header>
  );
};
