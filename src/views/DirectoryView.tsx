import React, { useState } from 'react';
import { MapPin, Search, Phone, Coffee, ShoppingBag, ChevronRight } from 'lucide-react';
import { FLOORS_DATA } from '../data/mockData';

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
    <div className="space-y-4 pb-24 max-w-[430px] mx-auto px-4">
      {/* Title */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase font-bold text-[#7A1520] tracking-wider">
          391 Orchard Road · Ngee Ann City
        </span>
        <h2 className="font-serif text-xl font-bold text-[#201A1A]">
          Store Floor Guide
        </h2>
      </div>

      {/* Floor Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {FLOORS_DATA.map((fl) => (
          <button
            key={fl.level}
            onClick={() => setSelectedLevel(fl.level)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedLevel === fl.level
                ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-xs'
                : 'bg-white text-[#574141] border-[#EEDCD4]'
            }`}
          >
            <span>{fl.level}</span>
          </button>
        ))}
      </div>

      {/* Selected Floor Banner Card */}
      <div className="bg-white rounded-2xl border border-[#EEDCD4] p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#EEDCD4]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#7A1520]">
              {currentFloor.level}
            </span>
            <div>
              <h3 className="font-serif text-xs font-bold text-[#201A1A]">
                {currentFloor.englishTitle}
              </h3>
              <p className="text-[9px] text-[#8A7170]">{currentFloor.japaneseTitle}</p>
            </div>
          </div>

          {currentFloor.level === 'L3' && (
            <button
              onClick={onNavigateLounge}
              className="px-2.5 py-1 bg-[#7A1520] text-white text-[10px] font-bold rounded-lg cursor-pointer"
            >
              Book Lounge
            </button>
          )}

          {currentFloor.level === 'B2' && (
            <button
              onClick={onNavigateDepachika}
              className="px-2.5 py-1 bg-[#7A1520] text-white text-[10px] font-bold rounded-lg cursor-pointer"
            >
              Order Food
            </button>
          )}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 text-[10px]">
          {currentFloor.highlights.slice(0, 3).map((hl, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-[#F7EDE8] text-[#574141] rounded border border-[#EEDCD4]"
            >
              {hl}
            </span>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8A7170] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${currentFloor.level} boutiques...`}
            className="w-full pl-8 pr-3 py-1.5 bg-[#FFF8F7] border border-[#EEDCD4] rounded-xl text-xs text-[#201A1A] focus:outline-none focus:ring-1 focus:ring-[#7A1520]"
          />
        </div>

        {/* Stores list */}
        <div className="space-y-2 pt-1">
          {filteredStores.map((st, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-[#FFF8F7] border border-[#EEDCD4] flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#201A1A] block">{st.name}</span>
                <span className="text-[10px] text-[#574141]">{st.category}</span>
              </div>
              <span className="text-[10px] font-mono text-[#7A1520] bg-white px-2 py-0.5 rounded border border-[#EEDCD4]">
                {st.location}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Concierge Hotline */}
      <div className="p-3.5 bg-[#F7EDE8] rounded-2xl border border-[#EEDCD4] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7A1520] text-white flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#201A1A] block">VIP Concierge Desk</span>
            <span className="text-[10px] text-[#574141]">Level 3 North Wing</span>
          </div>
        </div>
        <span className="font-mono text-xs font-bold text-[#7A1520]">+65 6738 1111</span>
      </div>
    </div>
  );
};
