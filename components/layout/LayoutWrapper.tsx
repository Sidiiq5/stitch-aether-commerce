"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";
import CartDrawer from "./CartDrawer";
import GradientBackground from "@/components/ui/GradientBackground";
import { X, Home, ShoppingBag, LayoutDashboard, LogIn } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const mobileLinks = [
    { name: "Home Page", path: "/", icon: Home },
    { name: "Products Catalog", path: "/shop", icon: ShoppingBag },
    { name: "Julian's Concierge", path: "/dashboard", icon: LayoutDashboard },
    { name: "Auth Panel", path: "/auth", icon: LogIn },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Dynamic ambient moving gradient glow behind pages */}
      <GradientBackground />

      {/* Floating Navbar */}
      <Navbar onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      {/* Global sliding cart drawer */}
      <CartDrawer />

      {/* Mobile Hamburger Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-110 md:hidden">
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleMobileMenuClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Sliding Left menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-surface border-r border-white/5 p-6 flex flex-col justify-between z-10 shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="font-sans text-[18px] font-bold tracking-[0.2em] text-primary uppercase">
                    LUMINA
                  </h2>
                  <button
                    onClick={handleMobileMenuClose}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {mobileLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={handleMobileMenuClose}
                        className="flex items-center gap-4 px-6 py-4 rounded-full text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="font-mono text-[11px] tracking-widest uppercase font-medium">
                          {link.name}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Concierge metadata section */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 rim-light">
                <p className="font-mono text-[10px] text-tertiary tracking-widest uppercase mb-1">
                  SECURITY MATRIX
                </p>
                <p className="font-sans text-[12px] text-on-surface-variant font-light leading-relaxed">
                  Lumina secure session verified. AES-256 luxury standard telemetry active.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Pages Content body */}
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>

      {/* Global Desktop/Tablet Footer */}
      <Footer />

      {/* Mobile Floating Bottom Bar */}
      <MobileNavbar />
    </div>
  );
};
export default LayoutWrapper;
