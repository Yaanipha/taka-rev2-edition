import { TierInfo, UserProfile, PrivilegeItem, DepachikaProduct, Voucher, FloorInfo } from '../types';

export const TIERS_DATA: Record<string, TierInfo> = {
  bronze: {
    id: 'bronze',
    name: 'Bronze Prestige',
    minSpend: 10000,
    spendDisplay: 'S$10,000',
    badgeLabel: 'BRONZE • S$10K',
    accentColor: '#B38E75',
    gradient: 'from-[#5C3A21] via-[#855333] to-[#B38E75]',
    textColor: '#FFF3EB',
    borderStyle: 'border-[#B38E75]/40',
    cardFoil: 'border-[#B38E75]',
    summary: 'A refined introduction to Ginza hospitality with preferential shopping privileges.',
    privileges: [
      '1.2× Rose Reward Points on all purchases',
      'Complimentary 1-Hour Valet Parking (Weekdays)',
      'Birthday Month 2× Points Bonus',
      'Access to Depachika Seasonal Pre-Orders',
      'Invitation to Annual Autumn Fair'
    ]
  },
  silver: {
    id: 'silver',
    name: 'Silver Prestige',
    minSpend: 20000,
    spendDisplay: 'S$20,000',
    badgeLabel: 'SILVER • S$20K',
    accentColor: '#9FA8A9',
    gradient: 'from-[#2F3538] via-[#525B60] to-[#9FA8A9]',
    textColor: '#F5F7F8',
    borderStyle: 'border-[#9FA8A9]/50',
    cardFoil: 'border-[#CAD2D4]',
    summary: 'Elevated department store services including complimentary gift wrapping and parcel delivery.',
    privileges: [
      '1.5× Rose Reward Points on luxury fashion & gourmet',
      'Complimentary 2-Hour Valet Parking daily',
      'Depachika Island-wide Chilled Delivery (Spend S$200+)',
      'Quarterly Takashimaya Journal delivery',
      'Invitations to Private Fashion Previews'
    ]
  },
  gold: {
    id: 'gold',
    name: 'Gold Prestige',
    minSpend: 100000,
    spendDisplay: 'S$100,000',
    badgeLabel: 'GOLD • S$100K',
    accentColor: '#D4AF37',
    gradient: 'from-[#3A2A07] via-[#7B5915] to-[#D4AF37]',
    textColor: '#FFF9E6',
    borderStyle: 'border-[#D4AF37]/60',
    cardFoil: 'border-[#F3DF88]',
    summary: 'Unrestricted access to The Rose Lounge Level 3, priority personal shopping, and gold tier hospitality.',
    privileges: [
      '2.0× Rose Reward Points across all boutiques & salons',
      'Unlimited Complimentary Valet Parking at Ngee Ann City',
      'Access to The Rose VIP Lounge (Level 3) with +1 Guest',
      'Complimentary Japanese Tea Ceremony & Wagashi in Lounge',
      'Dedicated Personal Shopping Concierge by appointment',
      'Curated Mid-Autumn & Chinese New Year Hamper Gift'
    ]
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum Prestige',
    minSpend: 300000,
    spendDisplay: 'S$300,000',
    badgeLabel: 'PLATINUM • S$300K',
    accentColor: '#4A5568',
    gradient: 'from-[#0F1216] via-[#1E2228] to-[#3B424D]',
    textColor: '#F8FAFC',
    borderStyle: 'border-[#818C9C]/60',
    cardFoil: 'border-[#E2E8F0]',
    summary: 'Obsidian-grade bespoke service, private in-suite styling, and Tokyo Ginza VIP reciprocity.',
    privileges: [
      '3.0× Rose Reward Points on all fine jewellery & watches',
      'Private Fitting Suite reservation with Champagne service',
      'Global Takashimaya VIP Reciprocity (Tokyo Nihombashi, Shinjuku, Kyoto, Osaka)',
      'Priority allocation for rare Japanese seasonal fruits (Crown Melons, White Strawberries)',
      'Direct WhatsApp Concierge Line with Master Stylist',
      'Complimentary Annual Oseibo New Year Box direct from Kyoto'
    ]
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond Celestial',
    minSpend: 500000,
    spendDisplay: 'S$500,000',
    badgeLabel: 'DIAMOND • S$500K',
    accentColor: '#88A9C3',
    gradient: 'from-[#101D2B] via-[#223B52] to-[#88A9C3]',
    textColor: '#F0F7FF',
    borderStyle: 'border-[#B2D5F0]/80',
    cardFoil: 'border-[#E2F0FD]',
    summary: 'The pinnacle of Japanese department store prestige with bespoke haute horlogerie acquisitions and bespoke dining.',
    privileges: [
      '4.0× Rose Reward Points without expiration',
      'Bespoke Omotenashi Butler Service throughout Ngee Ann City',
      'Private after-hours shopping appointments upon request',
      'Guaranteed VIP reservation at Michelin-starred depachika residencies',
      'Chauffeured Mercedes Maybach transfer within Singapore on shopping days',
      'Annual Private Kaiseki Dinner for 4 at Shima or Tonkichi Prestige Suite'
    ]
  }
};

