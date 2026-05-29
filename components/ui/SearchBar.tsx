"use client";

import React, { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onSearchChange?: (val: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  onSearchChange,
  placeholder = "FIND AN ARTIFACT...",
  ...props
}) => {
  return (
    <div className={cn("relative w-full md:w-[400px] group", className)}>
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearchChange?.(e.target.value)}
        className="w-full bg-surface-container-low/60 border border-white/10 rounded-full py-4 pl-12 pr-6 font-mono text-[12px] tracking-widest focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-on-surface placeholder:text-outline/40 transition-all duration-300"
        {...props}
      />
      {/* Interactive rim glow border */}
      <div className="absolute inset-0 rounded-full border border-primary/0 pointer-events-none group-focus-within:border-primary/30 group-focus-within:shadow-[0_0_15px_rgba(184,195,255,0.15)] transition-all duration-300" />
    </div>
  );
};
export default SearchBar;
