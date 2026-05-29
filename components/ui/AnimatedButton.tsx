"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "gradient" | "glass" | "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  glow?: boolean;
  asChild?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = "gradient",
  size = "md",
  className,
  glow = false,
  asChild = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono text-[12px] font-medium tracking-widest uppercase rounded-full cursor-pointer focus:outline-none transition-colors select-none";

  const sizeStyles = {
    sm: "px-5 py-2 text-[10px]",
    md: "px-8 py-4 text-[12px]",
    lg: "px-10 py-5 text-[14px]",
  };

  const variantStyles = {
    gradient: "bg-gradient-to-r from-primary to-secondary text-on-primary border-none shadow-[0_0_20px_rgba(184,195,255,0.25)] hover:shadow-[0_0_30px_rgba(184,195,255,0.45)] relative overflow-hidden",
    glass: "glass-card text-on-surface border border-white/10 hover:bg-white/10 active:border-primary/50",
    primary: "bg-on-surface text-inverse-on-surface hover:bg-primary hover:text-on-primary transition-colors",
    secondary: "bg-surface-container-high text-on-surface hover:bg-white/5 border border-white/5",
    ghost: "bg-transparent text-on-surface-variant hover:text-primary hover:bg-white/5",
    danger: "bg-error text-on-error hover:bg-error/80 shadow-[0_0_20px_rgba(255,180,171,0.25)]",
  };

  const composedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  // asChild pattern: render the child element with merged styles instead of a <button>
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="inline-flex"
      >
        {React.cloneElement(child, {
          className: cn(composedClassName, child.props.className),
        })}
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={composedClassName}
      {...props}
    >
      {/* Visual gloss overlay for premium hover */}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
export default AnimatedButton;

