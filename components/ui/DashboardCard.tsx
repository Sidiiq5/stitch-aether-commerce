"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: "blue" | "violet" | "cyan";
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "blue",
  className,
}) => {
  const iconBgStyles = {
    blue: "bg-primary/10 text-primary border-primary/20",
    violet: "bg-secondary/10 text-secondary border-secondary/20",
    cyan: "bg-tertiary/10 text-tertiary border-tertiary/20",
  };

  const changeTextStyles = {
    positive: "text-tertiary font-semibold",
    negative: "text-error font-semibold",
    neutral: "text-outline",
  };

  return (
    <GlassCard
      hoverLift
      className={cn("flex flex-col justify-between min-h-[190px]", className)}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn("p-3 rounded-xl border", iconBgStyles[iconColor])}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className={cn("font-mono text-[10px] uppercase tracking-wider", changeTextStyles[changeType])}>
            {change}
          </span>
        )}
      </div>

      <div>
        <p className="font-mono text-[10px] text-outline uppercase tracking-[0.15em] mb-1">
          {title}
        </p>
        <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-on-surface tracking-tight leading-none">
          {value}
        </h3>
      </div>
    </GlassCard>
  );
};
export default DashboardCard;
