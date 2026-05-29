"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  italicTitle?: string;
  subtitle?: string;
  category?: string;
  align?: "left" | "center" | "right";
  className?: string;
  accentLine?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  italicTitle,
  subtitle,
  category,
  align = "left",
  className,
  accentLine = false,
}) => {
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={cn("flex flex-col gap-3 mb-10 w-full", alignmentStyles[align], className)}
    >
      {category && (
        <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase bg-primary/10 border border-primary/25 px-3 py-1 rounded-full w-fit">
          {category}
        </span>
      )}
      
      <h2 className="font-sans text-display-lg-mobile md:text-headline-lg tracking-tighter uppercase font-bold leading-tight">
        {title} {italicTitle && <span className="text-primary italic font-normal font-sans lowercase md:uppercase">{italicTitle}</span>}
      </h2>

      {subtitle && (
        <p className="font-sans text-[14px] md:text-[16px] text-on-surface-variant max-w-xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}

      {accentLine && (
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-tertiary to-transparent mt-2 rounded-full shadow-[0_0_8px_var(--color-tertiary)]" />
      )}
    </motion.div>
  );
};
export default SectionHeader;
