import React, { useState } from 'react';
import { X, RotateCcw, Check, Sparkles, QrCode, ShieldCheck, ChevronRight } from 'lucide-react';
import { TierLevel, UserProfile } from '../types';
import { TIERS_DATA } from '../data/mockData';

interface MemberCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  currentTier: TierLevel;
  onSelectTier: (tier: TierLevel) => void;
}

export const MemberCardModal: React.FC<MemberCardModalProps> = ({
  isOpen,
  onClose,
  user,
  currentTier,
  onSelectTier,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const tier = TIERS_DATA[currentTier];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.memberId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201A1A]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFF8F7] border border-[#EEDCD4] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEDCD4] bg-[#F7EDE8]/60">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#7A1520] text-white flex items-center justify-center font-serif text-xs font-bold">
              髙
            </span>
            <span className="font-serif text-lg font-bold text-[#201A1A]">
              Digital VIP Member Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EEDCD4]/60 text-[#574141] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Card Simulation Area */}
          <div className="perspective-1000">
            <div
              className={`relative w-full aspect-[1.586/1] rounded-2xl shadow-xl transition-transform duration-700 transform-style-3d cursor-pointer select-none ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* FRONT SIDE */}
              <div
                className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between backface-hidden bg-gradient-to-br ${tier.gradient} border-2 ${tier.cardFoil} shadow-2xl overflow-hidden`}
              >
                {/* Decorative Japanese Rose Watermark Background */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none text-white">
                  <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M50 15 C30 30, 20 60, 50 85 C80 60, 70 30, 50 15 Z" />
                    <path d="M25 40 C35 25, 65 25, 75 40 C60 70, 40 70, 25 40 Z" opacity="0.7" />
                  </svg>
                </div>

                {/* Card Top Row */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-white/40 bg-black/20 flex items-center justify-center font-serif text-base font-bold text-white shadow-inner">
                      髙
                    </div>
                    <div>
                      <div className="font-serif tracking-widest text-xs uppercase font-semibold text-white/90">
                        TAKASHIMAYA
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-white/70">
                        SINGAPORE · ORCHARD
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                      {tier.badgeLabel}
                    </span>
                    <span className="text-[9px] text-white/60 mt-1 uppercase tracking-wider">
                      Tap card to flip
                    </span>
                  </div>
                </div>

                {/* Card Middle Chip & Name */}
                <div className="relative z-10 my-auto">
                  <div className="w-11 h-8 rounded-md bg-gradient-to-r from-amber-200 to-yellow-400 border border-amber-500/40 shadow-sm mb-3 flex items-center justify-center opacity-90">
                    <div className="w-8 h-5 border border-amber-700/30 rounded flex items-center justify-around px-1">
                      <div className="w-2 h-2 rounded-full border border-amber-800/40" />
                      <div className="w-2 h-2 rounded-full border border-amber-800/40" />
                    </div>
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-sm">
                    {user.name}
                  </div>
                  <div className="text-xs font-mono tracking-widest text-white/80 mt-0.5">
                    {user.memberId}
                  </div>
                </div>

                {/* Card Bottom Row */}
                <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/15 text-white/80 text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block text-white/60">
                      Member Since
                    </span>
                    <span className="font-medium text-white">{user.memberSince}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider block text-white/60">
                      Prestige Status
                    </span>
                    <span className="font-medium text-white">Active · Priority Access</span>
                  </div>
                </div>
              </div>

              {/* BACK SIDE (ROTATE-Y-180) */}
              <div
                className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#1E1B1B] text-white border-2 ${tier.cardFoil} shadow-2xl`}
              >
                {/* Magnetic Strip */}
                <div className="absolute top-5 left-0 right-0 h-9 bg-black/80" />

                <div className="mt-12 flex items-center justify-between text-xs text-stone-300">
                  <span className="font-mono">{user.memberId}</span>
                  <span className="text-[10px] text-stone-400">Scan at Cashier & Lounge</span>
                </div>

                {/* Barcode & QR Block */}
                <div className="bg-white rounded-lg p-3 text-black flex flex-col items-center justify-center shadow-inner">
                  {/* Faux Barcode */}
                  <div className="w-full flex items-center justify-center gap-[2px] h-12 overflow-hidden px-2">
                    {[3, 1, 4, 1, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 3, 1, 2, 3, 2, 1, 4].map((width, idx) => (
                      <div
                        key={idx}
                        className="bg-black h-full"
                        style={{ width: `${width * 2}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs tracking-widest mt-1 text-stone-800 font-bold">
                    {user.barcode}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-stone-400">
                  <span>Authorized Signature Required</span>
                  <div className="flex items-center gap-1 text-amber-300 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ngee Ann City VIP Key</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action to flip */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#7A1520] hover:text-[#8E1C27] bg-[#F7EDE8] hover:bg-[#F2E5E5] px-4 py-2 rounded-lg transition-colors border border-[#EEDCD4] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Show Front of Pass' : 'Show Barcode & Lounge Scan Pass'}</span>
            </button>
          </div>

          {/* Spend Meter & Progress */}
          <div className="p-4 bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#574141]">2026 Qualifying Spend</span>
              <span className="text-[#7A1520] font-bold tabular-nums">
                S${user.annualSpend.toLocaleString()} / S${user.nextTierSpendTarget.toLocaleString()}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-[#EEDCD4] rounded-full overflow-hidden">
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
            <p className="text-[11px] text-[#574141] flex items-center justify-between">
              <span>
                Spend <strong>S${(user.nextTierSpendTarget - user.annualSpend).toLocaleString()}</strong> more to reach Platinum Tier
              </span>
              <span className="text-[#7A1520] font-bold">
                {Math.round((user.annualSpend / user.nextTierSpendTarget) * 100)}%
              </span>
            </p>
          </div>

          {/* Tier Simulator Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#574141] mb-2 uppercase tracking-wider">
              Preview Card Across Membership Tiers
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['bronze', 'silver', 'gold', 'platinum', 'diamond'] as TierLevel[]).map((tId) => {
                const t = TIERS_DATA[tId];
                const isActive = currentTier === tId;
                return (
                  <button
                    key={tId}
                    onClick={() => onSelectTier(tId)}
                    className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-sm'
                        : 'bg-[#FFFFFF] text-[#574141] border-[#EEDCD4] hover:bg-[#F7EDE8]'
                    }`}
                  >
                    <div className="capitalize">{tId}</div>
                    <div className="text-[9px] opacity-75 font-normal">{t.spendDisplay}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Member Privileges Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-[#8A7170] tracking-wider">
              Active Tier Privileges
            </h4>
            <div className="space-y-1.5">
              {tier.privileges.slice(0, 3).map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#201A1A]">
                  <Check className="w-3.5 h-3.5 text-[#7A1520] mt-0.5 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EEDCD4] bg-[#F7EDE8]/80 flex items-center justify-between gap-3">
          <button
            onClick={handleCopyCode}
            className="flex-1 py-2.5 px-4 text-xs font-semibold text-[#7A1520] bg-white border border-[#EEDCD4] hover:bg-[#FFF8F7] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{copiedCode ? 'Member ID Copied' : 'Copy Member ID'}</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-6 text-xs font-semibold text-white bg-[#7A1520] hover:bg-[#8E1C27] rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