export const INITIAL_USER: UserProfile = {
  name: 'Lady Vivienne Tan',
  memberId: 'TK-8829-4109',
  currentTier: 'gold',
  annualSpend: 142500,
  nextTierSpendTarget: 300000,
  rosePoints: 18450,
  memberSince: 'October 2018',
  barcode: '988294109012'
};

export const PRIVILEGES_DATA: PrivilegeItem[] = [
  {
    id: 'valet',
    category: 'Arrival & Valet',
    name: 'Complimentary Valet Parking',
    description: 'Bespoke drive-in valet at Ngee Ann City Orchard Road main porte-cochère.',
    tiers: {
      bronze: '1 Hour (Weekdays)',
      silver: '2 Hours Daily',
      gold: 'Unlimited Daily',
      platinum: 'Unlimited + Reserved Bay',
      diamond: 'Guaranteed Priority Bay'
    }
  },
  {
    id: 'lounge',
    category: 'Omotenashi Hospitality',
    name: 'The Rose Lounge Access (Level 3)',
    description: 'Serene Japanese retreat offering complimentary refreshments, Wi-Fi, and private restrooms.',
    tiers: {
      bronze: false,
      silver: '2 Passes / Year',
      gold: 'Unlimited + 1 Guest',
      platinum: 'Unlimited + 2 Guests',
      diamond: 'Private VIP Salon Suite'
    }
  },
  {
    id: 'tea_service',
    category: 'Omotenashi Hospitality',
    name: 'Complimentary Tea Ceremony & Wagashi',
    description: 'Authentic Uji ceremonial matcha and freshly flown seasonal wagashi from Kyoto Toraya.',
    tiers: {
      bronze: false,
      silver: false,
      gold: 'Complimentary per visit',
      platinum: 'Matcha + Vintage Champagne',
      diamond: 'Imperial Kaiseki Tasting'
    }
  },
  {
    id: 'personal_shopper',
    category: 'Concierge & Styling',
    name: 'Personal Shopping Concierge',
    description: 'Curated wardrobe curation, watch acquisitions, and personalized department previews.',
    tiers: {
      bronze: false,
      silver: 'By appointment (Fee waived)',
      gold: 'Dedicated Concierge',
      platinum: 'Senior Stylist + Fitting Suite',
      diamond: 'Head of VIP Private Client'
    }
  },
  {
    id: 'depachika_delivery',
    category: 'Depachika & Gourmet',
    name: 'Priority Temperature-Controlled Delivery',
    description: 'Same-day chilled island-wide delivery of rare seasonal Japanese meats, fruits, and sashimi.',
    tiers: {
      bronze: 'Orders > S$300',
      silver: 'Orders > S$200',
      gold: 'Orders > S$100',
      platinum: 'Complimentary on any order',
      diamond: 'Immediate Chauffeur Delivery'
    }
  },
  {
    id: 'points_multiplier',
    category: 'Loyalty & Rewards',
    name: 'Rose Reward Points Multiplier',
    description: 'Accumulate points redeemable for gift vouchers, depachika indulgences, and parking credits.',
    tiers: {
      bronze: '1.2× Points',
      silver: '1.5× Points',
      gold: '2.0× Points',
      platinum: '3.0× Points',
      diamond: '4.0× Points (No Expiry)'
    }
  },
  {
    id: 'global_reciprocity',
    category: 'Global Privileges',
    name: 'Takashimaya Japan VIP Reciprocity',
    description: 'VIP lounge access and 5% shopping privilege at Nihombashi, Shinjuku, Kyoto, and Osaka stores.',
    tiers: {
      bronze: false,
      silver: false,
      gold: 'Nihombashi & Shinjuku',
      platinum: 'All Japan Flagships',
      diamond: 'Global Concierge Host in Tokyo'
    }
  },
  {
    id: 'anniversary_gift',
    category: 'Bespoke Recognitions',
    name: 'Annual Oseibo & Anniversary Hamper',
    description: 'A handcrafted gift box flown from Japan in commemoration of your patron milestone.',
    tiers: {
      bronze: false,
      silver: false,
      gold: 'Gourmet Tea & Confection Set',
      platinum: 'Kyoto Lacquerware Gift Box',
      diamond: 'Custom Ceramic Art by Master Potter'
    }
  }
];

