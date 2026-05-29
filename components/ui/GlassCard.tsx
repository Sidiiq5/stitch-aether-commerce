"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
  rimLight?: boolean;
  glowColor?: "blue" | "violet" | "cyan" | "none";
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverLift = false,
  rimLight = true,
  glowColor = "none",
  delay = 0,
  ...props
}) => {
  const glowStyles = {
    blue: "shadow-[0_0_30px_-5px_rgba(184,195,255,0.15)] hover:shadow-[0_0_40px_rgba(184,195,255,0.25)]",
    violet: "shadow-[0_0_30px_-5px_rgba(208,188,255,0.15)] hover:shadow-[0_0_40px_rgba(208,188,255,0.25)]",
    cyan: "shadow-[0_0_30px_-5px_rgba(76,215,246,0.15)] hover:shadow-[0_0_40px_rgba(76,215,246,0.25)]",
    none: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        delay,
      }}
      whileHover={
        hoverLift
          ? {
              y: -8,
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              borderColor: "rgba(184, 195, 255, 0.3)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(76, 215, 246, 0.15)",
            }
          : undefined
      }
      className={cn(
        "glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300",
        rimLight && "rim-light",
        glowColor !== "none" && glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Dynamic light reflection line across card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/0 pointer-events-none" />
      {children}
    </motion.div>
  );
};
export default GlassCard;
