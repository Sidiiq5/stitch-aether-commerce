"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemsCount = useCartStore((state) => state.getTotalItemsCount());
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "AUTH", path: "/auth" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-300 border-b",
        isScrolled
          ? "bg-surface/70 backdrop-blur-lg border-white/10 shadow-lg"
          : "bg-surface/30 backdrop-blur-md border-white/5"
      )}
    >
      {/* Brand logo & Hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="text-primary hover:text-primary/80 transition-colors cursor-pointer md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <Link href="/" className="group">
          <h1 className="font-sans text-[20px] font-bold tracking-[0.2em] text-on-surface uppercase select-none transition-colors duration-300 group-hover:text-primary">
            LUMINA
          </h1>
        </Link>
      </div>

      {/* Navigation list */}
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "font-mono text-[11px] font-medium tracking-widest relative py-1 transition-colors duration-300 select-none",
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Utility badges (Cart & Account) */}
      <div className="flex items-center gap-4">
        {/* Cart bag */}
        <button
          onClick={() => setCartOpen(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/20 text-primary transition-all duration-200 cursor-pointer relative active:scale-90"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-secondary text-on-primary text-[9px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(184,195,255,0.4)] animate-bounce">
              {cartItemsCount}
            </span>
          )}
        </button>

        {/* User profile */}
        <Link
          href="/dashboard"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/20 text-primary transition-all duration-200 cursor-pointer active:scale-90"
        >
          <User className="w-4 h-4" />
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
