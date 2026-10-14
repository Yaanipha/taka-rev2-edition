import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MemberCardModal } from './components/MemberCardModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { TiersView } from './views/TiersView';
import { LoungeBookingView } from './views/LoungeBookingView';
import { DepachikaView } from './views/DepachikaView';
import { PrivilegeMatrixView } from './views/PrivilegeMatrixView';
import { VouchersView } from './views/VouchersView';
import { DirectoryView } from './views/DirectoryView';
import { TierLevel, UserProfile, DepachikaProduct } from './types';
import { INITIAL_USER, TIERS_DATA, PRODUCTS_DATA } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tiers');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [currentTier, setCurrentTier] = useState<TierLevel>(INITIAL_USER.currentTier);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS_DATA[0], quantity: 1 }, // Shizuoka Crown Melon pre-added
  ]);

  // Handle tier switch (updates user spend targets and visual card)
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
    <div className="min-h-screen bg-[#FFF8F7] text-[#201A1A] flex flex-col font-sans selection:bg-[#7A1520] selection:text-white">
      {/* Top Bar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTier={currentTier}
        rosePoints={user.rosePoints}
        cartCount={totalCartCount}
        onOpenPass={() => setIsPassModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'tiers' && (
          <TiersView
            user={user}
            currentTier={currentTier}
            onSelectTier={handleSelectTier}
            onOpenPass={() => setIsPassModalOpen(true)}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
            onNavigateLounge={() => {
              setActiveTab('lounge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateDepachika={() => {
              setActiveTab('depachika');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPass={() => setIsPassModalOpen(true)}
      />

      {/* Digital Member Pass 3D Flip Modal */}
      <MemberCardModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        user={user}
        currentTier={currentTier}
        onSelectTier={handleSelectTier}
      />

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentTier={currentTier}
      />
    </div>
  );
}
