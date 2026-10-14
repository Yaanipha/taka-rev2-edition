import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Crown } from 'lucide-react';
import { TierLevel } from '../types';
import { TIERS_DATA, PRIVILEGES_DATA } from '../data/mockData';

interface PrivilegeMatrixViewProps {
  currentTier: TierLevel;
  onSelectTier: (tier: TierLevel) => void;
  onOpenPass: () => void;
}

export const PrivilegeMatrixView: React.FC<PrivilegeMatrixViewProps> = ({
  currentTier,
  onSelectTier,
  onOpenPass,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const categories = [
    'all',
    'Arrival & Valet',
    'Omotenashi Hospitality',
    'Concierge & Styling',
    'Depachika & Gourmet',
    'Loyalty & Rewards',
  ];

  const filteredPrivileges = PRIVILEGES_DATA.filter((p) => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  const tiersList: TierLevel[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

  return (
    <div className="space-y-4 pb-24 max-w-[430px] mx-auto px-4">
      {/* Mobile Title */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase font-bold text-[#7A1520] tracking-wider">
          Takashimaya Prestige
        </span>
        <h2 className="font-serif text-xl font-bold text-[#201A1A]">
          Tier Entitlements & Perks
        </h2>
        <p className="text-[11px] text-[#574141]">
          Current: <strong className="text-[#7A1520]">{TIERS_DATA[currentTier].name}</strong>
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#7A1520] text-white border-[#7A1520]'
                : 'bg-white text-[#574141] border-[#EEDCD4]'
            }`}
          >
            {cat === 'all' ? 'All Perks' : cat}
          </button>
        ))}
      </div>

      {/* Accordion Cards */}
      <div className="space-y-2.5">
        {filteredPrivileges.map((item) => {
          const isExpanded = expandedRow === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EEDCD4] p-4 shadow-2xs space-y-2.5"
            >
              <div
                onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                className="flex items-start justify-between cursor-pointer"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8A7170]">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#201A1A]">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#574141] mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <div className="p-1 rounded text-[#7A1520]">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Current Tier Perk Highlight */}
              <div className="p-2.5 bg-[#F7EDE8] rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#574141] text-[11px]">
                  Your Perk (<strong>{TIERS_DATA[currentTier].name.split(' ')[0]}</strong>):
                </span>
                <span className="font-bold text-[#7A1520] text-xs">
                  {item.tiers[currentTier] === false
                    ? 'Not Included'
                    : item.tiers[currentTier] === true
                    ? 'Included'
                    : item.tiers[currentTier]}
                </span>
              </div>

              {/* Accordion Detail Breakdown */}
              {isExpanded && (
                <div className="pt-2 border-t border-[#EEDCD4] space-y-1.5 text-xs animate-in fade-in duration-200">
                  {tiersList.map((tId) => {
                    const t = TIERS_DATA[tId];
                    const val = item.tiers[tId];
                    const isCurrent = currentTier === tId;

                    return (
                      <div
                        key={tId}
                        onClick={() => onSelectTier(tId)}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                          isCurrent ? 'bg-[#7A1520]/10 font-bold' : 'hover:bg-[#FFF8F7]'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: t.accentColor }}
                          />
                          <span>{t.name.split(' ')[0]}</span>
                        </span>
                        <span className="text-[11px] text-[#201A1A]">
                          {val === false ? '—' : val === true ? 'Included' : val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <button
          onClick={onOpenPass}
          className="w-full py-3 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer text-center"
        >
          View My Digital Pass
        </button>
      </div>
    </div>
  );
};
