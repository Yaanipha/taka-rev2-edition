import React, { useState } from 'react';
import { MobileAppHeader } from './components/MobileAppHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MemberCardModal } from './components/MemberCardModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { MobileConciergeModal } from './components/MobileConciergeModal';
import { TiersView } from './views/TiersView';
import { LoungeBookingView } from './views/LoungeBookingView';
import { DepachikaView } from './views/DepachikaView';
import { PrivilegeMatrixView } from './views/PrivilegeMatrixView';
import { VouchersView } from './views/VouchersView';
import { DirectoryView } from './views/DirectoryView';
import { TierLevel, UserProfile, DepachikaProduct } from './types';
import { INITIAL_USER, TIERS_DATA, PRODUCTS_DATA } from './data/mockData';
import { Smartphone, Maximize2, Sparkles, CreditCard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tiers');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [currentTier, setCurrentTier] = useState<TierLevel>(INITIAL_USER.currentTier);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS_DATA[0], quantity: 1 }, // Shizuoka Crown Melon pre-added
  ]);

  // Handle tier switch
  const handleSelectTier = (tier: TierLevel) => {
    setCurrentTier(tier);
    const tierInfo = TIERS_DATA[tier];
    setUser((prev) => ({
      ...prev,
      currentTier: tier,
      annualSpend: Math.max(prev.annualSpend, tierInfo.minSpend),
    }));
  };

  // Add to cart
  const handleAddToCart = (product: DepachikaProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleDeductPoints = (pts: number) => {
    setUser((prev) => ({
      ...prev,
      rosePoints: Math.max(0, prev.rosePoints - pts),
    }));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#201A1A] text-[#201A1A] flex flex-col items-center justify-start sm:p-4 selection:bg-[#7A1520] selection:text-white">
      {/* Top Device Switcher Toolbar (Visible on Desktop / Tablet for testing) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-2 px-2 text-xs text-[#DEBFBE]">
        <div className="flex items-center gap-1.5 font-serif font-bold text-white">
          <span className="w-5 h-5 rounded-full bg-[#7A1520] text-white flex items-center justify-center text-[10px]">
            髙
          </span>
          <span>Takashimaya Mobile App</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors cursor-pointer"
            title="Toggle Smartphone Frame"
          >
            {deviceFrameMode ? (
              <>
                <Maximize2 className="w-3 h-3" />
                <span>Fullscreen</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3 h-3" />
                <span>Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile App Canvas Shell */}
      <div
        className={`w-full max-w-[430px] bg-[#FFF8F7] flex flex-col relative transition-all duration-300 ${
          deviceFrameMode
            ? 'sm:rounded-[48px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:border-[10px] sm:border-[#382F2F] sm:ring-1 sm:ring-white/20 min-h-[844px] sm:max-h-[920px] overflow-hidden'
            : 'min-h-screen'
        }`}
      >
        {/* Sticky Mobile App Bar (Native App Header + Status Bar) */}
        <MobileAppHeader
          currentTier={currentTier}
          cartCount={totalCartCount}
          onOpenPass={() => setIsPassModalOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          rosePoints={user.rosePoints}
        />

        {/* Scrollable Mobile App Views Container */}
        <div className="flex-1 overflow-y-auto pt-3">
          {activeTab === 'tiers' && (
            <TiersView
              user={user}
              currentTier={currentTier}
              onSelectTier={handleSelectTier}
              onOpenPass={() => setIsPassModalOpen(true)}
              onNavigate={(tab) => {
                setActiveTab(tab);
              }}
            />
          )}

          {activeTab === 'lounge' && (
            <LoungeBookingView
              currentTier={currentTier}
              userName={user.name}
              onOpenPass={() => setIsPassModalOpen(true)}
            />
          )}

          {activeTab === 'depachika' && (
            <DepachikaView
              onAddToCart={handleAddToCart}
              currentTier={currentTier}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {activeTab === 'privileges' && (
            <PrivilegeMatrixView
              currentTier={currentTier}
              onSelectTier={handleSelectTier}
              onOpenPass={() => setIsPassModalOpen(true)}
            />
          )}

          {activeTab === 'vouchers' && (
            <VouchersView
              rosePoints={user.rosePoints}
              onDeductPoints={handleDeductPoints}
              currentTier={currentTier}
              onOpenPass={() => setIsPassModalOpen(true)}
            />
          )}

          {activeTab === 'directory' && (
            <DirectoryView
              onNavigateLounge={() => setActiveTab('lounge')}
              onNavigateDepachika={() => setActiveTab('depachika')}
            />
          )}
        </div>

        {/* Floating Mascot Concierge Button (Rose-chan) */}
        <div className="fixed sm:absolute bottom-20 right-4 z-30">
          <button
            onClick={() => setIsConciergeOpen(true)}
            className="w-12 h-12 rounded-full p-0.5 bg-white border-2 border-[#7A1520] shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer relative group"
            aria-label="Ask Rose-chan Concierge"
          >
            <img
              src="/src/assets/images/mascot_rose_chan_concierge_1791943421781.jpg"
              alt="Rose-chan"
              className="w-full h-full object-cover object-top rounded-full"
            />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7A1520] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              1
            </span>
          </button>
        </div>

        {/* Fixed Mobile Bottom 5-Tab Navigation Bar */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
          }}
          cartCount={totalCartCount}
          onOpenPass={() => setIsPassModalOpen(true)}
        />

        {/* Smartphone Home Indicator Line at Bottom of Screen */}
        <div className="pointer-events-none absolute bottom-1 left-0 right-0 flex justify-center z-50">
          <div className="w-32 h-1 bg-stone-400/60 rounded-full" />
        </div>
      </div>

      {/* Digital Member Pass Modal (3D Apple Wallet style) */}
      <MemberCardModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        user={user}
        currentTier={currentTier}
        onSelectTier={handleSelectTier}
      />

      {/* Shopping Bag Drawer / Mobile Bottom Sheet */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentTier={currentTier}
      />

      {/* Rose-chan Mobile Concierge Sheet */}
      <MobileConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        userName={user.name}
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenPass={() => setIsPassModalOpen(true)}
      />
    </div>
  );
}
