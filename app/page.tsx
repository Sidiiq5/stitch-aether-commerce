"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ShieldCheck, Globe, Leaf, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { mockProducts } from "@/utils/productsData";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import ProductCard from "@/components/ui/ProductCard";
import FloatingPanel from "@/components/ui/FloatingPanel";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Mouse hover tilt physics variables for the Hero Wristwatch Image
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Constrain tilt rotation max 12 degrees
    x.set((mouseX / (width / 2)) * 12);
    y.set(-(mouseY / (height / 2)) * 12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Carousel controls
  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 340; // Card width (320px) + gutter (20px)
    const currentScroll = carouselRef.current.scrollLeft;
    carouselRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  };

  // Newsletter state
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  // Filter 4 showcase products
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div ref={containerRef} className="pt-24 pb-16 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[calc(100vh-96px)] flex items-center justify-center px-6 md:px-12 py-12">
        <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7 space-y-8 z-10"
          >
            {/* Pulsing indicator tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-primary uppercase font-medium">
                Limited Edition Release
              </span>
            </div>

            <h2 className="font-sans text-[42px] md:text-[64px] font-bold tracking-tighter uppercase leading-[1.05]">
              THE FUTURE <br /> OF <span className="text-primary italic font-normal tracking-normal font-sans">LUXURY</span>
            </h2>

            <p className="font-sans text-[15px] md:text-[18px] text-on-surface-variant max-w-xl font-light leading-relaxed">
              A seamless fusion of artisanal craftsmanship and hyper-technical precision. Redefining the boundaries of high-end horology for the digital age.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <AnimatedButton variant="gradient" size="lg" asChild>
                <Link href="/shop/eclipse-chronograph">Pre-Order Now</Link>
              </AnimatedButton>
              <AnimatedButton variant="glass" size="lg" asChild>
                <Link href="/shop">View Collection</Link>
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Hero product showcase image (Interactive tilt canvas) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative mt-12 lg:mt-0 flex items-center justify-center cursor-grab"
          >
            <div className="relative w-full max-w-[420px] aspect-square group">
              {/* Floating bouncy panels */}
              <FloatingPanel className="absolute -top-4 -right-4 z-20" bounceY={8} duration={3}>
                <p className="font-mono text-[10px] text-primary tracking-wider font-semibold">PRECISION</p>
                <p className="font-sans text-[22px] font-bold text-on-surface leading-none mt-1">99.9%</p>
              </FloatingPanel>

              <FloatingPanel className="absolute -bottom-6 -left-6 z-20 hidden md:block" bounceY={10} duration={4.5} delay={1}>
                <p className="font-sans text-[11px] text-on-surface-variant font-light mb-2">Current Demand</p>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[85%] rounded-full shadow-[0_0_8px_var(--color-secondary)]" />
                </div>
              </FloatingPanel>

              {/* Central high-res watch graphic */}
              <motion.div
                style={{
                  rotateX: springY,
                  rotateY: springX,
                  transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative rounded-[32px] overflow-hidden glass-card rim-light p-4 flex items-center justify-center transition-shadow duration-500 group-hover:shadow-[0_25px_60px_-15px_rgba(184,195,255,0.15)]"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2y6jivBQQ_cy3uRA2YwXnOyJNxlTsBETYD7jcRp8xXwZETk1Wc4QidhSjeRPlz7Mccw1A2WpNEbcwvyIKrGFL6pHgZmOCiMotPNWp1OlkUV8OpkEGgarR6T33OVmreYeOf7p_0dgpfTtyyjuQDsWOq6GPfMh0jVM6xD_nem3j_UM0yPzi2iItg_eqd6UqgZRpH9aQiC9hzoxRjyxq_mmksxt-f-jm--Z-ocL_HyXJC3wpUFoEpyjiCwBmSUdf7phzKahHuN9-dg"
                  alt="Lumina Chronograph"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Trust Statistics Bento Grid Row */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Patents */}
            <GlassCard hoverLift className="flex flex-col justify-between min-h-[200px]">
              <ShieldCheck className="w-8 h-8 text-primary mb-4" />
              <div>
                <p className="font-sans text-[36px] font-bold text-primary tracking-tight leading-none mb-2">125+</p>
                <p className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase font-medium">Design Patents</p>
              </div>
            </GlassCard>

            {/* Reach Double-wide */}
            <GlassCard hoverLift className="md:col-span-2 flex flex-col justify-between min-h-[200px] group/card">
              <div className="flex justify-between items-start">
                <Globe className="w-8 h-8 text-secondary" />
                <span className="font-mono text-[9px] bg-secondary/10 border border-secondary/20 text-secondary px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  GLOBAL
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-sans text-[22px] font-bold text-on-surface tracking-tight leading-tight mb-1">Global Reach</p>
                  <p className="font-sans text-[13px] text-on-surface-variant font-light">Available in 42 premium boutiques worldwide.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover/card:translate-x-2 transition-transform duration-300" />
              </div>
            </GlassCard>

            {/* Sustainable eco */}
            <GlassCard hoverLift className="flex flex-col justify-between min-h-[200px]">
              <Leaf className="w-8 h-8 text-tertiary mb-4" />
              <div>
                <p className="font-sans text-[36px] font-bold text-tertiary tracking-tight leading-none mb-2">100%</p>
                <p className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase font-medium">Recycled Titanium</p>
              </div>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* 3. Featured Products Slider (The Essentials) */}
      <section className="py-20 bg-surface-container-lowest/40 relative z-10 border-y border-white/5">
        <div className="px-6 md:px-12 mb-12 flex justify-between items-end max-w-[1280px] mx-auto">
          <SectionHeader
            title="The Essentials"
            subtitle="Curated accessories and telemetry hubs for the modern digital connoisseur."
            className="mb-0"
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="p-3.5 rounded-full glass-card hover:bg-white/10 hover:border-primary/40 text-on-surface transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-3.5 rounded-full glass-card hover:bg-white/10 hover:border-primary/40 text-on-surface transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slider element */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-8 custom-scrollbar scroll-smooth w-full no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-6 max-w-[1280px] mx-auto w-full">
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-[310px] shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter Subscription (Join the Inner Circle) */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto glass-card rounded-[40px] p-10 md:p-16 text-center rim-light relative overflow-hidden shadow-2xl">
          {/* Subtle accent glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
          
          <h3 className="font-sans text-[26px] md:text-[38px] font-bold tracking-tighter uppercase mb-4 text-on-surface">
            Join the Inner Circle
          </h3>
          <p className="font-sans text-[14px] md:text-[16px] text-on-surface-variant max-w-lg mx-auto font-light leading-relaxed mb-10">
            Receive exclusive telemetry alerts, custom layout releases, private boutique events, and the digital Lumina Heritage magazine.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto relative z-10">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL ADDRESS"
              className="flex-1 bg-surface-container-low border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-full px-8 py-4 font-mono text-[11px] outline-none text-on-surface placeholder:text-outline/40 transition-all duration-300 uppercase tracking-widest"
            />
            <button
              type="submit"
              className="px-10 py-4 bg-on-surface text-inverse-on-surface hover:bg-primary hover:text-on-primary rounded-full font-mono text-[11px] font-medium tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer hover:shadow-[0_0_20px_rgba(184,195,255,0.4)]"
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
