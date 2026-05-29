"use client";

import React, { useState } from "react";
import { 
  Diamond, 
  Award, 
  TrendingUp, 
  Package, 
  Wallet, 
  Heart, 
  Settings as SettingsIcon, 
  Check, 
  Truck, 
  Box, 
  ShieldAlert, 
  LogOut, 
  User as UserIcon,
  ChevronRight
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { mockProducts } from "@/utils/productsData";
import { formatPrice } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";
import DashboardCard from "@/components/ui/DashboardCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleWishlist = useAuthStore((state) => state.toggleWishlist);

  // Dashboard tab switching state
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "wishlist" | "settings">("overview");

  // Account Settings input states
  const [firstName, setFirstName] = useState(user?.firstName || "Julian");
  const [lastName, setLastName] = useState(user?.lastName || "Malkovich");
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  if (!user) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1280px] mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <GlassCard className="max-w-md p-10 opacity-70">
          <ShieldAlert className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-sans text-[20px] font-bold uppercase tracking-wider text-on-surface mb-2">
            CONCIERGE DEACTIVATED
          </h2>
          <p className="font-sans text-[13px] text-on-surface-variant font-light mb-6">
            Please authenticate to sync your profile parameters and telemetry history.
          </p>
          <AnimatedButton variant="gradient" asChild>
            <a href="/auth">Sign In Now</a>
          </AnimatedButton>
        </GlassCard>
      </div>
    );
  }

  // Get active wishlist product logs
  const wishlistItems = mockProducts.filter((p) => user.wishlist.includes(p.id));

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 2500);
  };

  return (
    <div className="pt-32 pb-32 max-w-[1280px] mx-auto px-6 md:px-12 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* 1. Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
          <nav className="flex flex-col gap-2">
            {[
              { id: "overview", label: "DASHBOARD", icon: Award },
              { id: "orders", label: "ORDERS", icon: Package },
              { id: "wishlist", label: "WISHLIST", icon: Heart },
              { id: "settings", label: "SETTINGS", icon: SettingsIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-full text-left font-mono text-[11px] tracking-widest uppercase cursor-pointer select-none transition-all duration-300",
                    isActive
                      ? "glass-card text-primary shadow-[0_0_15px_rgba(184,195,255,0.2)] border-primary/25"
                      : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-outline")} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Logout button */}
            <button
              onClick={logout}
              className="flex items-center gap-4 px-6 py-4 rounded-full text-left font-mono text-[11px] tracking-widest uppercase text-error hover:bg-error/10 hover:text-error transition-all duration-300 mt-6 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </nav>

          {/* Loyalty status onyx tier card */}
          <GlassCard className="p-6 relative overflow-hidden mt-6">
            <div className="absolute top-0 right-0 p-2 opacity-15">
              <Diamond className="w-20 h-20 text-tertiary" />
            </div>
            <p className="font-mono text-[10px] text-tertiary tracking-widest uppercase mb-1">
              MEMBERSHIP
            </p>
            <h3 className="font-sans text-[22px] font-bold mb-4 tracking-wider uppercase">
              ONYX TIER
            </h3>
            
            {/* Points bar */}
            <div className="w-full bg-white/10 h-1 rounded-full mb-2">
              <div 
                className="bg-tertiary h-full rounded-full shadow-[0_0_8px_#4cd7f6]" 
                style={{ width: "75%" }} 
              />
            </div>
            <p className="font-mono text-[10px] text-outline uppercase">
              2,450 / 3,000 PTS TO NEXT ECHELON
            </p>
          </GlassCard>
        </aside>

        {/* 2. Main Content Display Panel */}
        <main className="flex-1 w-full space-y-10">
          
          {/* Welcome header */}
          <header>
            <SectionHeader
              title={`Welcome, ${user.firstName}`}
              subtitle="Your secure concierge registry details, shipping metrics, and luxury assets are fully active."
              className="mb-0"
            />
          </header>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-10">
              {/* Analytics Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                  title="Loyalty Points"
                  value={user.loyaltyPoints.toLocaleString()}
                  change="+12% vs last cycle"
                  changeType="positive"
                  icon={Award}
                  iconColor="cyan"
                />
                
                <DashboardCard
                  title="Total Orders"
                  value={user.orderHistory.length}
                  change="4 Active Transits"
                  icon={Package}
                  iconColor="violet"
                />

                <DashboardCard
                  title="Wishlisted Artifacts"
                  value={user.wishlist.length}
                  change="Limited items"
                  icon={Wallet}
                  iconColor="blue"
                />
              </section>

              {/* Active shipping tracker timeline */}
              <section className="glass-card rounded-2xl p-8 rim-light">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
                  <h3 className="font-sans text-[18px] font-bold uppercase tracking-wider text-on-surface">
                    Active Telemetry Tracker
                  </h3>
                  <span className="font-mono text-[10px] px-3.5 py-1 bg-tertiary/10 text-tertiary rounded-full border border-tertiary/20 uppercase font-semibold">
                    EST. DELIVERY: OCT 12
                  </span>
                </div>

                <div className="relative">
                  {/* Progress Line connectors */}
                  <div className="absolute left-[15px] sm:left-[10%] sm:top-1/2 sm:-translate-y-1/2 w-0.5 sm:w-[80%] h-[75%] sm:h-0.5 bg-white/10 z-0" />
                  <div className="absolute left-[15px] sm:left-[10%] sm:top-1/2 sm:-translate-y-1/2 w-0.5 sm:w-[50%] h-[50%] sm:h-0.5 bg-tertiary shadow-[0_0_15px_#4cd7f6] z-0" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-6 sm:gap-4">
                    {/* Step 1 */}
                    <div className="flex items-center sm:flex-col gap-4 sm:gap-3">
                      <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary shadow-[0_0_15px_#4cd7f6]">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="text-left sm:text-center">
                        <p className="font-mono text-[11px] font-bold text-on-surface uppercase">Confirmed</p>
                        <p className="font-mono text-[9px] text-outline">OCT 08</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center sm:flex-col gap-4 sm:gap-3">
                      <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary shadow-[0_0_15px_#4cd7f6]">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="text-left sm:text-center">
                        <p className="font-mono text-[11px] font-bold text-on-surface uppercase">Processing</p>
                        <p className="font-mono text-[9px] text-outline">OCT 09</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center sm:flex-col gap-4 sm:gap-3">
                      <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary shadow-[0_0_15px_#4cd7f6] animate-pulse">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="text-left sm:text-center">
                        <p className="font-mono text-[11px] font-bold text-on-surface uppercase">In Transit</p>
                        <p className="font-mono text-[9px] text-tertiary uppercase">HOUSTON, TX</p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-center sm:flex-col gap-4 sm:gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center text-outline">
                        <Box className="w-4 h-4" />
                      </div>
                      <div className="text-left sm:text-center">
                        <p className="font-mono text-[11px] text-outline uppercase">Delivered</p>
                        <p className="font-mono text-[9px] text-outline uppercase">PENDING</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Splits Grid: Order log and Wishlist preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Orders Log Column */}
                <section className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-sans text-[18px] font-bold uppercase tracking-wider text-on-surface">
                      Recent Shipments
                    </h3>
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className="text-primary font-mono text-[10px] tracking-widest hover:underline uppercase cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {user.orderHistory.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        onClick={() => setActiveTab("orders")}
                        className="glass-card p-4 rounded-xl flex items-center gap-4 border border-white/5 hover:border-white/15 cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-high shrink-0">
                          <img 
                            src={order.items[0]?.image} 
                            alt="Order Preview" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans text-[13px] font-bold text-on-surface uppercase truncate">
                            {order.items[0]?.name}
                          </h4>
                          <p className="font-mono text-[9px] text-outline uppercase">
                            Order #{order.id} &bull; {order.date}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono text-[12px] font-bold text-on-surface">
                            {formatPrice(order.total)}
                          </p>
                          <p className="font-mono text-[9px] text-tertiary font-bold uppercase tracking-wider">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Wishlist Column */}
                <section className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-sans text-[18px] font-bold uppercase tracking-wider text-on-surface">
                      Wishlist Preview
                    </h3>
                    <button 
                      onClick={() => setActiveTab("wishlist")}
                      className="text-primary font-mono text-[10px] tracking-widest hover:underline uppercase cursor-pointer"
                    >
                      Manage
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {wishlistItems.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="glass-card p-3 rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-high mb-3 border border-white/5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-sans text-[12px] font-bold text-on-surface truncate uppercase">
                          {item.name}
                        </h4>
                        <p className="font-mono text-[10px] text-primary mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className="absolute top-4 right-4 p-1.5 rounded-full bg-background/80 hover:bg-error/10 text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="font-sans text-[18px] font-bold uppercase tracking-wider text-on-surface mb-2">
                Concierge Orders Matrix
              </h3>
              
              {user.orderHistory.length === 0 ? (
                <div className="text-center py-16 opacity-60">
                  <Package className="w-8 h-8 mx-auto text-outline mb-2" />
                  <p className="font-mono text-[11px] tracking-widest uppercase">No verified dispatch logs found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.orderHistory.map((order) => (
                    <div 
                      key={order.id}
                      className="glass-card p-6 rounded-2xl border border-white/5 rim-light"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-white/5">
                        <div>
                          <p className="font-mono text-[10px] text-outline uppercase">
                            ORDER IDENTITY: #{order.id}
                          </p>
                          <p className="font-mono text-[9px] text-outline-variant uppercase">
                            TRANSMITTED: {order.date}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="font-mono text-[10px] px-3 py-1 bg-tertiary/10 border border-tertiary/20 text-tertiary rounded-full font-bold uppercase tracking-wider">
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden border border-white/5 shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="font-sans text-[13px] font-bold text-on-surface uppercase">
                                  {item.name}
                                </h4>
                                <p className="font-mono text-[9px] text-outline uppercase">
                                  QTY: {item.quantity} &bull; VALUATION: {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                            <span className="font-mono text-[13px] text-on-surface font-semibold shrink-0">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Summary footer */}
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
                        <span className="font-mono text-[10px] text-outline uppercase">VALUATION SUM</span>
                        <span className="font-mono text-[16px] text-primary font-bold">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div className="space-y-4">
              <h3 className="font-sans text-[18px] font-bold uppercase tracking-wider text-on-surface mb-2">
                Active Wishlisted Artifacts
              </h3>
              
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 opacity-60">
                  <Heart className="w-8 h-8 mx-auto text-outline mb-2" />
                  <p className="font-mono text-[11px] tracking-widest uppercase">Registry wishlist is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="glass-card p-4 rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-high mb-4 border border-white/5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-sans text-[13px] font-bold text-on-surface uppercase">
                          {item.name}
                        </h4>
                        <p className="font-mono text-[10px] text-outline uppercase mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="font-mono text-[13px] text-primary">
                          {formatPrice(item.price)}
                        </span>
                        
                        <div className="flex gap-2">
                          <AnimatedButton
                            variant="glass"
                            size="sm"
                            asChild
                          >
                            <a href={`/shop/${item.id}`}>VIEW</a>
                          </AnimatedButton>
                          
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className="p-2 rounded-full hover:bg-error/10 text-secondary hover:text-error transition-colors cursor-pointer border border-white/5"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="max-w-xl">
              <h3 className="font-sans text-[18px] font-bold uppercase tracking-wider text-on-surface mb-6">
                Security Profile Registry
              </h3>

              <GlassCard className="p-8 rim-light border border-white/5">
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-surface-container border border-white/10 rounded-full px-5 py-3 font-mono text-[11px] outline-none text-on-surface focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-surface-container border border-white/10 rounded-full px-5 py-3 font-mono text-[11px] outline-none text-on-surface focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                      Email Coordinates
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-surface-container/40 border border-white/5 rounded-full px-5 py-3 font-mono text-[11px] outline-none text-outline-variant cursor-not-allowed uppercase"
                    />
                  </div>

                  {settingsSuccess && (
                    <div className="bg-tertiary/10 border border-tertiary/25 text-tertiary font-mono text-[10px] px-4 py-2.5 rounded-lg uppercase tracking-wider">
                      CONCIERGE REGISTRY UPDATE SUCCESSFUL
                    </div>
                  )}

                  <AnimatedButton
                    type="submit"
                    variant="gradient"
                    className="w-full mt-2"
                  >
                    Commit Configuration
                  </AnimatedButton>
                </form>
              </GlassCard>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
