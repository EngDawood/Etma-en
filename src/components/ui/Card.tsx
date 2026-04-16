import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  key?: React.Key;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-border)]",
        onClick && "cursor-pointer active:scale-[0.98] transition-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
