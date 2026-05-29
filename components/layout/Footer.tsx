"use client";

import React from "react";
import Link from "next/link";
import { Globe, Share2, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    collections: [
      { name: "Core Series", href: "/shop?category=Wearables" },
      { name: "Elite Chronos", href: "/shop?category=Horology" },
      { name: "Limited Heritage", href: "/shop?category=Neural" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
    support: [
      { name: "Concierge Matrix", href: "/dashboard" },
      { name: "Shipping System", href: "#" },
      { name: "Sustainability", href: "#" },
    ],
  };

  return (
    <footer className="w-full bg-surface-container-lowest/80 border-t border-outline-variant/30 py-16 px-6 md:px-12 relative z-10">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand details */}
        <div className="space-y-6 max-w-xs">
          <h2 className="font-sans text-[22px] font-bold tracking-[0.22em] text-on-surface uppercase">
            LUMINA
          </h2>
          <p className="font-sans text-[13px] text-on-surface-variant font-light leading-relaxed">
            Defining the standard of excellence through technological innovation and timeless aesthetics since 2024.
          </p>
          <div className="flex gap-4">
            <button className="w-8 h-8 rounded-full border border-white/5 bg-white/5 hover:bg-primary hover:text-on-primary text-on-surface-variant transition-all duration-300 flex items-center justify-center cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-full border border-white/5 bg-white/5 hover:bg-primary hover:text-on-primary text-on-surface-variant transition-all duration-300 flex items-center justify-center cursor-pointer">
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-full border border-white/5 bg-white/5 hover:bg-primary hover:text-on-primary text-on-surface-variant transition-all duration-300 flex items-center justify-center cursor-pointer">
              <Mail className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div className="space-y-4">
            <p className="font-mono text-[11px] tracking-widest text-on-surface font-bold uppercase">
              Collections
            </p>
            <ul className="space-y-2 font-sans text-[13px] text-on-surface-variant font-light">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <p className="font-mono text-[11px] tracking-widest text-on-surface font-bold uppercase">
              Legal
            </p>
            <ul className="space-y-2 font-sans text-[13px] text-on-surface-variant font-light">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[11px] tracking-widest text-on-surface font-bold uppercase">
              Support
            </p>
            <ul className="space-y-2 font-sans text-[13px] text-on-surface-variant font-light">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copy sub-footer */}
      <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[10px] text-on-surface-variant tracking-[0.15em] uppercase font-light">
          © {currentYear} LUMINA LUXURY. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8">
          <Link href="/shop" className="font-mono text-[10px] text-on-surface-variant hover:text-on-surface tracking-widest uppercase transition-colors">
            Heritage
          </Link>
          <span className="font-mono text-[10px] text-on-surface-variant select-none opacity-30">|</span>
          <span className="font-mono text-[10px] text-on-surface-variant hover:text-on-surface tracking-widest uppercase cursor-pointer transition-colors">
            Boutiques
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
