"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/utils/productsData";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  asymmetric?: boolean; // offset margins for custom layouts
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  asymmetric = false,
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useAuthStore((state) => state.toggleWishlist);
  const wishlist = useAuthStore((state) => state.user?.wishlist || []);
  const isWishlisted = wishlist.includes(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div
      className={cn(
        "glass-card rounded-[24px] overflow-hidden flex flex-col group/card w-full shadow-sm hover:glass-card-hover",
        asymmetric && "lg:mt-12",
        className
      )}
    >
      {/* Product Image Thumbnail */}
      <Link href={`/shop/${product.id}`} className="relative aspect-[4/5] overflow-hidden block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
        />

        {/* Floating Tags */}
        {product.tag && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full">
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-semibold">
              {product.tag}
            </span>
          </div>
        )}

        {/* Favorite wishlist toggle */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-md border border-white/5 hover:border-primary/40 text-on-surface-variant hover:text-secondary transition-all cursor-pointer z-10 hover:scale-105 active:scale-90"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted ? "fill-secondary text-secondary" : "text-on-surface-variant"
            )}
          />
        </button>
      </Link>

      {/* Info Content body */}
      <div className="p-6 md:p-8 flex flex-col gap-4">
        <Link href={`/shop/${product.id}`} className="flex justify-between items-start">
          <div className="min-w-0 pr-2">
            <h3 className="font-sans text-[16px] md:text-[18px] font-bold text-on-surface truncate group-hover/card:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="font-mono text-[10px] tracking-wider text-outline uppercase truncate">
              {product.subtitle}
            </p>
          </div>
          <span className="font-mono text-[14px] text-primary shrink-0 mt-0.5">
            {formatPrice(product.price)}
          </span>
        </Link>

        {/* Glowing divider line */}
        <div className="h-[1px] bg-white/5 w-full" />

        {/* Action Bottom selectors */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {/* Mock Swatches */}
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary border border-white/5 hover:border-primary text-on-surface-variant hover:text-on-primary transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(184,195,255,0)] hover:shadow-[0_0_15px_rgba(184,195,255,0.3)]"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
