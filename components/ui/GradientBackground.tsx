"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const GradientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use framer-motion values for smooth spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const glow1X = useSpring(mouseX, springConfig);
  const glow1Y = useSpring(mouseY, springConfig);
  
  // Inverse direction for dynamic depth parallax
  const glow2X = useSpring(useMotionValue(0), springConfig);
  const glow2Y = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Normalize between -50 and 50 pixels
      const xVal = ((clientX / width) - 0.5) * 60;
      const yVal = ((clientY / height) - 0.5) * 60;

      mouseX.set(xVal);
      mouseY.set(yVal);

      // Inverse coordinates for secondary glow
      glow2X.set(-xVal * 0.8);
      glow2Y.set(-yVal * 0.8);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, glow2X, glow2Y]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] bg-background"
    >
      {/* Primary Electric Blue Glow */}
      <motion.div
        style={{
          x: glow1X,
          y: glow1Y,
        }}
        className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-75"
        animate={{
          background: "radial-gradient(circle, rgba(184, 195, 255, 0.09) 0%, rgba(76, 215, 246, 0.05) 50%, transparent 100%)",
        }}
      />

      {/* Secondary Violet Glow */}
      <motion.div
        style={{
          x: glow2X,
          y: glow2Y,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-70"
        animate={{
          background: "radial-gradient(circle, rgba(208, 188, 255, 0.09) 0%, rgba(18, 74, 240, 0.03) 60%, transparent 100%)",
        }}
      />

      {/* Micro Grid Overlay for high-tech precision look */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
};
export default GradientBackground;
