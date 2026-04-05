import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "danger" | "warning" | "primary" | "neutral" | "lab" | "imaging" | "report" | "prescription";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const variants = {
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    danger: "bg-[var(--color-danger-light)] text-[var(--color-danger)]",
    warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    primary: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
    neutral: "bg-gray-100 text-gray-600",
    lab: "bg-blue-100 text-blue-700",
    imaging: "bg-purple-100 text-purple-700",
    report: "bg-green-100 text-green-700",
    prescription: "bg-orange-100 text-orange-700",
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
