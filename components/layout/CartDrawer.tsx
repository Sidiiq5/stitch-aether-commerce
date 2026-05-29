"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const promoCode = useCartStore((state) => state.promoCode);
  const discountPercentage = useCartStore((state) => state.discountPercentage);
  const applyPromoCode = useCartStore((state) => state.applyPromoCode);
  const clearPromoCode = useCartStore((state) => state.clearPromoCode);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getShippingCost = useCartStore((state) => state.getShippingCost);
  const getTotal = useCartStore((state) => state.getTotal);

  const addOrder = useAuthStore((state) => state.addOrder);
  const user = useAuthStore((state) => state.user);

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoMessage({ text: `Promo applied: ${discountPercentage}% Off!`, error: false });
      setPromoInput("");
    } else {
      setPromoMessage({ text: "Invalid luxury credentials.", error: true });
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    // Map cart items to order logs
    const orderItems = items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    addOrder(orderItems, getTotal());
    
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCartOpen(false);
      setCheckoutSuccess(false);
      setPromoMessage(null);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-100 flex justify-end">
          {/* Backdrop Blur exit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md bg-surface-container-lowest border-l border-white/10 h-full flex flex-col relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[18px] font-bold tracking-widest uppercase text-on-surface">
                  Shopping Bag
                </span>
                <span className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full font-bold">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Cart Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {checkoutSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-tertiary/10 border border-tertiary/30 text-tertiary flex items-center justify-center shadow-[0_0_20px_rgba(76,215,246,0.2)] animate-pulse">
                    ✓
                  </div>
                  <h3 className="font-sans text-[20px] font-bold uppercase tracking-wider text-on-surface">
                    Aether Confirmed
                  </h3>
                  <p className="font-sans text-[13px] text-on-surface-variant max-w-xs font-light">
                    Your luxury order has been dispatched into our concierge network. Awarded points are synchronized.
                  </p>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <p className="font-mono text-[12px] tracking-widest uppercase text-outline">
                    Bag is Empty
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="text-primary font-mono text-[11px] hover:underline uppercase tracking-widest"
                  >
                    View Artifacts
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="glass-card p-4 rounded-xl flex gap-4 border border-white/5 relative overflow-hidden group hover:border-white/10"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-high shrink-0 border border-white/5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-sans text-[14px] font-bold text-on-surface truncate">
                            {item.product.name}
                          </h4>
                          <p className="font-mono text-[10px] text-outline uppercase truncate">
                            {item.product.subtitle}
                          </p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-surface-container-high/60 px-3 py-1 rounded-full border border-white/5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-[11px] text-on-surface w-6 text-center">
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-[12px] text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/5 text-outline hover:text-error transition-colors cursor-pointer opacity-0 group-hover:opacity-100 duration-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer calculations & checkout actions */}
            {!checkoutSuccess && items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-surface/50 backdrop-blur-md space-y-6">
                {/* Promo Code input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="PROMO CODE (e.g. AETHER15)"
                    className="flex-1 bg-surface-container-low border border-white/5 focus:border-primary/40 rounded-full px-5 py-3 text-[11px] font-mono outline-none text-on-surface placeholder:text-outline/30 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-mono text-[11px] tracking-wider uppercase text-on-surface transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Promo Status alerts */}
                {promoMessage && (
                  <div
                    className={`text-[10px] font-mono px-4 py-2 rounded-lg border uppercase tracking-wider flex justify-between items-center ${
                      promoMessage.error
                        ? "bg-error/10 border-error/25 text-error"
                        : "bg-tertiary/10 border-tertiary/25 text-tertiary"
                    }`}
                  >
                    <span>{promoMessage.text}</span>
                    {!promoMessage.error && (
                      <button
                        onClick={clearPromoCode}
                        className="underline hover:text-white cursor-pointer ml-2"
                      >
                        REMOVE
                      </button>
                    )}
                  </div>
                )}

                {/* Financial overview */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] text-on-surface-variant">
                    <span>SUBTOTAL</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div className="flex justify-between font-mono text-[11px] text-tertiary">
                      <span>DISCOUNT ({discountPercentage}%)</span>
                      <span>-{formatPrice(getDiscountAmount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-mono text-[11px] text-on-surface-variant">
                    <span>SHIPPING SYSTEM</span>
                    <span>{getShippingCost() === 0 ? "FREE" : formatPrice(getShippingCost())}</span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[11px] font-bold text-on-surface">TOTAL VALUATION</span>
                    <span className="font-mono text-[18px] text-primary font-bold shadow-[0_0_15px_rgba(184,195,255,0.1)]">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <AnimatedButton
                  variant="gradient"
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3"
                >
                  Confirm Pre-Order <ArrowRight className="w-3.5 h-3.5" />
                </AnimatedButton>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
