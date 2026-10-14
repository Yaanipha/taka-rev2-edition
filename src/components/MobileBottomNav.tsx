import React from 'react';
import { Home, Coffee, ShoppingBag, Gift, MapPin, CreditCard } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenPass: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenPass,
}) => {
  const tabs = [
    { id: 'tiers', label: 'Prestige', icon: Home },
    { id: 'lounge', label: 'Lounge', icon: Coffee },
    { id: 'depachika', label: 'Depachika', icon: ShoppingBag, badge: cartCount },
    { id: 'vouchers', label: 'Wallet', icon: Gift },
    { id: 'directory', label: 'Directory', icon: MapPin },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFF8F7]/95 backdrop-blur-md border-t border-[#EEDCD4] shadow-[0_-4px_20px_rgba(32,26,26,0.06)] px-2 pt-2 pb-3 max-w-[430px] mx-auto">
      <div className="grid grid-cols-5 items-center justify-items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center w-full py-1 min-h-[48px] rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#7A1520]'
                  : 'text-[#8A7170] hover:text-[#574141] active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2 bg-[#7A1520] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight transition-all ${
                  isActive ? 'font-bold text-[#7A1520]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#7A1520] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
