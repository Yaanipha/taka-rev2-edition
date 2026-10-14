import React, { useState } from 'react';
import { Sparkles, MessageCircle, ChevronRight, Gift } from 'lucide-react';
import { ROSE_CHAN_QUOTES } from '../data/mockData';

interface RoseChanGreetingProps {
  onNavigateLounge: () => void;
  onNavigateDepachika: () => void;
  userName: string;
}

export const RoseChanGreeting: React.FC<RoseChanGreetingProps> = ({
  onNavigateLounge,
  onNavigateDepachika,
  userName,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % ROSE_CHAN_QUOTES.length);
  };

  return (
    <div className="bg-[#F7EDE8] border border-[#EEDCD4] rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Mascot Porcelain Figurine Vignette */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white border border-[#EEDCD4] shadow-md overflow-hidden relative group cursor-pointer" onClick={nextQuote}>
            <img
              src="/src/assets/images/mascot_rose_chan_concierge_1791943421781.jpg"
              alt="Takashimaya Rose-chan mascot figurine"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top rounded-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-[#7A1520] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ring-2 ring-white">
            Rose-chan
          </span>
        </div>

        {/* Speech Bubble Card */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span className="font-serif text-sm font-bold text-[#7A1520]">
              Rose-chan Concierge
            </span>
            <span className="text-xs text-[#8A7170]">·</span>
            <span className="text-xs text-[#8A7170]">Omotenashi Hostess</span>
          </div>

          <p className="text-sm text-[#201A1A] leading-relaxed italic bg-white/70 p-3.5 rounded-xl border border-[#EEDCD4]/70 shadow-inner">
            "{ROSE_CHAN_QUOTES[quoteIndex]}"
          </p>

          <div className="mt-3.5 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <button
              onClick={nextQuote}
              className="text-xs font-semibold text-[#7A1520] hover:text-[#58000F] px-3 py-1.5 rounded-md bg-white border border-[#EEDCD4] transition-colors cursor-pointer"
            >
              Ask Rose-chan Another Tip
            </button>
            <button
              onClick={onNavigateLounge}
              className="text-xs font-semibold text-white bg-[#7A1520] hover:bg-[#8E1C27] px-3.5 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span>Reserve Level 3 Lounge</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateDepachika}
              className="text-xs font-semibold text-[#574141] hover:text-[#201A1A] px-3 py-1.5 rounded-md hover:bg-white/60 transition-colors cursor-pointer"
            >
              Browse Fresh Depachika
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
