"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { mockProducts, Product } from "@/utils/productsData";
import ProductCard from "@/components/ui/ProductCard";
import SearchBar from "@/components/ui/SearchBar";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories = ["All", "Wearables", "Optics", "Sound", "Neural", "Horology", "Accessories"];

  // Filter products when parameters update
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...mockProducts];

      // 1. Category filter
      if (selectedCategory !== "All") {
        result = result.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.subtitle.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      // 3. Sorting
      if (sortBy === "price-low") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-high") {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === "newest") {
        result.sort((a, b) => (a.tag === "New Release" || a.tag === "NEW" ? -1 : 1));
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 450); // micro-interaction loader delay

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1280px] mx-auto min-h-screen">
      
      {/* 1. Page Header */}
      <header className="mb-12 space-y-8">
        <div className="max-w-3xl">
          <SectionHeader
            title="Precision Aesthetics"
            italicTitle="for the Digital Vanguard"
            subtitle="A curated ecosystem of technical hardware, optical enhancements, and neural telemetry designed for those who navigate the intersection of luxury and high-performance."
            className="mb-0"
          />
        </div>

        {/* 2. Search, Filter, Sort Row */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between pt-4 border-t border-white/5">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <SearchBar onSearchChange={setSearchQuery} />
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container-low/60 border border-white/10 hover:border-primary/40 rounded-full px-6 py-4 font-mono text-[11px] tracking-widest outline-none text-on-surface-variant focus:ring-1 focus:ring-primary/20 transition-all uppercase cursor-pointer"
              >
                <option value="default">SORT VALUE: DEFAULT</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="newest">RELEASE: NEW ARTIFACTS</option>
              </select>
            </div>
          </div>

          {/* Category Chips scrollable row */}
          <div className="flex gap-3 overflow-x-auto pb-2 w-full lg:w-auto no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-full font-mono text-[11px] tracking-widest uppercase transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 border",
                    isSelected
                      ? "bg-primary/10 border-primary/40 text-primary shadow-[0_0_15px_rgba(184,195,255,0.15)]"
                      : "bg-surface-container-high/50 border-white/5 text-on-surface-variant hover:border-white/20"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. Product grid */}
      <main className="pb-16">
        {isLoading ? (
          /* Loading states Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LoadingSkeleton variant="card" />
            <LoadingSkeleton variant="card" />
            <LoadingSkeleton variant="card" />
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty states list */
          <div className="text-center py-24 glass-card rounded-3xl rim-light p-12 opacity-60">
            <SlidersHorizontal className="w-8 h-8 mx-auto text-outline mb-4" />
            <p className="font-mono text-[12px] tracking-widest text-outline uppercase">
              No matching artifacts located
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSortBy("default");
              }}
              className="mt-4 text-primary font-mono text-[11px] hover:underline uppercase tracking-widest cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Asymmetric Products Grid mapping */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              // Standard asymmetric offset: every second card in a 3-column grid is offset downwards by 12px
              const isAsymmetric = index % 3 === 1;

              return (
                <div key={product.id} className="flex justify-center">
                  <ProductCard product={product} asymmetric={isAsymmetric} />
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1280px] mx-auto min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

