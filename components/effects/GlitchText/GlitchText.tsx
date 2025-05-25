import React from "react";
import { cn } from "@/lib/utils";
import "./GlitchText.css";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "normal" | "intense";
  triggerOnHover?: boolean;
}

export function GlitchText({ children, className, intensity = "normal", triggerOnHover = false }: GlitchTextProps) {
  const textContent = typeof children === "string" ? children : undefined;

  return (
    <span
      className={cn(
        "glitch-text-container",
        `glitch-${intensity}`,
        triggerOnHover && "glitch-hover-trigger",
        className
      )}
      data-text={textContent}>
      <span className="glitch-text">{children}</span>
    </span>
  );
}
