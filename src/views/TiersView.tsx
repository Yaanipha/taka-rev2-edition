import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CreditCard,
  Coffee,
  ShoppingBag,
  Gift,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  Star,
  Check,
  Crown
} from 'lucide-react';
import { TierLevel, UserProfile } from '../types';
import { TIERS_DATA } from '../data/mockData';
import { RoseChanGreeting } from '../components/RoseChanGreeting';

interface TiersViewProps {
  user: UserProfile;
  currentTier: TierLevel;
  onSelectTier: (tier: TierLevel) => void;
  onOpenPass: () => void;
  onNavigate: (tab: string) => void;
}

export const TiersView: React.FC<TiersViewProps> = ({
  user,
  currentTier,
  onSelectTier,
  onOpenPass,
  onNavigate,
}) => {
  const activeTier = TIERS_DATA[currentTier];

  return (
    <div className="space-y-12 pb-16">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#EEDCD4] shadow-sm bg-[#F7EDE8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between z-10">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1520] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#7A1520]" />
                <span>Takashimaya Prestige Hospitality · Ngee Ann City</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#201A1A] leading-[1.15] text-balance">
                Omotenashi Prestige at Singapore Orchard
              </h1>
              <p className="text-[#574141] text-base leading-relaxed">
                Step into a storied legacy of Japanese department store hospitality. Discover privileged lounge access, personal concierge styling, and world-class depachika delicacies curated exclusively for our patrons.
              </p>
            </div>

            {/* Member Quick Summary Card */}
            <div className="mt-8 p-4 sm:p-5 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EEDCD4] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm font-serif font-bold text-lg"
                  style={{ backgroundColor: activeTier.accentColor }}
                >
                  髙
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-[#8A7170] tracking-wider">
                    Welcome Back
                  </div>
                  <div className="text-base font-bold text-[#201A1A]">
                    {user.name}
                  </div>
                  <div className="text-xs font-semibold text-[#7A1520] flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>{activeTier.name} Member</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenPass}
                  className="px-4 py-2.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>View Member Pass</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_ginza_orchard_store_1791943420377.jpg"
              alt="Takashimaya Ngee Ann City Orchard Grand Atrium"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201A1A]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#F7EDE8] lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white text-xs backdrop-blur-md bg-black/40 p-3 rounded-xl border border-white/20">
              <p className="font-serif font-semibold text-sm">Ngee Ann City Flagship Atrium</p>
              <p className="text-white/80 text-[11px]">391 Orchard Road, Singapore 238873 · Levels B2 to 4</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rose-chan Mascot Greeting Section */}
      <RoseChanGreeting
        userName={user.name}
        onNavigateLounge={() => onNavigate('lounge')}
        onNavigateDepachika={() => onNavigate('depachika')}
      />

      {/* Prestige Tier Progression & Switcher */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold text-[#7A1520] tracking-wider mb-1">
              Prestige Tier Status & Privileges
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#201A1A]">
              Five Tiers of Japanese Distinction
            </h2>
            <p className="text-sm text-[#574141] mt-1">
              Select any tier below to simulate tier credentials, perks, and card aesthetics.
            </p>
          </div>
          <button
            onClick={() => onNavigate('privileges')}
            className="text-xs font-semibold text-[#7A1520] hover:text-[#58000F] flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>Compare Full Privilege Matrix</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 5-Tier Cards Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(['bronze', 'silver', 'gold', 'platinum', 'diamond'] as TierLevel[]).map((tierKey) => {
            const tier = TIERS_DATA[tierKey];
            const isSelected = currentTier === tierKey;

            return (
              <div
                key={tierKey}
                onClick={() => onSelectTier(tierKey)}
                className={`relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white shadow-xl ring-2 ring-[#7A1520] border-[#7A1520] translate-y-[-2px]'
                    : 'bg-[#F7EDE8]/70 hover:bg-white border-[#EEDCD4] hover:shadow-md'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7A1520] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    Current Selection
                  </div>
                )}

                <div>
                  {/* Tier Badge / Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-2xs"
                      style={{ backgroundColor: tier.accentColor }}
                    >
                      {tier.name}
                    </span>
                    <span className="text-xs font-bold text-[#201A1A] tabular-nums">
                      {tier.spendDisplay}
                    </span>
                  </div>

                  {/* Micro Visual Card Preview */}
                  <div
                    className={`w-full aspect-[1.7/1] rounded-xl p-3 bg-gradient-to-br ${tier.gradient} border ${tier.cardFoil} shadow-sm text-white flex flex-col justify-between mb-3`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-serif text-[10px] font-bold">髙</span>
                      <span className="text-[8px] uppercase tracking-wider opacity-80">Takashimaya</span>
                    </div>
                    <div className="font-serif text-xs font-bold tracking-wide truncate">
                      {tier.name}
                    </div>
                  </div>

                  <p className="text-xs text-[#574141] line-clamp-2 mb-3">
                    {tier.summary}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-[#EEDCD4]">
                  {tier.privileges.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#201A1A]">
                      <Check className="w-3 h-3 text-[#7A1520] mt-0.5 shrink-0" />
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Signature Services Quad Grid */}
      <section className="space-y-6">
        <div>
          <div className="text-xs uppercase font-bold text-[#7A1520] tracking-wider mb-1">
            Department Store Signature Privileges
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#201A1A]">
            Curated Services Across Ngee Ann City
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: The Rose Lounge */}
          <div
            onClick={() => onNavigate('lounge')}
            className="group rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] p-6 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-4 group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#201A1A] group-hover:text-[#7A1520] transition-colors">
                The Rose VIP Lounge
              </h3>
              <p className="text-xs text-[#574141] mt-2 leading-relaxed">
                Level 3 serene retreat with handcrafted Kyoto tea ceremony, vintage champagne, and private fitting suites.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-[#7A1520]">
              <span>Reserve Suite Slot</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Depachika Gourmet */}
          <div
            onClick={() => onNavigate('depachika')}
            className="group rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] p-6 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-4 group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#201A1A] group-hover:text-[#7A1520] transition-colors">
                Depachika Food Hall
              </h3>
              <p className="text-xs text-[#574141] mt-2 leading-relaxed">
                Direct daily air-shipments of Shizuoka Crown Melons, Miyazaki A5 Wagyu, and Toraya wagashi confections.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-[#7A1520]">
              <span>Explore Delicacies</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Rewards & Vouchers */}
          <div
            onClick={() => onNavigate('vouchers')}
            className="group rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] p-6 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-4 group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#201A1A] group-hover:text-[#7A1520] transition-colors">
                Prestige Rewards Wallet
              </h3>
              <p className="text-xs text-[#574141] mt-2 leading-relaxed">
                Redeem your 18,450 Rose Points for S$100 dining vouchers, complimentary valet, and styling experiences.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-[#7A1520]">
              <span>Manage Vouchers</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4: Floor Directory */}
          <div
            onClick={() => onNavigate('directory')}
            className="group rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] p-6 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center mb-4 group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#201A1A] group-hover:text-[#7A1520] transition-colors">
                Store Floor Guide
              </h3>
              <p className="text-xs text-[#574141] mt-2 leading-relaxed">
                Interactive navigation across Basement 2 Food Hall up to Level 4 Japanese living salons and Kinokuniya.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-[#7A1520]">
              <span>View Floor Map</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
