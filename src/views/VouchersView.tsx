import React, { useState } from 'react';
import { Gift, QrCode, Clock, Check, X } from 'lucide-react';
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
    <div className="space-y-4 pb-24 max-w-[430px] mx-auto px-4">
      {/* Points Mobile Hero Card */}
      <div className="bg-gradient-to-br from-[#7A1520] via-[#58000F] to-[#380008] text-white rounded-2xl p-5 border border-[#C59B57]/40 shadow-md">
        <span className="text-[9px] uppercase font-bold tracking-widest text-[#FFB3B2] block mb-1">
          Takashimaya Prestige Rewards Wallet
        </span>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-serif text-3xl font-bold tracking-tight tabular-nums">
              {rosePoints.toLocaleString()}
            </div>
            <span className="text-xs text-[#FFB3B2]">Rose Points Available</span>
          </div>

          <button
            onClick={() => setActiveTab(activeTab === 'wallet' ? 'catalog' : 'wallet')}
            className="px-3 py-1.5 bg-[#C59B57] text-[#281900] text-[11px] font-bold rounded-lg shadow-xs cursor-pointer"
          >
            {activeTab === 'wallet' ? 'Get Perks' : 'View Wallet'}
          </button>
        </div>
      </div>

      {redeemedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Redeemed "{redeemedNotice}"!</span>
          </div>
          <button
            onClick={() => setActiveTab('wallet')}
            className="underline shrink-0 ml-2 text-[11px]"
          >
            View
          </button>
        </div>
      )}

      {/* Segmented Tab Controls */}
      <div className="flex items-center p-1 bg-[#F7EDE8] rounded-xl border border-[#EEDCD4]">
        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'wallet'
              ? 'bg-white text-[#7A1520] shadow-xs'
              : 'text-[#8A7170]'
          }`}
        >
          My Vouchers ({activeVouchers.length})
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-white text-[#7A1520] shadow-xs'
              : 'text-[#8A7170]'
          }`}
        >
          Redeem Perks ({catalogVouchers.length})
        </button>
      </div>

      {/* Tab 1: Active Vouchers */}
      {activeTab === 'wallet' && (
        <div className="space-y-3">
          {activeVouchers.length === 0 ? (
            <div className="py-12 text-center space-y-2 bg-white rounded-2xl border border-[#EEDCD4] p-4">
              <Gift className="w-8 h-8 text-[#8A7170] mx-auto" />
              <p className="font-serif text-sm font-bold text-[#201A1A]">No active vouchers</p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="mt-2 px-4 py-1.5 bg-[#7A1520] text-white text-xs font-semibold rounded-lg"
              >
                Exchange Points
              </button>
            </div>
          ) : (
            activeVouchers.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-[#EEDCD4] p-4 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#7A1520]">
                      {v.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#201A1A]">
                      {v.title}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-[#F7EDE8] text-[#7A1520] text-[10px] font-bold rounded border border-[#DEBFBE] shrink-0">
                    {v.discountDisplay}
                  </span>
                </div>

                <p className="text-[11px] text-[#574141] line-clamp-2">{v.terms}</p>

                <div className="pt-2 border-t border-[#EEDCD4] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#8A7170]">{v.code}</span>
                  <button
                    onClick={() => setSelectedVoucher(v)}
                    className="px-3 py-1.5 bg-[#7A1520] text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Scan Barcode</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Catalog */}
      {activeTab === 'catalog' && (
        <div className="space-y-3">
          {catalogVouchers.map((v) => {
            const canAfford = rosePoints >= v.pointsCost;

            return (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-[#EEDCD4] p-4 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#7A1520]">
                      {v.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#201A1A]">
                      {v.title}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-[#C59B57]/15 text-[#604102] text-[10px] font-bold rounded border border-[#C59B57]/30 shrink-0">
                    {v.discountDisplay}
                  </span>
                </div>

                <p className="text-[11px] text-[#574141]">{v.terms}</p>

                <div className="pt-2 border-t border-[#EEDCD4] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-[#8A7170] block">Required</span>
                    <strong className="text-xs text-[#7A1520] tabular-nums">
                      {v.pointsCost.toLocaleString()} pts
                    </strong>
                  </div>

                  <button
                    onClick={() => handleRedeem(v)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                      canAfford
                        ? 'bg-[#7A1520] text-white shadow-xs'
                        : 'bg-[#EEDCD4] text-[#8A7170] cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Need Points'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Barcode Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-[#EEDCD4] p-5 shadow-2xl text-center space-y-3">
            <div className="flex justify-between items-start">
              <div className="text-left">
                <span className="text-[9px] uppercase font-bold text-[#7A1520]">
                  {selectedVoucher.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-[#201A1A]">
                  {selectedVoucher.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="p-1 rounded-full hover:bg-[#F7EDE8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#F7EDE8] rounded-xl border border-[#DEBFBE] space-y-2">
              <div className="w-full flex items-center justify-center gap-[2px] h-14 overflow-hidden px-2">
                {[4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 3, 2, 4, 1, 3, 2].map((w, i) => (
                  <div key={i} className="bg-black h-full" style={{ width: `${w * 2.5}px` }} />
                ))}
              </div>
              <p className="font-mono text-xs font-bold tracking-widest text-[#201A1A]">
                {selectedVoucher.code}
              </p>
            </div>

            <button
              onClick={() => setSelectedVoucher(null)}
              className="w-full py-2 bg-[#7A1520] text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