export const PRODUCTS_DATA: DepachikaProduct[] = [
  {
    id: 'melon-crown',
    name: 'Shizuoka Crown Musk Melon',
    japaneseName: '静岡クラウンメロン (木箱入)',
    category: 'depachika',
    floor: 'Basement 2 Food Hall',
    price: 188.00,
    origin: 'Shizuoka Prefecture, Japan',
    description: 'Cultivated under the strict "one fruit per tree" traditional greenhouse regime. Encased in an artisanal paulownia wood presentation gift box with silk knot ribbon.',
    image: '/src/assets/images/depachika_gourmet_selection_1791943420127.jpg',
    tag: 'Seasonal Air Flown',
    spec: 'Approx. 1.4kg · Sugar Content ≥ 14° Brix'
  },
  {
    id: 'horlogerie-royal-oak',
    name: 'Ginza Salon Haute Horlogerie Timepiece',
    japaneseName: '高島屋 銀座サロン 特選時計',
    category: 'horlogerie',
    floor: 'Level 2 Fine Watch & Jewellery',
    price: 48500.00,
    origin: 'Le Brassus, Switzerland / Takashimaya Salon',
    description: 'Self-winding manufacture calibre with grand tapisserie dial in 18-carat warm pink gold. Accompanied by handcrafted Japanese urushi maki-e presentation box.',
    image: '/src/assets/images/luxury_boutique_timepiece_1791943420747.jpg',
    tag: 'VIP Allocation',
    spec: '41mm · 18K Pink Gold · 70-Hour Power Reserve'
  },
  {
    id: 'lounge-tea-experience',
    name: 'The Rose Lounge Imperial Tea Set',
    japaneseName: 'ローズラウンジ 特選宇治抹茶・和菓子膳',
    category: 'tea',
    floor: 'Level 3 The Rose Lounge',
    price: 68.00,
    origin: 'Uji, Kyoto, Japan',
    description: 'Hand-whisked single-estate ceremonial matcha paired with four seasonal hand-carved nerikiri wagashi crafted by Toraya master confectionery artisans.',
    image: '/src/assets/images/vip_lounge_omotenashi_1791943420736.jpg',
    tag: 'Prestige Member Perk',
    spec: 'Complimentary for Gold, Platinum & Diamond Tiers'
  },
  {
    id: 'wagyu-miyazaki-a5',
    name: 'Miyazaki Wagyu A5 Ribeye Steak Cut',
    japaneseName: '宮崎牛 A5 サーロイン・リブ',
    category: 'depachika',
    floor: 'Basement 2 Fresh Depachika',
    price: 145.00,
    origin: 'Miyazaki Prefecture, Japan',
    description: 'Award-winning Japanese Prime Wagyu with exquisite snowflake BMS 11 marbling, resulting in an unctuous, melt-on-the-palate umami depth.',
    image: '/src/assets/images/depachika_gourmet_selection_1791943420127.jpg',
    tag: 'Chilled Daily Air Shipment',
    spec: '300g Cut · Certificate of Lineage Included'
  },
  {
    id: 'shiseido-future-lx',
    name: 'Future Solution LX Legendary Enmei Cream',
    japaneseName: 'フューチャーソリューション LX 延命草クリーム',
    category: 'beauty',
    floor: 'Level 1 Prestige Cosmetics',
    price: 690.00,
    origin: 'Tokyo Ginza, Japan',
    description: 'Formulated with the rare Enmei herb hand-harvested at the sacred foot of Mount Koya. Delivers unparalleled radiance and sublime epidermal replenishment.',
    image: '/src/assets/images/hero_ginza_orchard_store_1791943420377.jpg',
    tag: 'Omotenashi Skin Ritual',
    spec: '50ml · Custom Porcelain Spatula Included'
  },
  {
    id: 'toraya-kyoto-yokan',
    name: 'Toraya Kyoto Heritage Yokan Collection',
    japaneseName: '虎屋 京都老舗特製 羊羹詰合せ',
    category: 'tea',
    floor: 'Basement 2 Japanese Confectionery',
    price: 92.00,
    origin: 'Kyoto, Japan (Since 1501)',
    description: 'Refined adzuki bean paste confectionery with five-century imperial purveyor heritage. Presented in traditional washi paper wrapper.',
    image: '/src/assets/images/depachika_gourmet_selection_1791943420127.jpg',
    tag: 'Imperial Purveyor',
    spec: '10 Individually Wrapped Assorted Bars'
  }
];

