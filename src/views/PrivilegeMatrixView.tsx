import React, { useState } from 'react';
import { Check, X, Shield, ChevronDown, ChevronUp, Sparkles, Crown } from 'lucide-react';
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
    'Global Privileges',
    'Bespoke Recognitions'
  ];

  const filteredPrivileges = PRIVILEGES_DATA.filter((p) => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  const tiersList: TierLevel[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#7A1520] tracking-wider uppercase">
          <Crown className="w-4 h-4 text-[#7A1520]" />
          <span>Takashimaya Prestige Member Privilege Comparison</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#201A1A]">
          Privilege Matrix & Tier Entitlements
        </h1>
        <p className="text-sm text-[#574141] leading-relaxed">
          Detailed breakdown of hospitality benefits, valet allowances, lounge privileges, and international reciprocity across all five membership tiers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-sm'
                : 'bg-white hover:bg-[#F7EDE8] text-[#574141] border-[#EEDCD4]'
            }`}
          >
            {cat === 'all' ? 'All Privileges' : cat}
          </button>
        ))}
      </div>

      {/* Desktop Matrix Table (>= 1024px) */}
      <div className="hidden lg:block bg-white rounded-3xl border border-[#EEDCD4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EEDCD4] bg-[#F7EDE8]/80 text-xs">
                <th className="py-4 px-6 font-serif font-bold text-[#201A1A] w-1/3">
                  Privilege & Benefit Description
                </th>
                {tiersList.map((tId) => {
                  const t = TIERS_DATA[tId];
                  const isCurrent = currentTier === tId;
                  return (
                    <th
                      key={tId}
                      onClick={() => onSelectTier(tId)}
                      className={`py-4 px-4 text-center cursor-pointer transition-colors ${
                        isCurrent
                          ? 'bg-[#7A1520]/10 border-x-2 border-t-2 border-[#7A1520]'
                          : 'hover:bg-[#F7EDE8]'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-1"
                          style={{ backgroundColor: t.accentColor }}
                        >
                          {t.name}
                        </span>
                        <span className="font-bold text-[#201A1A] text-xs tabular-nums">
                          {t.spendDisplay}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold text-[#7A1520] uppercase mt-0.5">
                            Active
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEDCD4] text-xs">
              {filteredPrivileges.map((item) => (
                <tr key={item.id} className="hover:bg-[#FFF8F7] transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7170] block">
                      {item.category}
                    </span>
                    <strong className="text-sm font-serif font-bold text-[#201A1A] block mt-0.5">
                      {item.name}
                    </strong>
                    <p className="text-[#574141] mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </td>

                  {tiersList.map((tId) => {
                    const val = item.tiers[tId];
                    const isCurrent = currentTier === tId;

                    return (
                      <td
                        key={tId}
                        className={`py-4 px-4 text-center align-middle font-medium ${
                          isCurrent ? 'bg-[#7A1520]/5 border-x-2 border-[#7A1520]' : ''
                        }`}
                      >
                        {val === false ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#EEDCD4]/50 text-[#8A7170]">
                            <X className="w-3 h-3" />
                          </span>
                        ) : typeof val === 'string' ? (
                          <span className="text-xs text-[#201A1A] font-semibold block leading-tight">
                            {val}
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7A1520]/15 text-[#7A1520]">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile & Tablet Card / Accordion Matrix (< 1024px) */}
      <div className="lg:hidden space-y-4">
        {filteredPrivileges.map((item) => {
          const isExpanded = expandedRow === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EEDCD4] p-5 shadow-xs space-y-3"
            >
              <div
                onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                className="flex items-start justify-between cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7170]">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#201A1A]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#574141] mt-1">{item.description}</p>
                </div>
                <div className="p-1 rounded-md text-[#7A1520] hover:bg-[#F7EDE8]">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Current Tier Quick Value */}
              <div className="p-3 bg-[#F7EDE8] rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#574141]">
                  Your Benefit (<strong>{TIERS_DATA[currentTier].name}</strong>):
                </span>
                <span className="font-bold text-[#7A1520]">
                  {item.tiers[currentTier] === false
                    ? 'Not Included'
                    : item.tiers[currentTier] === true
                    ? 'Included'
                    : item.tiers[currentTier]}
                </span>
              </div>

              {/* Accordion Tier Breakdown */}
              {isExpanded && (
                <div className="pt-3 border-t border-[#EEDCD4] space-y-2 text-xs">
                  {tiersList.map((tId) => {
                    const t = TIERS_DATA[tId];
                    const val = item.tiers[tId];
                    const isCurrent = currentTier === tId;

                    return (
                      <div
                        key={tId}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          isCurrent ? 'bg-[#7A1520]/10 font-bold' : 'hover:bg-[#FFF8F7]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: t.accentColor }}
                          />
                          <span>{t.name}</span>
                        </span>
                        <span className="text-[#201A1A]">
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

      {/* Bottom Summary & Pass Trigger */}
      <div className="p-6 bg-[#F7EDE8] rounded-3xl border border-[#EEDCD4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#201A1A]">
            Experience Your Entitlements Today
          </h3>
          <p className="text-xs text-[#574141] mt-0.5">
            Present your digital VIP Pass at any Ngee Ann City concierge desk, valet booth, or boutique salon.
          </p>
        </div>
        <button
          onClick={onOpenPass}
          className="px-6 py-2.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer whitespace-nowrap"
        >
          Access Member Pass
        </button>
      </div>
    </div>
  );
};
