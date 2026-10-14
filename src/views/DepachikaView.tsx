import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Check,
  Eye,
  X,
  Truck,
  Sparkles
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
    { id: 'all', label: 'All Items' },
    { id: 'depachika', label: 'Depachika Food' },
    { id: 'horlogerie', label: 'Horlogerie' },
    { id: 'beauty', label: 'Beauty' },
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
    <div className="space-y-4 pb-24 max-w-[430px] mx-auto px-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8A7170] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search melons, Wagyu, Swiss timepieces..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#EEDCD4] rounded-2xl text-xs text-[#201A1A] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#7A1520]/20"
        />
      </div>

      {/* Category Pills Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-xs'
                : 'bg-white text-[#574141] border-[#EEDCD4]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Air Flown Notice */}
      <div className="p-3 bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] flex items-center justify-between text-[11px] text-[#574141]">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#7A1520]" />
          <span>Same-day chilled island-wide delivery</span>
        </div>
        <button onClick={onOpenCart} className="font-bold text-[#7A1520] underline">
          Bag
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredProducts.map((product) => {
          const isAdded = addedNotice === product.id;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#EEDCD4] p-3 shadow-2xs flex gap-3 overflow-hidden active:bg-[#FDF9F6] transition-colors"
            >
              {/* Product Thumbnail */}
              <div
                className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F7EDE8] shrink-0 cursor-pointer"
                onClick={() => setQuickViewProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <span className="absolute top-1 left-1 bg-[#7A1520] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                    {product.tag.split(' ')[0]}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[9px] font-semibold text-[#8A7170] uppercase">
                      {product.floor}
                    </span>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="text-[#8A7170] hover:text-[#7A1520] p-0.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="font-serif text-xs font-bold text-[#201A1A] line-clamp-1 cursor-pointer hover:text-[#7A1520]"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-[#8A7170] line-clamp-1">{product.japaneseName}</p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif text-sm font-bold text-[#7A1520] tabular-nums">
                    S${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>

                  <button
                    onClick={() => handleAddWithFeedback(product)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-[#7A1520] text-white shadow-xs'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Bottom Sheet Quick View */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl border-t border-[#EEDCD4] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-[#DEBFBE] rounded-full mx-auto my-2.5" />

            <div className="relative aspect-[16/9] bg-[#F7EDE8]">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-[#201A1A] shadow-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#7A1520]">
                  {quickViewProduct.floor} · {quickViewProduct.origin}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#201A1A]">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-[#8A7170]">{quickViewProduct.japaneseName}</p>
              </div>

              <p className="text-xs text-[#574141] leading-relaxed">
                {quickViewProduct.description}
              </p>

              {quickViewProduct.spec && (
                <div className="p-3 bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] text-[11px] text-[#201A1A]">
                  <strong className="block text-[9px] uppercase tracking-wider text-[#8A7170]">
                    Specification
                  </strong>
                  <span>{quickViewProduct.spec}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#EEDCD4]">
                <div>
                  <span className="text-[10px] text-[#8A7170] block">Specialist Price</span>
                  <span className="font-serif text-lg font-bold text-[#7A1520] tabular-nums">
                    S${quickViewProduct.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddWithFeedback(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="px-5 py-2.5 bg-[#7A1520] text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