export const VOUCHERS_DATA: Voucher[] = [
  {
    id: 'vouch-1',
    title: 'S$100 Depachika Gourmet Dining Voucher',
    category: 'Basement 2 Food Hall',
    discountDisplay: 'S$100 OFF',
    expiryDate: '30 Nov 2026',
    terms: 'Valid at B2 gourmet butcher, fresh seafood, and Japanese fruit stands with minimum spend of S$150.',
    minTier: 'bronze',
    pointsCost: 2500,
    isClaimed: true,
    code: 'DEP-100-8829'
  },
  {
    id: 'vouch-2',
    title: '2-Hour Complimentary Valet Pass',
    category: 'Arrival & Services',
    discountDisplay: 'COMPLIMENTARY',
    expiryDate: '31 Dec 2026',
    terms: 'Present at Orchard Road valet booth upon vehicle retrieval. Applicable daily.',
    minTier: 'bronze',
    pointsCost: 800,
    isClaimed: true,
    code: 'VAL-002-3914'
  },
  {
    id: 'vouch-3',
    title: 'Rose Lounge Vintage Champagne Pairing for Two',
    category: 'Level 3 VIP Lounge',
    discountDisplay: '2 FLUTES CHAMPAGNE',
    expiryDate: '15 Jan 2027',
    terms: 'Enjoy two glasses of Henriot Souverain Brut with seasonal canapés during your visit to The Rose Lounge.',
    minTier: 'gold',
    pointsCost: 4000,
    isClaimed: false,
    code: 'CHAMP-882-VIP'
  },
  {
    id: 'vouch-4',
    title: 'Private Styling & Wardrobe Consultation',
    category: 'Level 2 & 3 Designer Salons',
    discountDisplay: '90 MIN SESSION',
    expiryDate: '31 Mar 2027',
    terms: 'Dedicated session with Senior Fashion Director in the private VIP fitting suite.',
    minTier: 'platinum',
    pointsCost: 6500,
    isClaimed: false,
    code: 'STYLE-90-VIP'
  }
];

