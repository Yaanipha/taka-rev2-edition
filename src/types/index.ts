export type TierLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface TierInfo {
  id: TierLevel;
  name: string;
  minSpend: number;
  spendDisplay: string;
  badgeLabel: string;
  accentColor: string;
  gradient: string;
  textColor: string;
  borderStyle: string;
  cardFoil: string;
  summary: string;
  privileges: string[];
}

export interface UserProfile {
  name: string;
  memberId: string;
  currentTier: TierLevel;
  annualSpend: number;
  nextTierSpendTarget: number;
  rosePoints: number;
  memberSince: string;
  barcode: string;
}

export interface PrivilegeItem {
  id: string;
  category: string;
  name: string;
  description: string;
  tiers: Record<TierLevel, boolean | string>;
}

export interface DepachikaProduct {
  id: string;
  name: string;
  japaneseName: string;
  category: 'depachika' | 'horlogerie' | 'beauty' | 'tea';
  floor: string;
  price: number;
  origin: string;
  description: string;
  image: string;
  tag?: string;
  spec?: string;
}

export interface LoungeBooking {
  id: string;
  guestName: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  refreshment: 'ceremonial_matcha' | 'gyokuro_tea' | 'vintage_champagne' | 'seasonal_wagashi';
  privateFittingSuite: boolean;
  specialRequests?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
}

export interface Voucher {
  id: string;
  title: string;
  category: string;
  discountDisplay: string;
  expiryDate: string;
  terms: string;
  minTier: TierLevel;
  pointsCost: number;
  isClaimed: boolean;
  code: string;
}

export interface FloorInfo {
  level: string;
  japaneseTitle: string;
  englishTitle: string;
  highlights: string[];
  stores: {
    name: string;
    category: string;
    location: string;
    isVipPartner?: boolean;
  }[];
}
