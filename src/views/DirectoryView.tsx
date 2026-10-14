import React, { useState } from 'react';
import { MapPin, Search, Star, Clock, Sparkles, Navigation, Phone, ChevronRight } from 'lucide-react';
import { FLOORS_DATA } from '../data/mockData';
import { FloorInfo } from '../types';

interface DirectoryViewProps {
  onNavigateLounge: () => void;
  onNavigateDepachika: () => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onNavigateLounge,
  onNavigateDepachika,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('B2');
  const [searchQuery, setSearchQuery] = useState('');

  const currentFloor = FLOORS_DATA.find((f) => f.level === selectedLevel) || FLOORS_DATA[0];

  const filteredStores = currentFloor.stores.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#7A1520] tracking-wider uppercase">
          <MapPin className="w-4 h-4 text-[#7A1520]" />
          <span>Takashimaya Department Store · 391 Orchard Road</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#201A1A]">
          Store Directory & Floor Guide
        </h1>
        <p className="text-sm text-[#574141] leading-relaxed">
          Navigate six expansive levels of curated Japanese gastronomy, luxury fashion houses, haute horlogerie salons, and The Rose VIP Lounge.
        </p>
      </div>

      {/* Floor Level Selector Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FLOORS_DATA.map((fl) => (
          <button
            key={fl.level}
            onClick={() => setSelectedLevel(fl.level)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
              selectedLevel === fl.level
                ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-md'
                : 'bg-white hover:bg-[#F7EDE8] text-[#574141] border-[#EEDCD4]'
            }`}
          >
            <span className="font-serif text-sm">{fl.level}</span>
            <span className="text-[11px] font-sans font-normal opacity-90 hidden sm:inline">
              {fl.englishTitle.split('&')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Floor Presentation Card */}
      <div className="bg-white rounded-3xl border border-[#EEDCD4] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EEDCD4]">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7A1520]">
                {currentFloor.level}
              </span>
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#201A1A]">
                  {currentFloor.englishTitle}
                </h2>
                <p className="text-xs text-[#8A7170]">{currentFloor.japaneseTitle}</p>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex items-center gap-2">
            {currentFloor.level === 'L3' && (
              <button
                onClick={onNavigateLounge}
                className="px-4 py-2 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reserve Rose Lounge</span>
              </button>
            )}
            {currentFloor.level === 'B2' && (
              <button
                onClick={onNavigateDepachika}
                className="px-4 py-2 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Order Depachika Delicacies</span>
              </button>
            )}
          </div>
        </div>

        {/* Floor Highlights Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7170] mr-2">
            Floor Highlights:
          </span>
          {currentFloor.highlights.map((hl, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#F7EDE8] text-[#574141] font-medium rounded-lg border border-[#EEDCD4] text-[11px]"
            >
              {hl}
            </span>
          ))}
        </div>

        {/* Search within floor */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#8A7170] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search boutiques on ${currentFloor.level}...`}
            className="w-full pl-9 pr-4 py-2 bg-[#FFF8F7] border border-[#EEDCD4] rounded-xl text-xs text-[#201A1A] focus:outline-none focus:ring-2 focus:ring-[#7A1520]/20"
          />
        </div>

        {/* Boutiques & Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredStores.map((store, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#FFF8F7] border border-[#EEDCD4] hover:bg-[#F7EDE8] transition-all flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-sm font-bold text-[#201A1A]">
                    {store.name}
                  </h4>
                  {store.isVipPartner && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#7A1520] text-white">
                      VIP Partner
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#574141] mt-0.5">{store.category}</p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-white border border-[#EEDCD4] rounded-md text-[11px] font-mono font-semibold text-[#7A1520]">
                  {store.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Store Concierge Assistance Banner */}
      <div className="p-6 bg-[#F7EDE8] rounded-3xl border border-[#EEDCD4] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#7A1520] text-white flex items-center justify-center shrink-0 shadow-md">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#201A1A]">
              Personal Shopper & Tax Refund Inquiries
            </h3>
            <p className="text-xs text-[#574141] mt-0.5">
              Customer Service Centre located at Level 3 North. Tourist GST refund and VIP parcel consolidation available.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono font-bold text-[#7A1520] bg-white px-3.5 py-2 rounded-xl border border-[#EEDCD4]">
            Tel: +65 6738 1111
          </span>
        </div>
      </div>
    </div>
  );
};
