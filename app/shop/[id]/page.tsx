"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, ShoppingBag, ArrowLeft, Plus, Minus, Star, ShieldAlert } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/utils/productsData";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const product = getProductById(id);

  // Zustand Store integrations
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useAuthStore((state) => state.toggleWishlist);
  const wishlist = useAuthStore((state) => state.user?.wishlist || []);
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  // Local state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartFeedback, setCartFeedback] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1280px] mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <GlassCard className="max-w-md p-10 opacity-70">
          <ShieldAlert className="w-12 h-12 text-error mx-auto mb-4" />
          <h2 className="font-sans text-[20px] font-bold uppercase tracking-wider text-on-surface mb-2">
            Artifact Not Located
          </h2>
          <p className="font-sans text-[13px] text-on-surface-variant font-light mb-6">
            The telemetry coordinate specifies a product that does not exist in our global registry databases.
          </p>
          <AnimatedButton variant="glass" onClick={() => router.push("/shop")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </AnimatedButton>
        </GlassCard>
      </div>
    );
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addItem(product, quantity);
    setCartFeedback(true);
    setTimeout(() => setCartFeedback(false), 2000);
  };

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1280px] mx-auto min-h-screen">
      {/* Back to catalog button */}
      <button
        onClick={() => router.push("/shop")}
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-on-surface-variant hover:text-primary mb-8 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        Back to Registry
      </button>

      {/* Main product specs section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Gallery and Selector */}
        <section className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden glass-card rim-light flex items-center justify-center p-4">
            <img
              src={product.images[activeImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
            />
            {product.tag && (
              <span className="absolute top-6 left-6 bg-primary/10 border border-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-primary font-mono text-[9px] uppercase tracking-widest font-semibold">
                {product.tag}
              </span>
            )}
          </div>

          {/* Gallery thumbnails mapping */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden glass-card border cursor-pointer hover:opacity-100 transition-all p-1 relative",
                    activeImageIndex === index
                      ? "border-primary/60 scale-95"
                      : "border-white/5 opacity-60"
                  )}
                >
                  <img src={img} alt="details" className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Pricing details, quantity increment, Specs block */}
        <section className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-24">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-0.5 rounded-full w-fit">
              {product.categoryLabel}
            </span>
            <h1 className="font-sans text-[32px] md:text-[42px] font-bold text-on-surface tracking-tighter uppercase leading-none mt-4">
              {product.name}
            </h1>
            <p className="font-sans text-[15px] text-on-surface-variant font-light leading-relaxed mt-4">
              {product.description}
            </p>
          </div>

          {/* Pricing valuation card */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden rim-light">
            <div className="flex justify-between items-end relative z-10">
              <div>
                <span className="font-mono text-[10px] text-outline tracking-wider block mb-1">
                  CURRENT VALUATION
                </span>
                <span className="font-mono text-[26px] md:text-[30px] font-bold text-on-surface tracking-tight leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  {formatPrice(product.price)}
                </span>
              </div>
              <span className="bg-tertiary/10 text-tertiary font-mono text-[9px] px-2.5 py-0.5 rounded border border-tertiary/20 font-bold uppercase tracking-widest">
                IN STOCK
              </span>
            </div>
          </div>

          {/* Quantity Counter and Actions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-widest uppercase text-on-surface">
                QUANTITY
              </span>
              
              <div className="flex items-center gap-4 bg-surface-container-high/60 px-4 py-2 rounded-full border border-white/5">
                <button
                  onClick={handleDecrement}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[12px] text-on-surface w-8 text-center">
                  {quantity.toString().padStart(2, "0")}
                </span>
                <button
                  onClick={handleIncrement}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="grid grid-cols-2 gap-4">
              <AnimatedButton
                variant="gradient"
                onClick={handleAddToCart}
                className="w-full"
              >
                {cartFeedback ? "ADDED TO BAG" : "ADD TO BAG"}
              </AnimatedButton>
              
              <button
                onClick={() => toggleWishlist(product.id)}
                className="glass-card py-4 px-8 rounded-full font-mono text-[11px] font-medium tracking-widest uppercase hover:border-primary/50 text-on-surface transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isWishlisted ? "fill-secondary text-secondary" : "text-on-surface"
                  )}
                />
                {isWishlisted ? "SAVED" : "SAVE"}
              </button>
            </div>
          </div>

          {/* Specification details spec block */}
          <div className="glass-card p-6 rounded-2xl rim-light space-y-4">
            <h3 className="font-mono text-[11px] text-primary tracking-widest uppercase font-semibold">
              SPECIFICATIONS
            </h3>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {product.specs.chassis && (
                <div>
                  <span className="font-mono text-[9px] text-outline uppercase block">CHASSIS</span>
                  <span className="font-sans text-[13px] text-on-surface font-light">{product.specs.chassis}</span>
                </div>
              )}
              {product.specs.optics && (
                <div>
                  <span className="font-mono text-[9px] text-outline uppercase block">OPTICS</span>
                  <span className="font-sans text-[13px] text-on-surface font-light">{product.specs.optics}</span>
                </div>
              )}
              {product.specs.network && (
                <div>
                  <span className="font-mono text-[9px] text-outline uppercase block">NETWORK LINK</span>
                  <span className="font-sans text-[13px] text-on-surface font-light">{product.specs.network}</span>
                </div>
              )}
              {product.specs.battery && (
                <div>
                  <span className="font-mono text-[9px] text-outline uppercase block">BATTERY LIFE</span>
                  <span className="font-sans text-[13px] text-on-surface font-light">{product.specs.battery}</span>
                </div>
              )}
              {product.specs.weight && (
                <div>
                  <span className="font-mono text-[9px] text-outline uppercase block">WEIGHT</span>
                  <span className="font-sans text-[13px] text-on-surface font-light">{product.specs.weight}</span>
                </div>
              )}
              {product.specs.edition && (
                <div>
                  <span className="font-mono text-[9px] text-outline uppercase block">EDITION</span>
                  <span className="font-mono text-[11px] text-secondary font-semibold">{product.specs.edition}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 4. Customer Reviews section */}
      <section className="mt-20 border-t border-white/5 pt-16">
        <SectionHeader title="Concierge Reviews" subtitle="Verified satisfaction logs received from the field." />
        
        {product.reviews.length === 0 ? (
          <p className="font-mono text-[12px] tracking-widest text-outline uppercase text-center py-12 glass-card rounded-2xl max-w-lg mx-auto rim-light">
            No reviews compiled yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <GlassCard key={rev.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-sans text-[14px] font-bold text-on-surface uppercase">
                      {rev.author}
                    </h4>
                    <span className="font-mono text-[10px] text-outline uppercase">
                      {rev.date}
                    </span>
                  </div>

                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3.5 h-3.5",
                          i < rev.rating ? "fill-primary text-primary" : "text-white/10"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <p className="font-sans text-[13px] text-on-surface-variant font-light leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      {/* 5. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <SectionHeader
            title="Related Artifacts"
            subtitle="Explore complementary hardware to complete your neural array."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
