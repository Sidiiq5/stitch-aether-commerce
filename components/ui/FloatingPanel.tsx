"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
  bounceY?: number;
  duration?: number;
  delay?: number;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  className,
  bounceY = 10,
  duration = 4,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        y: [0, -bounceY, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
      className={cn(
        "glass-card p-4 rounded-2xl rim-light shadow-2xl relative select-none",
        className
      )}
    >
      {/* Light sheen line */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 pointer-events-none rounded-2xl" />
      {children}
    </motion.div>
  );
};
export default FloatingPanel;
