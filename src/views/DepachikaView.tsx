import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Sparkles,
  Check,
  Eye,
  X,
  Truck,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { DepachikaProduct, TierLevel } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';

interface DepachikaViewProps {
  onAddToCart: (product: DepachikaProduct) => void;
  currentTier: TierLevel;
  onOpenCart: () => void;
}

export const DepachikaView: React.FC<DepachikaViewProps> = ({
  onAddToCart,
  currentTier,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<DepachikaProduct | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'depachika', label: 'Depachika Gourmet' },
    { id: 'horlogerie', label: 'Haute Horlogerie' },
    { id: 'beauty', label: 'Prestige Beauty' },
    { id: 'tea', label: 'Tea & Wagashi' },
  ];

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.japaneseName.includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddWithFeedback = (product: DepachikaProduct) => {
    onAddToCart(product);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Depachika Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#EEDCD4] bg-[#F7EDE8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1520] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#7A1520]" />
                <span>Basement 2 Food Hall & Prestige Salons</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#201A1A]">
                Depachika & Curated Boutiques
              </h1>
              <p className="text-sm text-[#574141] leading-relaxed max-w-xl">
                Experience the culinary theater and craftsmanship of Japan's legendary basement food halls. Rare Shizuoka Crown Melons, BMS 11 Miyazaki Wagyu, artisanal Kyoto confectionery, and Swiss haute horlogerie.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-[#574141]">
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#EEDCD4]">
                <Truck className="w-3.5 h-3.5 text-[#7A1520]" />
                <span>Chilled Same-Day Islandwide Delivery</span>
              </div>
              <button
                onClick={onOpenCart}
                className="text-[#7A1520] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Concierge Bag</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full">
            <img
              src="/src/assets/images/depachika_gourmet_selection_1791943420127.jpg"
              alt="Japanese depachika delicacies: Crown melon, wagashi, and matcha ceremony"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201A1A]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#F7EDE8] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-sm'
                  : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] text-[#574141] border-[#EEDCD4]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-[#8A7170] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search melons, wagyu, watches..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#EEDCD4] rounded-xl text-xs text-[#201A1A] focus:outline-none focus:ring-2 focus:ring-[#7A1520]/20"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isAdded = addedNotice === product.id;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-[#EEDCD4] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F7EDE8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-[#7A1520] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {product.tag}
                    </span>
                  )}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#201A1A] rounded-lg shadow-sm transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Quick View"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#8A7170]">
                    <span>{product.floor}</span>
                    <span>{product.origin.split(',')[0]}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#201A1A] group-hover:text-[#7A1520] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#8A7170] font-sans -mt-1">
                    {product.japaneseName}
                  </p>

                  <p className="text-xs text-[#574141] line-clamp-2 leading-relaxed pt-1">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="p-5 pt-0 border-t border-[#F7EDE8] flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] uppercase text-[#8A7170] block">Price</span>
                  <span className="font-serif text-base font-bold text-[#7A1520] tabular-nums">
                    S${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={() => handleAddWithFeedback(product)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-[#7A1520] hover:bg-[#8E1C27] text-white shadow-xs'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201A1A]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl border border-[#EEDCD4] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative aspect-[16/9] bg-[#F7EDE8]">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-[#201A1A] shadow-md transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#7A1520]">
                  {quickViewProduct.floor} · {quickViewProduct.origin}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#201A1A] mt-0.5">
                  {quickViewProduct.name}
                </h3>
                <p className="text-sm text-[#8A7170]">{quickViewProduct.japaneseName}</p>
              </div>

              <p className="text-sm text-[#574141] leading-relaxed">
                {quickViewProduct.description}
              </p>

              {quickViewProduct.spec && (
                <div className="p-3.5 bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] text-xs text-[#201A1A] space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[#8A7170] text-[10px]">
                    Curator Specifications & Lineage:
                  </span>
                  <p>{quickViewProduct.spec}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#EEDCD4]">
                <div>
                  <span className="text-xs text-[#8A7170] block">Specialist Price</span>
                  <span className="font-serif text-2xl font-bold text-[#7A1520] tabular-nums">
                    S${quickViewProduct.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddWithFeedback(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="px-6 py-2.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Concierge Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
