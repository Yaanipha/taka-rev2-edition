import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenPass: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPass }) => {
  return (
    <footer className="bg-[#201A1A] text-[#FFF8F7] border-t border-[#362F2F] pt-14 pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Omotenashi Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#7A1520] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm ring-1 ring-[#C59B57]/50">
                髙
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  TAKASHIMAYA
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#DEBFBE] -mt-0.5">
                  PRESTIGE · SINGAPORE
                </span>
              </div>
            </div>

            <p className="text-xs text-[#DEBFBE] leading-relaxed">
              Rooted in the spirit of <em>omotenashi</em>—pure, selfless Japanese hospitality. Curating world-class luxury fashion, depachika delicacies, and serene salon sanctuaries on Orchard Road since 1993.
            </p>

            <div className="pt-1">
              <span className="inline-block text-[11px] font-serif text-[#C59B57] italic">
                おもてなしの心でお迎えいたします
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Prestige Services
            </h4>
            <ul className="space-y-2 text-xs text-[#DEBFBE]">
              <li>
                <button
                  onClick={() => onNavigate('tiers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Membership Tiers & Spend
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lounge')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Rose VIP Lounge (Level 3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('depachika')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Depachika Food Hall & Salons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privileges')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tier Privilege Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vouchers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rewards Points Wallet
                </button>
              </li>
            </ul>
          </div>

          {/* Store Hours & Valet */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Store & Valet Hours
            </h4>
            <div className="space-y-2 text-xs text-[#DEBFBE]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C59B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Department Store</strong>
                  <span>Daily: 10:00 AM – 9:30 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C59B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">The Rose Lounge (L3)</strong>
                  <span>Daily: 10:30 AM – 9:00 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C59B57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Complimentary Valet</strong>
                  <span>Ngee Ann City Porte-Cochère</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Flagship Address
            </h4>
            <div className="space-y-2 text-xs text-[#DEBFBE]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C59B57] shrink-0 mt-0.5" />
                <span>391 Orchard Road, Ngee Ann City, Singapore 238873</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C59B57] shrink-0 mt-0.5" />
                <span>Concierge Desk: +65 6738 1111</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenPass}
                  className="w-full py-2 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer border border-[#C59B57]/40"
                >
                  Open VIP Pass
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#362F2F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7170]">
          <div>
            © 2026 Takashimaya Singapore Ltd. All rights reserved. Ngee Ann City Flagship.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('privileges')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privilege Terms
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('directory')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Floor Directory
            </button>
            <span>·</span>
            <span className="text-[#DEBFBE]">Orchard Road Luxury</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
