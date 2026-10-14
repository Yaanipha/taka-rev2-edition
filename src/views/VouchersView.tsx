import React, { useState } from 'react';
import { Gift, QrCode, Sparkles, Check, Clock, AlertCircle, X, ChevronRight } from 'lucide-react';
import { Voucher, TierLevel } from '../types';
import { VOUCHERS_DATA } from '../data/mockData';

interface VouchersViewProps {
  rosePoints: number;
  onDeductPoints: (pts: number) => void;
  currentTier: TierLevel;
  onOpenPass: () => void;
}

export const VouchersView: React.FC<VouchersViewProps> = ({
  rosePoints,
  onDeductPoints,
  currentTier,
  onOpenPass,
}) => {
  const [vouchers, setVouchers] = useState<Voucher[]>(VOUCHERS_DATA);
  const [activeTab, setActiveTab] = useState<'wallet' | 'catalog'>('wallet');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [redeemedNotice, setRedeemedNotice] = useState<string | null>(null);

  const activeVouchers = vouchers.filter((v) => v.isClaimed);
  const catalogVouchers = vouchers.filter((v) => !v.isClaimed);

  const handleRedeem = (voucher: Voucher) => {
    if (rosePoints < voucher.pointsCost) {
      alert(`You need ${voucher.pointsCost.toLocaleString()} Rose Points to redeem this voucher.`);
      return;
    }

    onDeductPoints(voucher.pointsCost);
    setVouchers((prev) =>
      prev.map((v) => (v.id === voucher.id ? { ...v, isClaimed: true } : v))
    );
    setRedeemedNotice(voucher.title);
    setTimeout(() => setRedeemedNotice(null), 3000);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Points & Wallet Summary Card */}
      <section className="bg-gradient-to-br from-[#7A1520] via-[#58000F] to-[#380008] text-white rounded-3xl p-8 sm:p-10 border border-[#C59B57]/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFB3B2]">
              Takashimaya Prestige Rewards Wallet
            </span>
            <div className="flex items-baseline gap-3">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">
                {rosePoints.toLocaleString()}
              </h1>
              <span className="text-lg font-medium text-[#FFB3B2]">Rose Points Available</span>
            </div>
            <p className="text-xs text-white/80 max-w-md leading-relaxed">
              Earn 2.0× points per S$1 spent. Points can be exchanged for Depachika food hall vouchers, valet parking passes, and vintage champagne lounge pairings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-5 py-2.5 bg-[#C59B57] hover:bg-[#D4AF37] text-[#281900] font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Exchange Points for Perks
            </button>
            <button
              onClick={onOpenPass}
              className="px-5 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Show Member Pass
            </button>
          </div>
        </div>
      </section>

      {/* Redeemed Success Notification Banner */}
      {redeemedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center justify-between text-xs font-semibold animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Successfully redeemed "{redeemedNotice}"! It has been added to your Active Vouchers wallet.</span>
          </div>
          <button
            onClick={() => setActiveTab('wallet')}
            className="underline hover:text-emerald-950 cursor-pointer"
          >
            View in Wallet
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#EEDCD4] pb-2">
        <button
          onClick={() => setActiveTab('wallet')}
          className={`pb-2 px-1 text-sm font-serif font-bold transition-all cursor-pointer relative ${
            activeTab === 'wallet'
              ? 'text-[#7A1520]'
              : 'text-[#8A7170] hover:text-[#201A1A]'
          }`}
        >
          <span>Active Vouchers ({activeVouchers.length})</span>
          {activeTab === 'wallet' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1520] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-2 px-1 text-sm font-serif font-bold transition-all cursor-pointer relative ${
            activeTab === 'catalog'
              ? 'text-[#7A1520]'
              : 'text-[#8A7170] hover:text-[#201A1A]'
          }`}
        >
          <span>Points Redemption Catalog ({catalogVouchers.length})</span>
          {activeTab === 'catalog' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1520] rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: Active Vouchers */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          {activeVouchers.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#EEDCD4]">
              <Gift className="w-10 h-10 text-[#8A7170] mx-auto" />
              <p className="font-serif text-lg text-[#201A1A]">No active vouchers yet</p>
              <p className="text-xs text-[#574141] max-w-sm mx-auto">
                Exchange your accumulated Rose Points for gourmet Depachika dining vouchers or valet privileges.
              </p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="mt-3 px-5 py-2 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeVouchers.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border border-[#EEDCD4] overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1520]">
                          {v.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#201A1A] mt-0.5">
                          {v.title}
                        </h3>
                      </div>
                      <span className="px-3 py-1 bg-[#F7EDE8] text-[#7A1520] text-xs font-bold rounded-lg shrink-0 border border-[#DEBFBE]">
                        {v.discountDisplay}
                      </span>
                    </div>

                    <p className="text-xs text-[#574141] leading-relaxed">{v.terms}</p>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#8A7170] pt-2">
                      <Clock className="w-3.5 h-3.5 text-[#7A1520]" />
                      <span>Valid until {v.expiryDate}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F7EDE8] border-t border-[#EEDCD4] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#574141] font-semibold">
                      {v.code}
                    </span>
                    <button
                      onClick={() => setSelectedVoucher(v)}
                      className="px-4 py-2 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Scan at Cashier</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Points Redemption Catalog */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {catalogVouchers.map((v) => {
            const canAfford = rosePoints >= v.pointsCost;

            return (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-[#EEDCD4] p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7170]">
                        {v.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#201A1A] mt-0.5">
                        {v.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-[#C59B57]/15 text-[#604102] text-xs font-bold rounded-lg shrink-0 border border-[#C59B57]/30">
                      {v.discountDisplay}
                    </span>
                  </div>

                  <p className="text-xs text-[#574141] leading-relaxed">{v.terms}</p>

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="text-[#8A7170]">Points Required:</span>
                    <strong className="text-sm font-bold text-[#7A1520] tabular-nums">
                      {v.pointsCost.toLocaleString()} Rose Points
                    </strong>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EEDCD4] flex items-center justify-between">
                  <span className="text-[11px] text-[#8A7170]">
                    Eligible: {v.minTier.toUpperCase()} & above
                  </span>
                  <button
                    onClick={() => handleRedeem(v)}
                    disabled={!canAfford}
                    className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-[#7A1520] hover:bg-[#8E1C27] text-white shadow-xs'
                        : 'bg-[#EEDCD4] text-[#8A7170] cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Voucher' : 'Insufficient Points'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Voucher Barcode Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201A1A]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border border-[#EEDCD4] p-6 shadow-2xl text-center space-y-4">
            <button
              onClick={() => setSelectedVoucher(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F7EDE8] text-[#574141] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#7A1520]">
                {selectedVoucher.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#201A1A] mt-1">
                {selectedVoucher.title}
              </h3>
              <p className="text-xs text-[#574141] mt-1">{selectedVoucher.discountDisplay}</p>
            </div>

            {/* Simulated Live Barcode */}
            <div className="p-4 bg-[#F7EDE8] rounded-2xl border border-[#DEBFBE] space-y-2">
              <div className="w-full flex items-center justify-center gap-[2.5px] h-16 px-4 overflow-hidden">
                {[4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2].map((w, i) => (
                  <div key={i} className="bg-black h-full" style={{ width: `${w * 2.5}px` }} />
                ))}
              </div>
              <p className="font-mono text-sm font-bold text-[#201A1A] tracking-widest">
                {selectedVoucher.code}
              </p>
            </div>

            <p className="text-[11px] text-[#8A7170]">
              Present this barcode to the cashier or lounge attendant at Takashimaya Singapore.
            </p>

            <button
              onClick={() => setSelectedVoucher(null)}
              className="w-full py-2.5 bg-[#7A1520] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
