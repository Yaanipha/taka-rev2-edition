import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, MessageSquare, Coffee, ShoppingBag, Gift } from 'lucide-react';
import { ROSE_CHAN_QUOTES } from '../data/mockData';

interface MobileConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onNavigate: (tab: string) => void;
  onOpenPass: () => void;
}

export const MobileConciergeModal: React.FC<MobileConciergeModalProps> = ({
  isOpen,
  onClose,
  userName,
  onNavigate,
  onOpenPass,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  if (!isOpen) return null;

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % ROSE_CHAN_QUOTES.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[430px] bg-[#FFF8F7] rounded-t-3xl sm:rounded-3xl border border-[#EEDCD4] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-[#DEBFBE] rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Header */}
        <div className="p-4 border-b border-[#EEDCD4] bg-[#F7EDE8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#DEBFBE] shadow-xs">
              <img
                src="/src/assets/images/mascot_rose_chan_concierge_1791943421781.jpg"
                alt="Rose-chan"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-[#201A1A]">
                Rose-chan Mobile Concierge
              </h3>
              <p className="text-[10px] text-[#8A7170]">Takashimaya Omotenashi Hostess</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#574141] hover:bg-[#EEDCD4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Mascot Bubble */}
          <div className="p-4 bg-white rounded-2xl border border-[#EEDCD4] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#7A1520] font-semibold">
              <span>Personal Greeting for {userName}</span>
              <button
                onClick={nextQuote}
                className="text-[10px] underline hover:text-[#58000F] cursor-pointer"
              >
                Next Tip
              </button>
            </div>
            <p className="text-xs text-[#201A1A] leading-relaxed italic">
              "{ROSE_CHAN_QUOTES[quoteIndex]}"
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7170]">
              How may I assist you today?
            </span>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  onNavigate('lounge');
                  onClose();
                }}
                className="p-3 bg-white hover:bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#201A1A]">
                      Reserve The Rose Lounge
                    </h4>
                    <p className="text-[10px] text-[#8A7170]">Book Level 3 tea ceremony slot</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A7170] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onNavigate('depachika');
                  onClose();
                }}
                className="p-3 bg-white hover:bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#201A1A]">
                      Order Seasonal Depachika
                    </h4>
                    <p className="text-[10px] text-[#8A7170]">Shizuoka crown melons & Wagyu</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A7170] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onOpenPass();
                  onClose();
                }}
                className="p-3 bg-white hover:bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#201A1A]">
                      Show Digital VIP Member Pass
                    </h4>
                    <p className="text-[10px] text-[#8A7170]">Scan at cashier for points & perks</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A7170] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7EDE8] border-t border-[#EEDCD4] text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#7A1520] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Close Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
