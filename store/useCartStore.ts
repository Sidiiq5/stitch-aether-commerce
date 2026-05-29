import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/utils/productsData";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discountPercentage: number;
  isCartOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyPromoCode: (code: string) => boolean;
  clearPromoCode: () => void;
  clearCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  
  // Computed values
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountPercentage: 0,
      isCartOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            return { items: [...state.items, { product, quantity }] };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      applyPromoCode: (code: string) => {
        const uppercaseCode = code.toUpperCase().trim();
        if (uppercaseCode === "AETHER15") {
          set({ promoCode: "AETHER15", discountPercentage: 15 });
          return true;
        } else if (uppercaseCode === "LUMINA10") {
          set({ promoCode: "LUMINA10", discountPercentage: 10 });
          return true;
        }
        return false;
      },

      clearPromoCode: () => {
        set({ promoCode: null, discountPercentage: 0 });
      },

      clearCart: () => {
        set({ items: [], promoCode: null, discountPercentage: 0 });
      },

      setCartOpen: (isOpen: boolean) => {
        set({ isCartOpen: isOpen });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPercentage) / 100;
      },

      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal > 5000 ? 0 : 95; // Free shipping over $5000
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingCost();
        return subtotal - discount + shipping;
      },

      getTotalItemsCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "stitch-aether-cart-storage",
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discountPercentage: state.discountPercentage,
      }),
    }
  )
);
