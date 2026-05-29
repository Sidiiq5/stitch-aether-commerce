"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AnimatedButton from "@/components/ui/AnimatedButton";
import GlassCard from "@/components/ui/GlassCard";
import { ArrowRight, Eye, EyeOff, ShieldCheck, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Auth() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Switcher tab state
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  // Input states
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setErrorText("ALL CRITICAL CODES REQUIRED.");
      return;
    }
    setErrorText(null);
    const success = await login(emailInput);
    if (success) {
      router.push("/dashboard");
    } else {
      setErrorText("Telemetry mismatch. Access denied.");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput || !firstName || !lastName) {
      setErrorText("ALL REGISTRY CODES REQUIRED.");
      return;
    }
    setErrorText(null);
    const success = await signup(emailInput, firstName, lastName);
    if (success) {
      router.push("/dashboard");
    } else {
      setErrorText("Registration failed. Please attempt again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* 1. Left branding panel (Desktop only) */}
      <section className="hidden md:flex md:w-1/2 relative animated-gradient items-center justify-center overflow-hidden border-r border-white/5 py-12">
        {/* Glow indicators */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-12 space-y-6 max-w-xl">
          <h1 className="font-sans text-[44px] md:text-[56px] font-bold text-on-surface tracking-tighter uppercase leading-[1.05]">
            The next echelon of <span className="text-primary italic font-normal tracking-normal font-sans">digital luxury.</span>
          </h1>
          <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant font-light leading-relaxed max-w-md">
            Experience a multi-dimensional workspace designed for technical precision and high-fidelity performance.
          </p>
          
          <div className="pt-8 flex gap-4">
            <div className="glass-panel px-6 py-4 rounded-xl border border-white/5 rim-light">
              <div className="font-mono text-[9px] tracking-wider text-secondary uppercase mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> status
              </div>
              <div className="font-sans text-[18px] font-bold text-on-surface">Live Platform</div>
            </div>
            
            <div className="glass-panel px-6 py-4 rounded-xl border border-white/5 rim-light">
              <div className="font-mono text-[9px] tracking-wider text-tertiary uppercase mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> encrypted
              </div>
              <div className="font-sans text-[18px] font-bold text-on-surface">AES-256</div>
            </div>
          </div>
        </div>

        {/* Floating background overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </section>

      {/* 2. Right form input panel */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-surface">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(184,195,255,0.04),transparent_50%)] pointer-events-none" />
        
        <div className="w-full max-w-[420px] relative z-10 py-16">
          {/* Toggles bar */}
          <div className="flex gap-8 mb-12 border-b border-white/5">
            <button
              onClick={() => { setAuthTab("login"); setErrorText(null); }}
              className={cn(
                "pb-4 font-mono text-[11px] tracking-widest uppercase transition-all duration-300 border-b-2 cursor-pointer",
                authTab === "login"
                  ? "text-primary border-primary"
                  : "text-on-surface-variant hover:text-on-surface border-transparent"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthTab("signup"); setErrorText(null); }}
              className={cn(
                "pb-4 font-mono text-[11px] tracking-widest uppercase transition-all duration-300 border-b-2 cursor-pointer",
                authTab === "signup"
                  ? "text-primary border-primary"
                  : "text-on-surface-variant hover:text-on-surface border-transparent"
              )}
            >
              Create Account
            </button>
          </div>

          {/* SIGN IN FORM */}
          {authTab === "login" && (
            <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
              <div className="space-y-2">
                <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-on-surface tracking-tighter uppercase">
                  Welcome Back
                </h2>
                <p className="font-sans text-[13px] text-on-surface-variant font-light">
                  Enter your credentials to access the Lumina suite.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                    IDENTIFIER EMAIL
                  </label>
                  <div className="glass-panel border border-white/10 rounded-xl focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(184,195,255,0.15)] transition-all duration-300">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="name@luxury.com"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 px-5 py-4 font-mono text-[11px] uppercase tracking-widest text-on-surface placeholder:text-outline/35"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                      PASSWORD KEY
                    </label>
                    <button
                      type="button"
                      onClick={() => router.push("/dashboard")}
                      className="font-mono text-[10px] tracking-wider text-primary hover:underline uppercase"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="glass-panel border border-white/10 rounded-xl focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(184,195,255,0.15)] transition-all duration-300 flex items-center pr-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-5 py-4 font-mono text-[11px] text-on-surface placeholder:text-outline/35"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {errorText && (
                  <div className="bg-error/10 border border-error/25 text-error font-mono text-[10px] px-4 py-2.5 rounded-lg uppercase tracking-wider">
                    {errorText}
                  </div>
                )}

                <AnimatedButton
                  type="submit"
                  variant="gradient"
                  className="w-full"
                >
                  {isLoading ? "Synchronizing..." : "Sign In"}
                </AnimatedButton>
              </form>

              {/* Social login option separators */}
              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-grow h-[1px] bg-white/5" />
                <span className="font-mono text-[9px] text-outline tracking-wider uppercase shrink-0">
                  Or continue with
                </span>
                <div className="flex-grow h-[1px] bg-white/5" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => login("julian@aether.luxury").then(() => router.push("/dashboard"))}
                  className="flex items-center justify-center gap-2.5 py-3.5 glass-panel border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzeZxCN0M_1S3UM5ysSIv9LxWjD1pg1SEKKBYlCRgAp2HhVP_Ibsax3f931gsmzUj_w-C43UoqbuXlpRcFoSNqnDsaMrBToiYz46JE9H8_OHanbJJ10nkd3H331P54Hb1vxpycjpw8Ed1pCuY9hW5oi1gSrNDxnTIA991Al9IIVdaLvePQAaWlsahUPBcmfOF-aostx_oVn41lU-iUZebo38_WZz7sNR5_5CrH0-nohrjDYVEWrKbv1NpeB13AtXLQt_bp3KW9nA"
                    alt="Google"
                    className="w-4 h-4 opacity-80"
                  />
                  <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-on-surface">
                    GOOGLE
                  </span>
                </button>
                
                <button
                  onClick={() => login("julian@aether.luxury").then(() => router.push("/dashboard"))}
                  className="flex items-center justify-center gap-2.5 py-3.5 glass-panel border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-on-surface">
                    APPLE
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* SIGN UP/CREATE ACCOUNT FORM */}
          {authTab === "signup" && (
            <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
              <div className="space-y-2">
                <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-on-surface tracking-tighter uppercase">
                  Start Journey
                </h2>
                <p className="font-sans text-[13px] text-on-surface-variant font-light">
                  Join the exclusive network of digital architects.
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                      FIRST NAME
                    </label>
                    <div className="glass-panel border border-white/10 rounded-xl focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(184,195,255,0.15)] transition-all duration-300">
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent border-none outline-none focus:ring-0 px-4 py-3 font-mono text-[11px] text-on-surface uppercase"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                      LAST NAME
                    </label>
                    <div className="glass-panel border border-white/10 rounded-xl focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(184,195,255,0.15)] transition-all duration-300">
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent border-none outline-none focus:ring-0 px-4 py-3 font-mono text-[11px] text-on-surface uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                    EMAIL ADDRESS
                  </label>
                  <div className="glass-panel border border-white/10 rounded-xl focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(184,195,255,0.15)] transition-all duration-300">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="NAME@LUXURY.COM"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 px-4 py-3.5 font-mono text-[11px] uppercase tracking-widest text-on-surface placeholder:text-outline/35"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                    CHOOSE PASSWORD
                  </label>
                  <div className="glass-panel border border-white/10 rounded-xl focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(184,195,255,0.15)] transition-all duration-300">
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 px-4 py-3.5 font-mono text-[11px] text-on-surface placeholder:text-outline/35"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <input
                    type="checkbox"
                    required
                    id="terms"
                    className="mt-1 bg-surface-container border-white/10 rounded text-primary focus:ring-primary/20 accent-primary"
                  />
                  <label htmlFor="terms" className="font-sans text-[12px] text-on-surface-variant font-light cursor-pointer select-none leading-relaxed">
                    I agree to the <span className="text-primary underline">Terms of Service</span> and <span className="text-primary underline">Privacy Policy</span>.
                  </label>
                </div>

                {errorText && (
                  <div className="bg-error/10 border border-error/25 text-error font-mono text-[10px] px-4 py-2.5 rounded-lg uppercase tracking-wider">
                    {errorText}
                  </div>
                )}

                <AnimatedButton
                  type="submit"
                  variant="gradient"
                  className="w-full"
                >
                  {isLoading ? "Constructing Array..." : "Create Account"}
                </AnimatedButton>
              </form>
            </div>
          )}

          {/* Luxury watermark bottom overlay */}
          <div className="absolute bottom-6 right-6 opacity-[0.03] pointer-events-none select-none">
            <div className="font-sans text-[64px] leading-none select-none tracking-widest uppercase font-bold text-white">
              LUXURY
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
