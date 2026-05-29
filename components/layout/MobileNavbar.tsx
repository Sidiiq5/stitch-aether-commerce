"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, LayoutDashboard, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

export const MobileNavbar: React.FC = () => {
  const pathname = usePathname();
  const cartItemsCount = useCartStore((state) => state.getTotalItemsCount());
  const setCartOpen = useCartStore((state) => state.setCartOpen);

  const items = [
    { name: "Home", path: "/", icon: Home },
    { name: "Shop", path: "/shop", icon: ShoppingBag },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center bg-surface-container-highest/60 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-[92%] max-w-md rounded-full px-6 py-3">
      {items.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-200 active:scale-90 relative",
              isActive ? "text-primary" : "text-outline hover:text-primary-fixed-dim"
            )}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="font-mono text-[9px] tracking-wider uppercase font-medium">{item.name}</span>
            {isActive && (
              <span className="absolute -bottom-1.5 w-1 h-1 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}

      {/* Cart button on mobile */}
      <button
        onClick={() => setCartOpen(true)}
        className="flex flex-col items-center justify-center text-outline hover:text-primary-fixed-dim transition-all duration-200 active:scale-90 relative cursor-pointer"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 mb-0.5" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-primary to-secondary text-on-primary text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg">
              {cartItemsCount}
            </span>
          )}
        </div>
        <span className="font-mono text-[9px] tracking-wider uppercase font-medium">Cart</span>
      </button>
    </nav>
  );
};
export default MobileNavbar;