export const FLOORS_DATA: FloorInfo[] = [
  {
    level: 'B2',
    japaneseTitle: 'デパ地下 食品銘店街',
    englishTitle: 'Food Village & Depachika Gourmet',
    highlights: ['Artisanal Japanese Bakeries', 'Fresh Seasonal Fruits', 'Miyazaki Wagyu Butcher', 'Royce Chocolate & Toraya', 'Sake Cellar'],
    stores: [
      { name: 'Takashimaya Fresh Market', category: 'Seasonal Produce & Seafood', location: 'B2 Central', isVipPartner: true },
      { name: 'Toraya Kyoto Sweets', category: 'Japanese Confectionery', location: 'B2-04' },
      { name: 'Sake & Whisky Cellar', category: 'Fine Spirits', location: 'B2-12', isVipPartner: true },
      { name: 'St. Leaven Bakery', category: 'Japanese Artisan Bakery', location: 'B2-20' },
      { name: 'Donq French Bakery', category: 'Bakery', location: 'B2-18' }
    ]
  },
  {
    level: 'B1',
    japaneseTitle: '化粧品・服飾雑貨',
    englishTitle: 'Beauty Sanctuary & Fashion Accessories',
    highlights: ['International Cosmetics', 'Fine Fragrances', 'Leather Handbags', 'Shoe Salon'],
    stores: [
      { name: 'Shiseido Ginza Flagship', category: 'Cosmetics & Skincare', location: 'B1-02', isVipPartner: true },
      { name: 'Clé de Peau Beauté', category: 'Luxury Skincare', location: 'B1-06', isVipPartner: true },
      { name: 'Jo Malone London', category: 'Fragrances', location: 'B1-14' },
      { name: 'Takashimaya Shoe Salon', category: 'Footwear', location: 'B1 South Atrium' }
    ]
  },
  {
    level: 'L1',
    japaneseTitle: '国際高級ブランド・特選時計',
    englishTitle: 'International Luxury & Haute Horlogerie',
    highlights: ['Global Fashion Houses', 'Fine Jewellery Salons', 'Grand Porte-Cochère Valet'],
    stores: [
      { name: 'Chanel Boutique', category: 'High Fashion & Fine Jewellery', location: 'L1-01', isVipPartner: true },
      { name: 'Hermès', category: 'Leather & Silk', location: 'L1-03', isVipPartner: true },
      { name: 'Cartier', category: 'Jewellery & Watches', location: 'L1-08', isVipPartner: true },
      { name: 'Takashimaya Watch Salon', category: 'Swiss Timepieces', location: 'L1 North Atrium', isVipPartner: true }
    ]
  },
  {
    level: 'L2',
    japaneseTitle: '婦人服・サロン ド テ',
    englishTitle: 'Ladies Elegance & Tea Salons',
    highlights: ['Designer Apparel', 'Lingerie Atelier', 'Paul Café', 'Harrods Tea Room'],
    stores: [
      { name: 'Issey Miyake', category: 'Designer Fashion', location: 'L2-10', isVipPartner: true },
      { name: 'Max Mara', category: 'Italian Luxury', location: 'L2-14' },
      { name: 'Takashimaya Cashmere Studio', category: 'Knitwear & Stoles', location: 'L2-22' },
      { name: 'Ladurée Tea Salon', category: 'French Patisserie', location: 'L2-30' }
    ]
  },
  {
    level: 'L3',
    japaneseTitle: 'ローズラウンジ・紳士服・コンシェルジュ',
    englishTitle: 'The Rose VIP Lounge & Men\'s Collection',
    highlights: ['The Rose VIP Lounge', 'VIP Concierge Desk', 'Bespoke Tailoring', 'Golf Specialty'],
    stores: [
      { name: 'The Rose Lounge (Level 3)', category: 'Prestige VIP Lounge', location: 'L3-VIP Suite', isVipPartner: true },
      { name: 'VIP Concierge & Personal Shopper Desk', category: 'Guest Services', location: 'L3 North', isVipPartner: true },
      { name: 'Ermenegildo Zegna', category: 'Italian Sartorial', location: 'L3-08', isVipPartner: true },
      { name: 'Takashimaya Golf Salon', category: 'Luxury Golf', location: 'L3-25' }
    ]
  },
  {
    level: 'L4',
    japaneseTitle: 'リビング・文化サロン・紀伊國屋',
    englishTitle: 'Living, Children & Books Kinokuniya',
    highlights: ['Japanese Ceramics & Lacquer', 'Tableware', 'Children’s Boutique', 'Kinokuniya Books'],
    stores: [
      { name: 'Books Kinokuniya Main Store', category: 'Literature & Stationery', location: 'L4-01' },
      { name: 'Nippon Craft & Ceramic Atelier', category: 'Traditional Crafts', location: 'L4-12', isVipPartner: true },
      { name: 'Noritake & Wedgwood Porcelain', category: 'Tableware', location: 'L4-18' },
      { name: 'Takashimaya Baby & Kids', category: 'Childrenswear', location: 'L4-26' }
    ]
  }
];

export const ROSE_CHAN_QUOTES = [
  "Irasshaimase! Welcome to Takashimaya Singapore. May your visit be filled with warmth and omotenashi elegance.",
  "Did you know? As a Gold Prestige Member, your complimentary tea service at The Rose Lounge (Level 3) awaits you anytime today.",
  "Our freshly air-flown Shizuoka Crown Melons have just arrived at B2 Depachika! Would you like me to hold one for you?",
  "You are only S$157,500 away from reaching Platinum Prestige, which unlocks our Tokyo Ginza VIP reciprocity!",
  "Take advantage of your complimentary valet parking at the Ngee Ann City porte-cochère whenever you join us."
];
