"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "image";
}

export const LoadingSkeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "text",
}) => {
  const baseStyles = "bg-white/5 animate-pulse rounded-md";

  if (variant === "card") {
    return (
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden rim-light w-full flex flex-col gap-4">
        <div className="aspect-[4/5] bg-white/5 animate-pulse rounded-xl w-full" />
        <div className="h-6 bg-white/5 animate-pulse rounded-md w-3/4" />
        <div className="h-4 bg-white/5 animate-pulse rounded-md w-1/2" />
        <div className="h-px bg-white/5 w-full mt-2" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 bg-white/5 animate-pulse rounded-md w-1/3" />
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === "circle") {
    return <div className={cn(baseStyles, "rounded-full", className)} />;
  }

  if (variant === "image") {
    return <div className={cn(baseStyles, "w-full h-full aspect-square rounded-xl", className)} />;
  }

  return <div className={cn(baseStyles, className)} />;
};
export default LoadingSkeleton;
