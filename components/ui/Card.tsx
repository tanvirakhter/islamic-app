import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  // Default `glass` matches the Apple-style frosted look used on the dashboard.
  variant?: "glass" | "solid";
}

// Reusable surface used across the dashboard and feature pages.
export function Card({ children, className, variant = "glass", ...rest }: CardProps) {
  return (
    <div
      className={cn(
        variant === "glass"
          ? "glass-card"
          : "rounded-2xl border border-black/5 bg-white shadow-card",
        "p-6",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4 flex items-center justify-between", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("section-title", className)}>{children}</h3>;
}
