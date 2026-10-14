import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, CheckCircle2 } from 'lucide-react';
import { DepachikaProduct, TierLevel } from '../types';

export interface CartItem {
  product: DepachikaProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentTier: TierLevel;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentTier,
}) => {
  const [furoshikiWrapping, setFuroshikiWrapping] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isDeliveryFree = subtotal > 100 || currentTier === 'platinum' || currentTier === 'diamond';
  const deliveryFee = isDeliveryFree ? 0 : 18.0;
  const grandTotal = subtotal + (cart.length > 0 ? deliveryFee : 0);

  const handleCheckout = () => {
    const orderNumber = `TK-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccess(orderNumber);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#201A1A]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8F7] border-l border-[#EEDCD4] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#EEDCD4] bg-[#F7EDE8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#7A1520] text-white flex items-center justify-center font-serif text-xs font-bold">
                髙
              </span>
              <h3 className="font-serif text-lg font-bold text-[#201A1A]">
                Concierge Shopping Bag
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#574141] hover:bg-[#EEDCD4]/70 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#201A1A]">
                  Omotenashi Order Received
                </h4>
                <div className="p-4 bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] text-xs space-y-1">
                  <p className="text-[#8A7170]">Order Confirmation Number:</p>
                  <p className="font-mono text-sm font-bold text-[#7A1520]">{orderSuccess}</p>
                </div>
                <p className="text-sm text-[#574141] max-w-xs mx-auto">
                  Our B2 Food Hall concierge is hand-selecting your items with signature Japanese chilled presentation.
                </p>
                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#F7EDE8] flex items-center justify-center text-[#8A7170]">
                  <Gift className="w-7 h-7" />
                </div>
                <p className="font-serif text-lg text-[#201A1A]">Your bag is currently empty</p>
                <p className="text-xs text-[#574141] max-w-xs mx-auto">
                  Explore fresh seasonal Japanese fruits, A5 Wagyu, and fine horlogerie from our Ginza collections.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-white rounded-xl border border-[#EEDCD4] flex gap-3 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-18 h-18 object-cover rounded-lg shrink-0 border border-[#EEDCD4]"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold text-[#201A1A] truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[#8A7170] hover:text-[#7A1520] p-0.5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-[#8A7170] truncate">{item.product.japaneseName}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-[#7A1520] tabular-nums">
                            S${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <div className="flex items-center gap-1.5 border border-[#EEDCD4] rounded-md px-1.5 py-0.5 bg-[#FFF8F7]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="text-[#574141] hover:text-[#7A1520] p-0.5 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-1 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="text-[#574141] hover:text-[#7A1520] p-0.5 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Packaging Option */}
                <div className="p-3.5 bg-[#F7EDE8] rounded-xl border border-[#EEDCD4] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#7A1520]" />
                      <span className="text-xs font-semibold text-[#201A1A]">
                        Signature Takashimaya Wrapping
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={furoshikiWrapping}
                        onChange={(e) => setFuroshikiWrapping(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#DEBFBE] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7A1520]"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#574141]">
                    Complimentary rose-pattern wrapping paper & silk ribbon with message card.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout */}
          {!orderSuccess && cart.length > 0 && (
            <div className="p-5 border-t border-[#EEDCD4] bg-[#F7EDE8] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#574141]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">S${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[#574141]">
                  <span>Chilled White-Glove Delivery</span>
                  <span>{isDeliveryFree ? <strong className="text-[#7A1520]">Complimentary (VIP)</strong> : `S$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#201A1A] pt-2 border-t border-[#EEDCD4]">
                  <span>Total Due</span>
                  <span className="text-[#7A1520] tabular-nums">
                    S${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-[#7A1520] hover:bg-[#8E1C27] active:bg-[#58000F] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Dispatch Concierge Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
